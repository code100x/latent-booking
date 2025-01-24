use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use crate::{error::AppError, Api, AppState, utils::{totp, jwt}};

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
struct VerifyResponse {
    token: String,
}

#[OpenApi]
impl Api {
    /// Sign in existing admin
    #[oai(path = "/admin/signin", method = "post")]
    async fn admin_sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {
        let number = body.0.number;
        
        let _admin = state.db.get_admin_by_number(&number).await?;
        
        // Generate and send OTP
        let otp = totp::get_token(&number, "ADMIN_AUTH");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(&format!("Your admin OTP for signing in to Latent is {}", otp), &number)
                .await
                .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                })))?;
        } else {
            println!("Development mode: Admin OTP is {}", otp);
        }

        Ok(payload::Json(SignInResponse {
            message: "OTP sent successfully".to_string(),
        }))
    }

    /// Verify admin sign in with OTP
    #[oai(path = "/admin/signin/verify", method = "post")]
    async fn admin_sign_in_verify(
        &self,
        body: Json<SignInVerify>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<VerifyResponse>, AppError> {
        let SignInVerify { number, totp: otp } = body.0;

        // Verify OTP
        if cfg!(not(debug_assertions)) {
            if !totp::verify_token(&number, "ADMIN_AUTH", &otp) {
                return Err(AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                })));
            }
        }

        let admin_id = state.db.verify_admin_signin(number).await?;
        let token = jwt::create_token(&admin_id, "ADMIN")?;
        
        Ok(payload::Json(VerifyResponse { token }))
    }
}
