use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use crate::{error::AppError, Api, AppState, auth::{AdminAuth, SuperAdminAuth}};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateLocationRequest {
    name: String,
    description: Option<String>,
    #[oai(rename = "imageUrl")]
    image_url: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct LocationResponse {
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct LocationsResponse {
    locations: Vec<Location>,
}

#[OpenApi]
impl Api {
    /// Create a new location (superadmin only)
    #[oai(path = "/admin/location", method = "post")]
    async fn create_location(
        &self,
        _auth: SuperAdminAuth,
        body: Json<CreateLocationRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<LocationResponse>, AppError> {
        let location = state.db.create_location(
            body.0.name,
            body.0.description,
            body.0.image_url,
        ).await?;

        Ok(payload::Json(LocationResponse {
            id: location.id.to_string(),
        }))
    }

    /// Get all locations (admin access)
    #[oai(path = "/admin/location", method = "get")]
    async fn get_locations(
        &self,
        _auth: AdminAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<LocationsResponse>, AppError> {
        let locations = state.db.get_locations().await?;
        Ok(payload::Json(LocationsResponse { locations }))
    }
}
