use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use crate::error::AppError;
use poem_openapi::payload;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // Subject (e.g., user ID)
    pub exp: usize,  // Expiration time
}

/// Generates a JWT token for the given user ID and expiration time.
pub fn create_jwt(
    user_id: String,
    expiration_seconds: usize,
    secret_key: &str,
) -> Result<String, AppError> {
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|_| {
            AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                message: "Failed to get current time".to_string(),
            }))
        })?
        .as_secs() as usize;

    let exp = current_time + expiration_seconds;

    let claims = Claims {
        sub: user_id,
        exp,
    };

    let jwt_token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret_key.as_bytes()),
    )?;

    Ok(jwt_token)
}
