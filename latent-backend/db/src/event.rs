use crate::Db;
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;
use serde::{Deserialize, Serialize};
use log::info;
use chrono::{DateTime, Utc};

#[derive(FromRow, Serialize, Deserialize)]
pub struct Event {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub start_time: DateTime<Utc>,
    pub location_id: Uuid,
    pub banner: Option<String>,
    pub admin_id: Uuid,
    pub published: bool,
    pub ended: bool,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct SeatType {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub price: i32,
    pub capacity: i32,
    pub event_id: Uuid,
}

impl Db {
    pub async fn create_event(
        &self,
        name: String,
        description: Option<String>,
        start_time: DateTime<Utc>,
        location_id: Uuid,
        banner: Option<String>,
        admin_id: Uuid,
        seats: Vec<(String, Option<String>, i32, i32)>,
    ) -> Result<Uuid, Error> {
        let mut tx = self.client.begin().await?;

        let event = sqlx::query_as::<_, Event>(
            r#"
            INSERT INTO events (id, name, description, start_time, location_id, banner, admin_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            "#
        )
        .bind(Uuid::new_v4())
        .bind(name)
        .bind(description)
        .bind(start_time)
        .bind(location_id)
        .bind(banner)
        .bind(admin_id)
        .fetch_one(&mut *tx)
        .await?;

        for (seat_name, seat_desc, price, capacity) in seats {
            sqlx::query(
                r#"
                INSERT INTO seat_types (id, name, description, price, capacity, event_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                "#
            )
            .bind(Uuid::new_v4())
            .bind(seat_name)
            .bind(seat_desc)
            .bind(price)
            .bind(capacity)
            .bind(event.id)
            .execute(&mut *tx)
            .await?;
        }

        tx.commit().await?;
        Ok(event.id)
    }

    pub async fn update_event(
        &self,
        id: Uuid,
        name: String,
        description: Option<String>,
        start_time: DateTime<Utc>,
        location_id: Uuid,
        banner: Option<String>,
        admin_id: Uuid,
        published: bool,
        ended: bool,
    ) -> Result<Event, Error> {
        sqlx::query_as::<_, Event>(
            r#"
            UPDATE events
            SET name = $1, description = $2, start_time = $3, location_id = $4,
                banner = $5, published = $6, ended = $7
            WHERE id = $8 AND admin_id = $9
            RETURNING *
            "#
        )
        .bind(name)
        .bind(description)
        .bind(start_time)
        .bind(location_id)
        .bind(banner)
        .bind(published)
        .bind(ended)
        .bind(id)
        .bind(admin_id)
        .fetch_one(&self.client)
        .await
    }

    pub async fn get_admin_events(&self, admin_id: Uuid) -> Result<Vec<(Event, Vec<SeatType>)>, Error> {
        let events = sqlx::query_as::<_, Event>(
            "SELECT * FROM events WHERE admin_id = $1"
        )
        .bind(admin_id)
        .fetch_all(&self.client)
        .await?;

        let mut result = Vec::new();
        for event in events {
            let seats = sqlx::query_as::<_, SeatType>(
                "SELECT * FROM seat_types WHERE event_id = $1"
            )
            .bind(event.id)
            .fetch_all(&self.client)
            .await?;
            
            result.push((event, seats));
        }

        Ok(result)
    }

    pub async fn get_event(&self, id: Uuid, admin_id: Uuid) -> Result<(Event, Vec<SeatType>), Error> {
        let event = sqlx::query_as::<_, Event>(
            "SELECT * FROM events WHERE id = $1 AND admin_id = $2"
        )
        .bind(id)
        .bind(admin_id)
        .fetch_one(&self.client)
        .await?;

        let seats = sqlx::query_as::<_, SeatType>(
            "SELECT * FROM seat_types WHERE event_id = $1"
        )
        .bind(event.id)
        .fetch_all(&self.client)
        .await?;

        Ok((event, seats))
    }

    pub async fn update_event_seats(
        &self,
        event_id: Uuid,
        admin_id: Uuid,
        seats: Vec<(Option<Uuid>, String, Option<String>, i32, i32)>,
    ) -> Result<(), Error> {
        let mut tx = self.client.begin().await?;

        // Verify event ownership and start time
        let event = sqlx::query_as::<_, Event>(
            "SELECT * FROM events WHERE id = $1 AND admin_id = $2"
        )
        .bind(event_id)
        .bind(admin_id)
        .fetch_one(&mut *tx)
        .await?;

        if event.start_time <= Utc::now() {
            return Err(Error::RowNotFound);
        }

        // Get current seats
        let current_seats = sqlx::query_as::<_, SeatType>(
            "SELECT * FROM seat_types WHERE event_id = $1"
        )
        .bind(event_id)
        .fetch_all(&mut *tx)
        .await?;

        // Delete seats not in the new list
        let new_seat_ids: Vec<Option<Uuid>> = seats.iter().map(|(id, _, _, _, _)| *id).collect();
        for seat in current_seats {
            if !new_seat_ids.contains(&Some(seat.id)) {
                sqlx::query("DELETE FROM seat_types WHERE id = $1")
                    .bind(seat.id)
                    .execute(&mut *tx)
                    .await?;
            }
        }

        // Create or update seats
        for (id, name, description, price, capacity) in seats {
            match id {
                Some(seat_id) => {
                    sqlx::query(
                        r#"
                        UPDATE seat_types
                        SET name = $1, description = $2, price = $3, capacity = $4
                        WHERE id = $5 AND event_id = $6
                        "#
                    )
                    .bind(name)
                    .bind(description)
                    .bind(price)
                    .bind(capacity)
                    .bind(seat_id)
                    .bind(event_id)
                    .execute(&mut *tx)
                    .await?;
                }
                None => {
                    sqlx::query(
                        r#"
                        INSERT INTO seat_types (id, name, description, price, capacity, event_id)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        "#
                    )
                    .bind(Uuid::new_v4())
                    .bind(name)
                    .bind(description)
                    .bind(price)
                    .bind(capacity)
                    .bind(event_id)
                    .execute(&mut *tx)
                    .await?;
                }
            }
        }

        tx.commit().await?;
        Ok(())
    }
}
