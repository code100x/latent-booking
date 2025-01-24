use crate::Db;
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;
use serde::{Deserialize, Serialize};
use log::info;
use chrono::{DateTime, Utc};

#[derive(FromRow, Serialize, Deserialize)]
pub struct Booking {
    pub id: Uuid,
    pub event_id: Uuid,
    pub user_id: Uuid,
    pub status: String,
    pub sequence_number: i32,
    pub expiry: DateTime<Utc>,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct BookedSeat {
    pub id: Uuid,
    pub booking_id: Uuid,
    pub seat_type_id: Uuid,
    pub qr: String,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct Payment {
    pub id: Uuid,
    pub user_id: Uuid,
    pub booking_id: Uuid,
    pub amount: i32,
    pub status: String,
}

impl Db {
    pub async fn create_booking(
        &self,
        event_id: Uuid,
        user_id: Uuid,
        sequence_number: i32,
        seats: Vec<Uuid>,
        expiry: DateTime<Utc>,
    ) -> Result<Booking, Error> {
        let mut tx = self.client.begin().await?;

        let booking = sqlx::query_as::<_, Booking>(
            r#"
            INSERT INTO bookings (id, event_id, user_id, status, sequence_number, expiry)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            "#
        )
        .bind(Uuid::new_v4())
        .bind(event_id)
        .bind(user_id)
        .bind("Pending")
        .bind(sequence_number)
        .bind(expiry)
        .fetch_one(&mut *tx)
        .await?;

        for seat_type_id in seats {
            sqlx::query(
                r#"
                INSERT INTO booked_seats (id, booking_id, seat_type_id, qr)
                VALUES ($1, $2, $3, $4)
                "#
            )
            .bind(Uuid::new_v4())
            .bind(booking.id)
            .bind(seat_type_id)
            .bind("")
            .execute(&mut *tx)
            .await?;
        }

        tx.commit().await?;
        Ok(booking)
    }

    pub async fn get_user_bookings(&self, user_id: Uuid) -> Result<Vec<(Booking, Vec<BookedSeat>)>, Error> {
        let bookings = sqlx::query_as::<_, Booking>(
            "SELECT * FROM bookings WHERE user_id = $1"
        )
        .bind(user_id)
        .fetch_all(&self.client)
        .await?;

        let mut result = Vec::new();
        for booking in bookings {
            let seats = sqlx::query_as::<_, BookedSeat>(
                "SELECT * FROM booked_seats WHERE booking_id = $1"
            )
            .bind(booking.id)
            .fetch_all(&self.client)
            .await?;
            
            result.push((booking, seats));
        }

        Ok(result)
    }

    pub async fn get_user_payments(&self, user_id: Uuid) -> Result<Vec<Payment>, Error> {
        sqlx::query_as::<_, Payment>(
            "SELECT * FROM payments WHERE user_id = $1"
        )
        .bind(user_id)
        .fetch_all(&self.client)
        .await
    }
}
