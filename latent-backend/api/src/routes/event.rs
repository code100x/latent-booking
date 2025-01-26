use crate::{
    error::AppError,
    middleware::admin::{admin_middleware, TokenData},
    AppState,
};

use db::{CreateEventInput, SeatTypeInput, SeatUpdateInput, UpdateEventInput};
use poem::web::{Data, Json};
use poem_openapi::{param::Path, payload, Object, OpenApi};
use serde::{Deserialize, Serialize};
use sqlx::types::{time::PrimitiveDateTime, Uuid};
use time::macros::format_description;

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateEvent {
    name: String,
    description: String,
    banner: String,
    locationId: String,
    startTime: String,
    seats: Vec<SeatType>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateEventResponse {
    message: String,
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SeatType {
    name: String,
    description: String,
    price: i32,
    capacity: i32,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateEvent {
    name: String,
    description: String,
    start_time: String,
    location_id: String,
    banner: String,
    published: bool,
    ended: bool,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct EventResponse {
    id: String,
    name: String,
    description: String,
    start_time: String,
    location_id: String,
    banner: String,
    published: bool,
    ended: bool,
    seats_types: Vec<SeatType>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SingleEventWithSeatsResponse {
    message: String,
    event: EventResponse,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct EventWithSeatsResponse {
    message: String,
    event: Vec<EventResponse>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeat {
    id: Option<String>,
    name: String,
    description: String,
    price: i32,
    capacity: i32,
}

impl UpdateSeat {
    fn to_seat_update_input(&self) -> Result<SeatUpdateInput, AppError> {
        let id = match &self.id {
            Some(id) => Some(Uuid::parse_str(id).map_err(|_| {
                AppError::BadRequest(payload::Json(crate::error::ErrorBody {
                    message: format!("Invalid seat ID: {}", id),
                }))
            })?),
            None => None,
        };

        Ok(SeatUpdateInput {
            id,
            name: self.name.clone(),
            description: self.description.clone(),
            price: self.price,
            capacity: self.capacity,
        })
    }
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeatsInput {
    seats: Vec<UpdateSeat>,
}

pub struct EventApi;

#[OpenApi]
impl EventApi {
    /// Create a new event
    #[oai(path = "/", method = "post", transform = "admin_middleware")]
    async fn create_admin_event(
        &self,
        admin_id: Data<&TokenData>,
        body: Json<CreateEvent>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateEventResponse>, AppError> {
        println!("Admin ID from token: {:?}", admin_id.id);

        let location_id = Uuid::parse_str(body.0.locationId.as_str()).map_err(|_| {
            AppError::InternalServerErroInternalServerError(payload::Json(crate::error::ErrorBody {
                message: "Invalid location ID".to_string(),
            }))
        })?;

        let format = format_description!("[year]-[month]-[day] [hour]:[minute]:[second]");
        let start_time =
            PrimitiveDateTime::parse(body.0.startTime.as_str(), &format).map_err(|_| {
                AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid start time".to_string(),
                }))
            })?;

        let admin_id = Uuid::parse_str(admin_id.id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let event = state
            .db
            .create_event(CreateEventInput {
                name: body.0.name,
                description: body.0.description,
                banner: body.0.banner,
                admin_id,
                location_id,
                start_time,
                seats: body
                    .0
                    .seats
                    .iter()
                    .map(|st| SeatTypeInput {
                        name: st.name.clone(),
                        description: st.description.clone(),
                        price: st.price,
                        capacity: st.capacity,
                    })
                    .collect(),
            })
            .await?;

        Ok(payload::Json(CreateEventResponse {
            message: "Event created successfully".to_string(),
            id: event.id.to_string(),
        }))
    }

    /// Update event metadata
    #[oai(
        path = "/metadata/:event_id",
        method = "put",
        transform = "admin_middleware"
    )]
    async fn update_admin_event(
        &self,
        event_id: Path<String>,
        admin_id: Data<&TokenData>,
        body: Json<UpdateEvent>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateEventResponse>, AppError> {
        let location_id = Uuid::parse_str(body.0.location_id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid location ID".to_string(),
            }))
        })?;

        let format = format_description!("[year]-[month]-[day] [hour]:[minute]:[second]");
        let start_time =
            PrimitiveDateTime::parse(body.0.start_time.as_str(), &format).map_err(|_| {
                AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid start time".to_string(),
                }))
            })?;

        let admin_id = Uuid::parse_str(admin_id.id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let event_id = Uuid::parse_str(event_id.0.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;
        let event = state
            .db
            .update_event_metadata(UpdateEventInput {
                name: body.0.name,
                description: body.0.description,
                banner: body.0.banner,
                admin_id,
                location_id,
                start_time,
                published: body.0.published,
                ended: body.0.ended,
                event_id,
            })
            .await?;

        Ok(payload::Json(CreateEventResponse {
            message: "Event updated successfully".to_string(),
            id: event.id.to_string(),
        }))
    }

    /// List events for an admin
    #[oai(path = "/", method = "get", transform = "admin_middleware")]
    async fn list_events(
        &self,
        admin_id: Data<&TokenData>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<EventWithSeatsResponse>, AppError> {
        let admin_id = Uuid::parse_str(admin_id.id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let events = state.db.get_events(admin_id).await?;
        let event_responses: Vec<EventResponse> = events
            .into_iter()
            .map(|event| EventResponse {
                id: event.id.to_string(),
                name: event.name,
                description: event.description,
                banner: event.banner,
                location_id: event.location_id.to_string(),
                start_time: event.start_time.to_string(),
                published: event.published,
                ended: event.ended,
                seats_types: event
                    .seat_types
                    .map(|seat_types_value| {
                        serde_json::from_value::<Vec<SeatType>>(seat_types_value)
                            .unwrap_or_else(|_| Vec::new()) // Handle deserialization errors
                    })
                    .unwrap_or_default(),
            })
            .collect();

        Ok(payload::Json(EventWithSeatsResponse {
            message: "Events fetched successfully".to_string(),
            event: event_responses,
        }))
    }

    /// Get a specific event
    #[oai(path = "/:event_id", method = "get", transform = "admin_middleware")]
    async fn get_event_by_id(
        &self,
        event_id: Path<String>,
        admin_id: Data<&TokenData>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SingleEventWithSeatsResponse>, AppError> {
        let admin_id = Uuid::parse_str(admin_id.id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let event_id = Uuid::parse_str(event_id.0.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let events = state.db.get_event(event_id, admin_id).await?;
        let event_responses = EventResponse {
            id: events.id.to_string(),
            name: events.name,
            description: events.description,
            banner: events.banner,
            location_id: events.location_id.to_string(),
            start_time: events.start_time.to_string(),
            published: events.published,
            ended: events.ended,
            seats_types: events
                .seat_types
                .map(|seat_types_value| {
                    serde_json::from_value::<Vec<SeatType>>(seat_types_value)
                        .unwrap_or_else(|_| Vec::new()) // Handle deserialization errors
                })
                .unwrap_or_default(),
        };

        Ok(payload::Json(SingleEventWithSeatsResponse {
            message: "Events fetched successfully".to_string(),
            event: event_responses,
        }))
    }

    /// Update seats for an event
    #[oai(
        path = "/seats/:event_id",
        method = "put",
        transform = "admin_middleware"
    )]
    async fn update_seats(
        &self,
        event_id: Path<String>,
        admin_id: Data<&TokenData>,
        body: Json<UpdateSeatsInput>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<String>, AppError> {
        let admin_id = Uuid::parse_str(admin_id.id.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid admin ID".to_string(),
            }))
        })?;

        let event_id = Uuid::parse_str(event_id.0.as_str()).map_err(|_| {
            AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                message: "Invalid event ID".to_string(),
            }))
        })?;

        if body.0.seats.is_empty() {
            return Err(AppError::BadRequest(payload::Json(
                crate::error::ErrorBody {
                    message: "No seats provided".to_string(),
                },
            )));
        }

        let seats: Result<Vec<SeatUpdateInput>, AppError> = body
            .0
            .seats
            .into_iter()
            .map(|seat| seat.to_seat_update_input())
            .collect();

        let seats = seats?;

        state
            .db
            .update_seats(event_id, admin_id, seats)
            .await?;

        Ok(payload::Json("Seats updated successfully".to_string()))
    }
}
