use crate::{
    error::AppError,
    middleware::admin::{admin_middleware, superadmin_middleware},
    utils::{config, jwt::create_jwt, totp, twilio},
    AppState,
};

use jsonwebtoken::{encode, EncodingKey, Header};
use poem::web::{Data, Json};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String, // Subject (e.g., user ID)
    exp: usize,  // Expiration time
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct VerifyAdminResponse {
    token: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SignInRequest {
    number: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SignInResponse {
    message: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct SignInVerify {
    number: String,
    totp: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct Location {
    id: String,
    name: String,
    description: String,
    imageUrl: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
pub struct LocationResponse {
    locations: Vec<Location>,
}

#[derive(Debug, Serialize, Deserialize, Object)]
pub struct CreateLocation {
    name: String,
    description: String,
    imageUrl: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
pub struct CreateLocationResponse {
    message: String,
    id: String,
}

pub struct AdminApi;

#[OpenApi]
impl AdminApi {
    /// Sign in existing admin
    #[oai(path = "/signin", method = "post")]
    async fn sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {
        let number = body.0.number;

        println!("Signing in admin with number: {}", number);

        let admin_result = state.db.get_admin_by_number(&number).await;

        if let Err(sqlx::Error::RowNotFound) = admin_result {
            return Err(AppError::AdminNotFound(payload::Json(
                crate::error::ErrorBody {
                    message: "Admin not found".to_string(),
                },
            )));
        }

        let _admin = admin_result?;
        // Generate and send OTP
        let otp = totp::get_token(&number, "ADMIN_AUTH");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(
                &format!("Your admin OTP for signing in to Latent is {}", otp),
                &number,
            )
            .await
            .map_err(|_| {
                AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                }))
            })?;
        } else {
            println!("Development mode: OTP is {}", otp);
        }

        Ok(payload::Json(SignInResponse {
            message: "OTP sent successfully".to_string(),
        }))
    }

    /// Verify sign in with OTP
    #[oai(path = "/signin/verify", method = "post")]
    async fn sign_in_verify(
        &self,
        body: Json<SignInVerify>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<VerifyAdminResponse>, AppError> {
        let SignInVerify { number, totp: otp } = body.0;

        // Verify OTP
        if cfg!(not(debug_assertions)) && !totp::verify_token(&number, "ADMIN_AUTH", &otp) {
            return Err(AppError::InvalidCredentials(payload::Json(
                crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                },
            )));
        }

        let user_id = state.db.verify_admin_signin(number).await?;

        let jwt_token = create_jwt(user_id, 3600, &config::admin_jwt_password())?;

        Ok(payload::Json(VerifyAdminResponse { token: jwt_token }))
    }

    #[oai(path = "/location", method = "get", transform = "admin_middleware")]
    pub async fn get_location(
        &self,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<LocationResponse>, AppError> {
        let db_locations = state.db.get_location().await?;

        let locations = db_locations
            .iter()
            .map(|l| Location {
                id: l.id.to_string(),
                name: l.name.clone(),
                description: l.description.clone(),
                imageUrl: l.image_url.clone(),
            })
            .collect();

        Ok(payload::Json(LocationResponse { locations }))
    }

    #[oai(
        path = "/location",
        method = "post",
        transform = "superadmin_middleware"
    )]
    pub async fn create_location(
        &self,
        body: Json<CreateLocation>,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<CreateLocationResponse>, AppError> {
        let CreateLocation {
            name,
            description,
            imageUrl,
        } = body.0;

        let location = state
            .db
            .create_location(name, description, imageUrl)
            .await?;

        Ok(payload::Json(CreateLocationResponse {
            message: "Location created successfully".to_string(),
            id: location.id.to_string(),
        }))
    }
}
