use crate::{error::AppError, AppState};
use db::AdminType;
use poem::web::{Data, Json};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateTestUser {
    number: String,
    name: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct CreateTestUserResponse {
    message: String,
    id: String,
}

pub struct TestApi;

#[OpenApi]
impl TestApi {
    /// Create a test admin
    #[oai(path = "/create-admin", method = "post")]
    async fn create_admin(
        &self,
        body: Json<CreateTestUser>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateTestUserResponse>, AppError> {
        let number = body.0.number;
        let name = body.0.name;
        let user = state
            .db
            .create_test_admin(number.clone(), name, AdminType::Creator)
            .await?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test Admin created successfully".to_string(),
            id: user.id.to_string(),
        }))
    }

    /// Create a test super-admin
    #[oai(path = "/create-super-admin", method = "post")]
    async fn create_super_admin(
        &self,
        body: Json<CreateTestUser>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateTestUserResponse>, AppError> {
        let number = body.0.number;
        let name = body.0.name;
        let user = state
            .db
            .create_test_admin(number.clone(), name, AdminType::SuperAdmin)
            .await?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test Super Admin created successfully".to_string(),
            id: user.id.to_string(),
        }))
    }

    /// Create a test user
    #[oai(path = "/create-user", method = "post")]
    async fn create_test_user(
        &self,
        body: Json<CreateTestUser>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateTestUserResponse>, AppError> {
        let number = body.0.number;
        let name = body.0.name;
        let user = state.db.create_test_user(number.clone(), name).await?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test User created successfully".to_string(),
            id: user.id.to_string(),
        }))
    }
}
