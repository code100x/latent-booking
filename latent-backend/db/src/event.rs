use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::types::time::OffsetDateTime;
use sqlx::types::time::PrimitiveDateTime;
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(FromRow, Serialize, Deserialize)]
pub struct Event {
    pub id: Uuid,
}

#[derive(Debug)]
pub struct SeatTypeInput {
    pub name: String,
    pub description: String,
    pub price: i32,
    pub capacity: i32,
}

#[derive(Debug)]
pub struct CreateEventInput {
    pub name: String,
    pub description: String,
    pub banner: String,
    pub admin_id: Uuid,
    pub location_id: Uuid,
    pub start_time: PrimitiveDateTime,
    pub seats: Vec<SeatTypeInput>,
}

#[derive(Debug)]
pub struct UpdateEventInput {
    pub name: String,
    pub description: String,
    pub banner: String,
    pub admin_id: Uuid,
    pub event_id: Uuid,
    pub location_id: Uuid,
    pub start_time: PrimitiveDateTime,
    pub published: bool,
    pub ended: bool,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct EventWithSeats {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub banner: String,
    pub admin_id: Uuid,
    pub location_id: Uuid,
    pub start_time: chrono::NaiveDateTime,
    pub published: bool,
    pub ended: bool,
    pub seat_types: Option<serde_json::Value>,
}

#[derive(Debug)]
pub struct SeatUpdateInput {
    pub id: Option<Uuid>,
    pub name: String,
    pub description: String,
    pub price: i32,
    pub capacity: i32,
}

#[derive(Debug)]
pub enum DBError {
    NotFound(String),
    InvalidInput(String),
    DatabaseError(sqlx::Error),
}

impl From<sqlx::Error> for DBError {
    fn from(err: sqlx::Error) -> Self {
        DBError::DatabaseError(err)
    }
}

impl Db {
    pub async fn create_event(&self, input: CreateEventInput) -> Result<Event, Error> {
        info!("Creating new event");

        let seat_names: Vec<String> = input.seats.iter().map(|st| st.name.clone()).collect();
        let seat_descriptions: Vec<String> = input
            .seats
            .iter()
            .map(|st| st.description.clone())
            .collect();
        let seat_prices: Vec<i32> = input.seats.iter().map(|st| st.price).collect();
        let seat_capacities: Vec<i32> = input.seats.iter().map(|st| st.capacity).collect();

        let event = sqlx::query_as::<_, Event>(
            r#"
        INSERT INTO events (id, name, description, banner, admin_id, location_id, start_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        "#,
        )
        .bind(Uuid::new_v4())
        .bind(input.name)
        .bind(input.description)
        .bind(input.banner)
        .bind(input.admin_id)
        .bind(input.location_id)
        .bind(input.start_time)
        .fetch_one(&self.client)
        .await?;

        // Insert seats only if the array is not empty
        if !input.seats.is_empty() {
            sqlx::query(
            r#"
            INSERT INTO seat_types (id, name, description, event_id, price, capacity)
            SELECT 
                uuid_generate_v4() AS id,
                name,
                description,
                $1 AS event_id,
                price,
                capacity
            FROM UNNEST($2::text[], $3::text[], $4::int[], $5::int[]) AS t(name, description, price, capacity)
            "#,
        )
        .bind(event.id)
        .bind(seat_names)
        .bind(seat_descriptions)
        .bind(seat_prices)
        .bind(seat_capacities)
        .execute(&self.client)
        .await?;
        }

        info!("Event and seats created/updated successfully");
        Ok(event)
    }

    pub async fn update_event_metadata(&self, input: UpdateEventInput) -> Result<Event, Error> {
        info!("Updating event metadata");

        let event = sqlx::query_as::<_, Event>(
            r#"
            UPDATE events
            SET 
                name = $1,
                description = $2,
                start_time = $3,
                location_id = $4,
                banner = $5,
                published = $6,
                ended = $7
            WHERE id = $8 AND admin_id = $9
            RETURNING id
            "#,
        )
        .bind(input.name)
        .bind(input.description)
        .bind(input.start_time)
        .bind(input.location_id)
        .bind(input.banner)
        .bind(input.published)
        .bind(input.ended)
        .bind(input.event_id)
        .bind(input.admin_id)
        .fetch_one(&self.client)
        .await?;

        info!("Event metadata updated successfully");
        Ok(event)
    }

    pub async fn get_events(&self, admin_id: Uuid) -> Result<Vec<EventWithSeats>, Error> {
        info!("Fetching events");
        let raw_events = sqlx::query_as::<_, EventWithSeats>(
            r#"
            SELECT 
                events.*,
                json_agg(
                    json_build_object(
                        'id', seat_types.id,
                        'name', seat_types.name,
                        'description', seat_types.description,
                        'price', seat_types.price,
                        'capacity', seat_types.capacity
                    )
                ) FILTER (WHERE seat_types.id IS NOT NULL) AS seat_types
            FROM events
            LEFT JOIN seat_types ON events.id = seat_types.event_id
            WHERE events.admin_id = $1
            GROUP BY events.id
            "#,
        )
        .bind(admin_id)
        .fetch_all(&self.client)
        .await?;
        let events = raw_events
            .into_iter()
            .map(|raw_event| {
                let seat_types = raw_event
                    .seat_types
                    .map(|value| serde_json::from_value(value).unwrap_or_default())
                    .unwrap_or_default();

                EventWithSeats {
                    id: raw_event.id,
                    name: raw_event.name,
                    description: raw_event.description,
                    banner: raw_event.banner,
                    admin_id: raw_event.admin_id,
                    location_id: raw_event.location_id,
                    start_time: raw_event.start_time,
                    published: raw_event.published,
                    ended: raw_event.ended,
                    seat_types: Some(seat_types),
                }
            })
            .collect();

        info!("Events fetched successfully");
        Ok(events)
    }

    pub async fn get_event(&self, event_id: Uuid, admin_id: Uuid) -> Result<EventWithSeats, Error> {
        info!("Fetching event");
        let event = sqlx::query_as::<_, EventWithSeats>(
            r#"
            SELECT 
                events.*,
                json_agg(
                    json_build_object(
                        'id', seat_types.id,
                        'name', seat_types.name,
                        'description', seat_types.description,
                        'price', seat_types.price,
                        'capacity', seat_types.capacity
                    )
                ) FILTER (WHERE seat_types.id IS NOT NULL) AS seat_types
            FROM events
            LEFT JOIN seat_types ON events.id = seat_types.event_id
            WHERE events.id = $1 AND events.admin_id = $2
            GROUP BY events.id
            "#,
        )
        .bind(event_id)
        .bind(admin_id)
        .fetch_one(&self.client)
        .await?;

        info!("Event fetched successfully");
        Ok(event)
    }

    pub async fn update_seats(
        &self,
        event_id: Uuid,
        admin_id: Uuid,
        seats: Vec<SeatUpdateInput>,
    ) -> Result<(), DBError> {
        info!("Updating seats for event");

        let mut tx = self.client.begin().await?;

        let event = sqlx::query!(
            r#"
            SELECT id, start_time
            FROM events
            WHERE id = $1 AND admin_id = $2
            "#,
            event_id,
            admin_id
        )
        .fetch_optional(&mut *tx)
        .await?;

        let event = event.ok_or_else(|| Error::RowNotFound)?;

        let current_time = OffsetDateTime::now_utc();

        // Check if the event has already started
        if event.start_time > current_time {
            return Err(DBError::InvalidInput(
                "Event has already started".to_string(),
            ));
        }

        let current_seats = sqlx::query!(
            r#"
            SELECT id, name, description, price, capacity
            FROM seat_types
            WHERE event_id = $1
            "#,
            event_id
        )
        .fetch_all(&mut *tx)
        .await?;

        let (new_seats, updated_seats): (Vec<_>, Vec<_>) =
            seats.into_iter().partition(|seat| seat.id.is_none());

        let deleted_seats: Vec<Uuid> = current_seats
            .iter()
            .filter(|current_seat| {
                !updated_seats
                    .iter()
                    .any(|seat| seat.id.as_ref() == Some(&current_seat.id))
            })
            .map(|seat| seat.id)
            .collect();

        // Perform the database operations in a transaction
        if !deleted_seats.is_empty() {
            sqlx::query!(
                r#"
                DELETE FROM seat_types
                WHERE id = ANY($1)
                "#,
                &deleted_seats
            )
            .execute(&mut *tx)
            .await?;
        }

        for seat in new_seats {
            sqlx::query!(
                r#"
                    INSERT INTO seat_types (id, name, description, price, capacity, event_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    "#,
                Uuid::new_v4(),
                seat.name,
                seat.description,
                seat.price,
                seat.capacity,
                event_id
            )
            .execute(&mut *tx)
            .await?;
        }

        for seat in updated_seats {
            sqlx::query!(
                r#"
                    UPDATE seat_types
                    SET name = $1, description = $2, price = $3, capacity = $4
                    WHERE id = $5
                    "#,
                seat.name,
                seat.description,
                seat.price,
                seat.capacity,
                seat.id.unwrap()
            )
            .execute(&mut *tx)
            .await?;
        }

        // Commit the transaction
        tx.commit().await?;

        Ok(())
    }
}
