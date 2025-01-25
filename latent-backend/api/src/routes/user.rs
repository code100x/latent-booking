use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use crate::{error::AppError, AppState, utils::{totp, twilio}};

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateUser {
    number: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct CreateUserResponse {
    message: String,
    id: String,
}

#[derive(Debug, Serialize, Deserialize, Object)]
struct CreateUserVerify {
    number: String,
    totp: String,
    name: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
struct VerifyUserResponse {
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

pub struct UserApi;

#[OpenApi]
impl UserApi {
    /// Create a new user
    #[oai(path = "/signup", method = "post")]
    async fn create_user(&self, body: Json<CreateUser>, state: Data<&AppState>) -> poem::Result<payload::Json<CreateUserResponse>, AppError> {
        let number = body.0.number;
        let user = state.db.create_user(number.clone()).await?;

        // Generate and send OTP
        let otp = totp::get_token(&number, "AUTH");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(&format!("Your OTP for signing up to Latent is {}", otp), &number)
                .await
                .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                })))?;
        } else {
            println!("Development mode: OTP is {}", otp);
        }

        Ok(payload::Json(CreateUserResponse {
            message: "User created successfully".to_string(),
            id: user.id.to_string(),
        }))
    }

    /// Verify user creation with OTP
    #[oai(path = "/signup/verify", method = "post")]
    async fn create_user_verify(
        &self, 
        body: Json<CreateUserVerify>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<VerifyUserResponse>, AppError> {
        let CreateUserVerify { number, totp: otp, name } = body.0;
        
        // Verify OTP
        if cfg!(not(debug_assertions)) {
            if !totp::verify_token(&number, "AUTH", &otp) {
                return Err(AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                })));
            }
        }

        let token = state.db.verify_user(number, name).await?;
        
        Ok(payload::Json(VerifyUserResponse { token }))
    }

    /// Sign in existing user
    #[oai(path = "/signin", method = "post")]
    async fn sign_in(
        &self,
        body: Json<SignInRequest>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<SignInResponse>, AppError> {
        let number = body.0.number;
        
        let _user = state.db.get_user_by_number(&number).await?;
        
        // Generate and send OTP
        let otp = totp::get_token(&number, "AUTH");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(&format!("Your OTP for signing in to Latent is {}", otp), &number)
                .await
                .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                })))?;
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
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<VerifyUserResponse>, AppError> {
        let SignInVerify { number, totp: otp } = body.0;

        // Verify OTP
        if cfg!(not(debug_assertions)) {
            if !totp::verify_token(&number, "AUTH", &otp) {
                return Err(AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                })));
            }
        }

        let token = state.db.verify_signin(number).await?;
        
        Ok(payload::Json(VerifyUserResponse { token }))
    }
}
