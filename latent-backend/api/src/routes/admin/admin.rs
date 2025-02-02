use std::env;

use log::info;
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use crate::{error::AppError, AppState, utils::{totp, twilio}};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, Header};


#[derive(Debug, Serialize, Deserialize, Object)]
pub struct CreateSuperAdmin {
    pub number: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct CreateSuperAdminResponse {
    pub message: String,
    pub id: String,
    pub jwt: String
}

#[derive(Debug, Serialize, Deserialize, Object)]
pub struct CreateAdminVerify {
    number: String,
    totp: String,
    name: String,
}

#[derive(Debug, Deserialize, Serialize, Object)]
pub struct VerifyAdminResponse {
    token: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String, 
    exp: usize,  
    admin_type: String, 
}

pub struct  AdminApi; 

#[OpenApi]
impl AdminApi {
    /// Create a admin
    #[oai(path = "/signin", method = "post")]
    pub async fn signin_admin(
        &self, 
        body: Json<CreateSuperAdmin>, 
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<CreateSuperAdminResponse>, AppError> {
        let number = body.0.number;
        let admin = state.db.create_admin(number.clone()).await?;

        // Generate and send OTP
        let otp = totp::get_token(&number, "SUPERADMIN");
        if cfg!(not(debug_assertions)) {
            twilio::send_message(&format!("Your OTP for signing up to Latent is {}", otp), &number)
                .await
                .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                    message: "Failed to send OTP".to_string(),
                })))?;
        } else {
            println!("Development mode: OTP is {}", otp);
        }

        let admin_secret  =  env::var("ADMIN_JWT_PASSWORD").unwrap_or_else(|_| "admin".to_string());
        info!("admin_secret {:}", admin_secret);

        // token generating 
        let encoding_key = jsonwebtoken::EncodingKey::from_secret(admin_secret.as_ref());
        let claims = Claims {
            sub: admin.id.to_string(),
            exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
            admin_type: "admin".to_string(), 
        };
        
        let jwt = encode(&Header::default(), &claims, &encoding_key)
            .map_err(|_| AppError::InternalServerError(payload::Json(crate::error::ErrorBody {
                message: "Failed to generate JWT".to_string(),
            })))?;

        Ok(payload::Json(CreateSuperAdminResponse {
            message: "Super Admin created successfully".to_string(),
            id: admin.id.to_string(),
            jwt: jwt
        }))
    }

    /// Verify admin creation
    #[oai(path = "/verify", method = "post")]
    pub async fn create_admin_verify(
        &self, 
        body: Json<CreateAdminVerify>,
        state: Data<&AppState>
    ) -> poem::Result<payload::Json<VerifyAdminResponse>, AppError> {
        let CreateAdminVerify { number, totp: otp, name } = body.0;
        
        // Verify OTP
        if cfg!(not(debug_assertions)) {
            if !totp::verify_token(&number, "AUTH", &otp) {
                return Err(AppError::InvalidCredentials(payload::Json(crate::error::ErrorBody {
                    message: "Invalid OTP".to_string(),
                })));
            }
        }

        let token = state.db.verify_admin(number, name).await?;
        
        Ok(payload::Json(VerifyAdminResponse { token }))
    }
}