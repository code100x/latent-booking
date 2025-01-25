use std::sync::Arc;

use axum::{
    http::StatusCode,
    response::{IntoResponse, Json as AxumJson},
    Extension, Json,
};
use serde::Deserialize;
use serde_json::json;
use validator::Validate;

use crate::{
    prisma::{user, PrismaClient},
    utils::totp,
    services::twilio
};

type Database = Extension<Arc<PrismaClient>>;

#[derive(Debug, Validate, Deserialize)]
pub struct AuthPayload {
    #[validate(length(min = 9, max = 13, message = "Invalid Number"))]
    number: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct SigninVerifyPayload {
    #[validate(length(min = 9, max = 13, message = "Invalid Number"))]
    number: String,

    #[validate(length(min = 6, max = 6, message = "OTP should be of lenght 6"))]
    otp: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct SignupVerifyPayload {
    #[validate(length(min = 9, max = 13, message = "Invalid Number"))]
    number: String,

    #[validate(length(min = 6, max = 6, message = "OTP should be of lenght 6"))]
    otp: String,

    #[validate(length(min = 1, max = 255, message = "Username cannot be empty"))]
    name: String,
}

pub async fn signup(db: Database, Json(payload): Json<AuthPayload>) -> impl IntoResponse {
    match payload.validate() {
        Ok(_) => {
            // 1. DB entry of user
            let _db = db
                .user()
                .upsert(
                    user::number::equals(payload.number.to_string()),
                    user::create(payload.number.clone().to_string(), "".to_string(), vec![]),
                    vec![],
                )
                .exec()
                .await;

            // 2. get auth token
            let otp: String = totp::generate_otp(&payload.number, "AUTH");

            // 3. if prod -> send top to user else dummy otp
            if cfg!(debug_assertions) {
                let _sms_status = twilio::send_message(
                    format!("Your OTP for signing up to Latent is {}", otp),
                    payload.number,
                )
                .await;
            } else {
                println!("Development mode: OTP is {}", otp);
            }

            (
                StatusCode::OK,
                Json(json!({
                    "status": 200,
                    "message": "OTP send successfully"
                })),
            )
                .into_response()
        }
        Err(e) => (StatusCode::BAD_REQUEST, AxumJson(e)).into_response(),
    }
}



pub async fn signup_verification(Json(payload): Json<SignupVerifyPayload>) -> impl IntoResponse {
    match payload.validate() {
        Ok(_) => (StatusCode::OK).into_response(),
        Err(e) => (StatusCode::BAD_REQUEST, AxumJson(e)).into_response(),
    }
}



pub async fn signin(Json(payload): Json<AuthPayload>) -> impl IntoResponse {
    match payload.validate() {
        Ok(_) => (StatusCode::OK).into_response(),
        Err(e) => (StatusCode::BAD_REQUEST, AxumJson(e)).into_response(),
    }
}

pub async fn signin_varification(Json(payload): Json<SigninVerifyPayload>) -> impl IntoResponse {
    match payload.validate() {
        Ok(_) => (StatusCode::OK).into_response(),
        Err(e) => (StatusCode::BAD_REQUEST, AxumJson(e)).into_response(),
    }
}
