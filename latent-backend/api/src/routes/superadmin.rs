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
    /// Sign in existing superadmin
    #[oai(path = "/superadmin/signin", method = "post")]
    async fn superadmin_sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {
        let number = body.0.number;
        
        let _admin = state.db.get_superadmin_by_number(&number).await?;
        
        // Generate and send OTP
        let otp = totp::get_token(&number, "SUPERADMIN_AUTH");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(&format!("Your superadmin OTP for signing in to Latent is {}", otp), &number)
                .await
                .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                })))?;
        } else {
            println!("Development mode: Superadmin OTP is {}", otp);
        }

        Ok(payload::Json(SignInResponse {
            message: "OTP sent successfully".to_string(),
        }))
    }

    /// Verify superadmin sign in with OTP
    #[oai(path = "/superadmin/signin/verify", method = "post")]
    async fn superadmin_sign_in_verify(
        &self,
        body: Json<SignInVerify>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<VerifyResponse>, AppError> {
        let SignInVerify { number, totp: otp } = body.0;

        // Verify OTP
        if cfg!(not(debug_assertions)) {
            if !totp::verify_token(&number, "SUPERADMIN_AUTH", &otp) {
                return Err(AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                })));
            }
        }

        let admin_id = state.db.verify_superadmin_signin(number).await?;
        let token = jwt::create_token(&admin_id, "SUPERADMIN")?;
        
        Ok(payload::Json(VerifyResponse { token }))
    }
}
