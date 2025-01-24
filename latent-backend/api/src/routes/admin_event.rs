use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use uuid::Uuid;
use chrono::{DateTime, Utc};
use crate::{error::AppError, Api, AppState, auth::AdminAuth};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateEventRequest {
    name: String,
    description: Option<String>,
    #[oai(validator(pattern = r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$"))]
    start_time: String,
    location_id: String,
    banner: Option<String>,
    seats: Vec<CreateSeatRequest>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateSeatRequest {
    name: String,
    description: Option<String>,
    price: i32,
    capacity: i32,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct EventResponse {
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateEventRequest {
    name: String,
    description: Option<String>,
    #[oai(validator(pattern = r"^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$"))]
    start_time: String,
    location: String,
    banner: Option<String>,
    published: bool,
    ended: bool,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeatRequest {
    id: Option<String>,
    name: String,
    description: Option<String>,
    price: i32,
    capacity: i32,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeatsRequest {
    seats: Vec<UpdateSeatRequest>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeatsResponse {
    message: String,
}

#[OpenApi]
impl Api {
    /// Create a new event
    #[oai(path = "/admin/event", method = "post")]
    async fn create_event(
        &self,
        auth: AdminAuth,
        body: Json<CreateEventRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<EventResponse>, AppError> {
        let admin_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let location_id = Uuid::parse_str(&body.0.location_id).map_err(|_| AppError::InvalidData)?;
        let start_time = DateTime::parse_from_str(&body.0.start_time, "%Y-%m-%d %H:%M:%S")
            .map_err(|_| AppError::InvalidData)?
            .with_timezone(&Utc);

        let seats: Vec<(String, Option<String>, i32, i32)> = body.0.seats
            .into_iter()
            .map(|seat| (seat.name, seat.description, seat.price, seat.capacity))
            .collect();

        let event_id = state.db.create_event(
            body.0.name,
            body.0.description,
            start_time,
            location_id,
            body.0.banner,
            admin_id,
            seats,
        ).await?;

        Ok(payload::Json(EventResponse {
            id: event_id.to_string(),
        }))
    }

    /// Update event metadata
    #[oai(path = "/admin/event/metadata/:event_id", method = "put")]
    async fn update_event(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        body: Json<UpdateEventRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<EventResponse>, AppError> {
        let admin_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let event_id = Uuid::parse_str(&event_id.0).map_err(|_| AppError::InvalidData)?;
        let location_id = Uuid::parse_str(&body.0.location).map_err(|_| AppError::InvalidData)?;
        let start_time = DateTime::parse_from_str(&body.0.start_time, "%Y-%m-%d %H:%M:%S")
            .map_err(|_| AppError::InvalidData)?
            .with_timezone(&Utc);

        let event = state.db.update_event(
            event_id,
            body.0.name,
            body.0.description,
            start_time,
            location_id,
            body.0.banner,
            admin_id,
            body.0.published,
            body.0.ended,
        ).await?;

        Ok(payload::Json(EventResponse {
            id: event.id.to_string(),
        }))
    }

    /// Get all events for admin
    #[oai(path = "/admin/event", method = "get")]
    async fn get_events(
        &self,
        auth: AdminAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<Vec<(Event, Vec<SeatType>)>>, AppError> {
        let admin_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let events = state.db.get_admin_events(admin_id).await?;
        Ok(payload::Json(events))
    }

    /// Get single event
    #[oai(path = "/admin/event/:event_id", method = "get")]
    async fn get_event(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<(Event, Vec<SeatType>)>, AppError> {
        let admin_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let event_id = Uuid::parse_str(&event_id.0).map_err(|_| AppError::InvalidData)?;
        let event = state.db.get_event(event_id, admin_id).await?;
        Ok(payload::Json(event))
    }

    /// Update event seats
    #[oai(path = "/admin/event/seats/:event_id", method = "put")]
    async fn update_seats(
        &self,
        auth: AdminAuth,
        event_id: poem::web::Path<String>,
        body: Json<UpdateSeatsRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<UpdateSeatsResponse>, AppError> {
        let admin_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let event_id = Uuid::parse_str(&event_id.0).map_err(|_| AppError::InvalidData)?;

        let seats: Vec<(Option<Uuid>, String, Option<String>, i32, i32)> = body.0.seats
            .into_iter()
            .map(|seat| {
                let seat_id = seat.id.map(|id| Uuid::parse_str(&id).ok()).flatten();
                (seat_id, seat.name, seat.description, seat.price, seat.capacity)
            })
            .collect();

        state.db.update_event_seats(event_id, admin_id, seats).await?;

        Ok(payload::Json(UpdateSeatsResponse {
            message: "Seats updated".to_string(),
        }))
    }
}
