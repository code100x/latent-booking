
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use crate::{error::AppError, AppState};
use serde::{ Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Object)]
pub struct CreateLocation {
pub  name:String,
pub description:String,
pub  image_url:String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct CreataLocationResponse {
    message: String,
    id: String,
}


pub struct  LocationApi; 

#[OpenApi]
impl LocationApi {
    /// Create a location
    #[oai(path = "/create", method = "post")]
    pub async fn create_locations(
        &self, 
        body: Json<CreateLocation>, 
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<CreataLocationResponse>, AppError> {
        let name = body.0.name;
        let description = body.0.description;
        let image_url = body.0.image_url;

        let location = state.db.create_location(name.clone(), description.clone(), image_url.clone()).await?;

        Ok(payload::Json(CreataLocationResponse {
            message: "Location created successfully".to_string(),
            id: location.id.to_string()
        }))
    }
}