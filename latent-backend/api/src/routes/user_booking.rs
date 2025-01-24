use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use uuid::Uuid;
use chrono::{DateTime, Utc};
use crate::{error::AppError, Api, AppState, auth::UserAuth};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateBookingRequest {
    #[oai(rename = "eventId")]
    event_id: String,
    seats: Vec<SeatRequest>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SeatRequest {
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct BookingResponse {
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct BookingsResponse {
    bookings: Vec<(Booking, Vec<BookedSeat>)>,
}

#[OpenApi]
impl Api {
    /// Create a new booking
    #[oai(path = "/user/bookings", method = "post")]
    async fn create_booking(
        &self,
        auth: UserAuth,
        body: Json<CreateBookingRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<BookingResponse>, AppError> {
        let user_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let event_id = Uuid::parse_str(&body.0.event_id).map_err(|_| AppError::InvalidData)?;

        let event = state.db.get_event(event_id, user_id).await?;
        if event.0.start_time <= Utc::now() {
            return Err(AppError::NotFound(payload::Json(crate::error::ErrorBody {
                message: "Event not found or already started".to_string(),
            })));
        }

        let seats: Vec<Uuid> = body.0.seats
            .into_iter()
            .map(|seat| Uuid::parse_str(&seat.id))
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| AppError::InvalidData)?;

        // TODO: Implement Redis integration for sequence number
        let sequence_number = 1;
        let expiry = Utc::now() + chrono::Duration::seconds(event.0.timeout_in_s.unwrap_or(300) as i64);

        let booking = state.db.create_booking(
            event_id,
            user_id,
            sequence_number,
            seats,
            expiry,
        ).await?;

        Ok(payload::Json(BookingResponse {
            id: booking.id.to_string(),
        }))
    }

    /// Get user bookings
    #[oai(path = "/user/bookings", method = "get")]
    async fn get_bookings(
        &self,
        auth: UserAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<BookingsResponse>, AppError> {
        let user_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let bookings = state.db.get_user_bookings(user_id).await?;
        Ok(payload::Json(BookingsResponse { bookings }))
    }
}
