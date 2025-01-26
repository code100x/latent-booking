use crate::{
    error::AppError,
    middleware::admin::{admin_middleware, superadmin_middleware, TokenData},
    utils::{config, jwt::create_jwt, totp, twilio},
    AppState,
};

use poem::{web::{Data, Json}, Request};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateEvent {
    name: String,
    description: String,
    start_time: String, // Use chrono for date handling
    location_id: String,
    banner: String,
    seats: Vec<SeatType>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SeatType {
    name: String,
    description: String,
    price: f64,
    capacity: i32,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateEvent {
    name: Option<String>,
    description: Option<String>,
    start_time: Option<String>,
    location_id: Option<String>,
    banner: Option<String>,
    published: Option<bool>,
    ended: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct UpdateSeat {
    id: Option<String>,
    name: String,
    description: String,
    price: f64,
    capacity: i32,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct EventResponse {
    id: String,
    name: String,
    description: String,
    start_time: String,
    location_id: String,
    banner: String,
    seats: Vec<SeatType>,
}

pub struct EventApi;

#[OpenApi]
impl EventApi {
    /// Create a new event
    #[oai(path = "/", method = "get", transform = "admin_middleware")]
    async fn create_event(
        &self,
        admin_id: Data<&TokenData>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<&str>, AppError>{
        println!("Admin ID from token: {:?}", admin_id.0);

        //let admin_id = state.admin_id; // Assuming admin_id is set by middleware
        //let event = state.db.create_event(admin_id, body.0).await?;
        Ok(payload::Json({"message"}))
    }

    ///// Update event metadata
    //#[oai(
    //    path = "/event/metadata/:event_id",
    //    method = "put",
    //    transform = "admin_middleware"
    //)]
    //async fn update_event_metadata(
    //    &self,
    //    event_id: Path<String>,
    //    body: Json<UpdateEvent>,
    //    state: Data<&AppState>,
    //) -> poem::Result<payload::Json<EventResponse>, AppError> {
    //    let admin_id = state.admin_id;
    //    let event = state
    //        .db
    //        .update_event_metadata(event_id.0, admin_id, body.0)
    //        .await?;
    //    Ok(payload::Json(event))
    //}
    //
    ///// List events for an admin
    //#[oai(path = "/event", method = "get", transform = "admin_middleware")]
    //async fn list_events(
    //    &self,
    //    state: Data<&AppState>,
    //) -> poem::Result<payload::Json<Vec<EventResponse>>, AppError> {
    //    let admin_id = state.admin_id;
    //    let events = state.db.get_events(admin_id).await?;
    //    Ok(payload::Json(events))
    //}
    //
    ///// Get a specific event
    //#[oai(
    //    path = "/event/:event_id",
    //    method = "get",
    //    transform = "admin_middleware"
    //)]
    //async fn get_event(
    //    &self,
    //    event_id: Path<String>,
    //    state: Data<&AppState>,
    //) -> poem::Result<payload::Json<EventResponse>, AppError> {
    //    let admin_id = state.admin_id;
    //    let event = state.db.get_event(event_id.0, admin_id).await?;
    //    Ok(payload::Json(event))
    //}
    //
    ///// Update seats for an event
    //#[oai(
    //    path = "/event/seats/:event_id",
    //    method = "put",
    //    transform = "admin_middleware"
    //)]
    //async fn update_seats(
    //    &self,
    //    event_id: Path<String>,
    //    body: Json<Vec<UpdateSeat>>,
    //    state: Data<&AppState>,
    //) -> poem::Result<payload::Json<String>, AppError> {
    //    let admin_id = state.admin_id;
    //    state.db.update_seats(event_id.0, admin_id, body.0).await?;
    //    Ok(payload::Json("Seats updated successfully".to_string()))
    //}
}
