use crate::{error::AppError, utils::{config, jwt::create_jwt}, AppState};
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
    token: String,
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


        let user_id = user.id.to_string();
        let jwt_token = create_jwt(user_id, 3600, &config::admin_jwt_password())?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test Admin created successfully".to_string(),
            token: jwt_token,
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

        let user_id = user.id.to_string();
        let jwt_token = create_jwt(user_id, 3600, &config::superadmin_jwt_password())?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test Super Admin created successfully".to_string(),
            token: jwt_token,
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

        let user_id = user.id.to_string();
        let jwt_token = create_jwt(user_id, 3600, &config::jwt_password())?;

        Ok(payload::Json(CreateTestUserResponse {
            message: "Test User created successfully".to_string(),
            token: jwt_token,
        }))
    }
}
