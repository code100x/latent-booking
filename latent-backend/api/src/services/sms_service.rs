use chrono::{Duration, TimeZone, Utc};
use poem::web::Data;
use poem_openapi::payload;
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::{
    env,
    time::{SystemTime, UNIX_EPOCH},
};

use crate::{error::AppError, AppState};
use sqlx::Error;

const TIME_STEP: u64 = 30; // 30 seconds

#[derive(Serialize)]
struct SmsParams<'a> {
    userid: &'a str,
    password: &'a str,
    send_to: &'a str,
    msg: &'a str,
    method: &'a str,
    msg_type: &'a str,
    format: &'a str,
    auth_scheme: &'a str,
    v: &'a str,
}

pub struct SmsService {
    client: reqwest::Client,
    gupshup_url: String,
    gupshup_uid: String,
    gupshup_pass: String,
}

impl Default for SmsService {
    fn default() -> Self {
        Self {
            client: reqwest::Client::new(),
            gupshup_url: env::var("GUPSHUP_URL").unwrap(),
            gupshup_uid: env::var("GUPSHUP_UID").unwrap(),
            gupshup_pass: env::var("GUPSHUP_PASS").unwrap(),
        }
    }
}

impl SmsService {
    pub async fn send_otp(
        &self,
        state: Data<&AppState>,
        number: String,
        otp: String,
    ) -> Result<(), AppError> {
        if !self.can_send_otp(&state, &number).await? {
            return Err(AppError::RateLimitted(payload::Json(
                crate::error::ErrorBody {
                    message: "Too Many Requests".to_string(),
                },
            )));
        }

        let params = SmsParams {
            userid: &self.gupshup_uid,
            password: &self.gupshup_pass,
            send_to: &number,
            msg: &format!("Your OTP for the Latent app is {otp}"),
            method: "sendMessage",
            msg_type: "text",
            format: "json",
            auth_scheme: "plain",
            v: "1.1",
        };

        let _ = self.client.post(&self.gupshup_url).form(&params).header("Content-Type", "application/x-www-form-urlencoded").send().await?;
        let _ = state.db.update_otpc_by_number(&number).await?;

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