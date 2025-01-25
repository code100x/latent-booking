use crate::{
    error::AppError,
    utils::{totp, twilio},
    AppState,
};
use poem::web::{Data, Json};
use poem_openapi::{payload, Object, OpenApi};
use serde::{Deserialize, Serialize};

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

        let token = state.db.verify_admin_signin(number).await?;

        Ok(payload::Json(VerifyAdminResponse { token }))
    }

    #[oai(path = "/location", method = "get")]
    pub async fn get_location(&self) -> poem::Result<payload::Json<serde_json::Value>> {
        println!("GET /api/v1/admin/location handler hit!");
        Ok(payload::Json(
            serde_json::json!({ "message": "GET /admin/location" }),
        ))
    }

    #[oai(path = "/location", method = "post")]
    pub async fn create_location(&self) -> poem::Result<payload::Json<serde_json::Value>> {
        println!("POST /api/v1/admin/location handler hit!");
        Ok(payload::Json(
            serde_json::json!({ "message": "POST /admin/location" }),
        ))
    }
}
