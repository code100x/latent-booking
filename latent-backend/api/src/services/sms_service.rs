use chrono::{Duration, TimeZone, Utc};
use poem::web::Data;
use poem_openapi::payload;
use sha2::{Digest, Sha256};
use std::{
    env,
    time::{SystemTime, UNIX_EPOCH},
};

use crate::{error::AppError, AppState};
use sqlx::Error;

const TIME_STEP: u64 = 30; // 30 seconds
pub struct SmsService {
    client: reqwest::Client,
    gupshup_url: String,
    gupshup_uid: String,
    gupshup_pass: String,
    template_id: String,
}

impl Default for SmsService {
    fn default() -> Self {
        Self {
            client: reqwest::Client::new(),
            gupshup_url: env::var("GUPSHUP_URL").unwrap(),
            gupshup_uid: env::var("GUPSHUP_UID").unwrap(),
            gupshup_pass: env::var("GUPSHUP_PASS").unwrap(),
            template_id: env::var("TEMPLATE_ID").unwrap(),
        }
    }
}

impl SmsService {
    pub async fn send_otp(
        &self,
        state: Data<&AppState>,
        number: String,
        _otp: String,
    ) -> Result<(), AppError> {
        if !self.can_send_otp(&state, &number).await? {
            return Err(AppError::RateLimitted(payload::Json(
                crate::error::ErrorBody {
                    message: "Too Many Requests".to_string(),
                },
            )));
        }

        // update db count :TODO: Make sure to move this line below before push
        let _ = state.db.update_otpc_by_number(&number).await?;

        let _ = self.client.post(&self.gupshup_url).body("").send().await?;

        Ok(())
    }

    pub async fn can_send_otp(&self, state: &Data<&AppState>, number: &str) -> Result<bool, Error> {
        let user = state.db.get_user_by_number(&number).await?;
        let updated_at_utc = Utc.from_utc_datetime(&user.updated_at);
        if user.otp_request_count > 4
            && Utc::now().signed_duration_since(updated_at_utc) < Duration::minutes(30)
        {
            return Ok(false);
        }
        Ok(true)
    }

    pub async fn generate_otp(&self, key: &str, salt: &str) -> String {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let counter = timestamp / TIME_STEP;

        let input = format!("{}{}{}", key, salt, counter);
        let mut hasher = Sha256::new();
        hasher.update(input.as_bytes());
        let result = hasher.finalize();

        let offset = (result[result.len() - 1] & 0xf) as usize;
        let code = ((result[offset] & 0x7f) as u32) << 24
            | (result[offset + 1] as u32) << 16
            | (result[offset + 2] as u32) << 8
            | (result[offset + 3] as u32);

        format!("{:0>6}", code % 1_000_000) // Always returns 6 digits
    }

    pub async fn verify_otp(&self, key: &str, salt: &str, token: &str) -> bool {
        if token.len() != 6 {
            return false;
        }
        let current = self.generate_otp(key, salt).await;
        token == current
    }
}

#[derive(Debug)]
pub enum OtpError {
    RequestErr(reqwest::Error),
    ResponseErr(u16),
}
