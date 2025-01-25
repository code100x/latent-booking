use sha2::{Digest, Sha256};
use std::time::{SystemTime, UNIX_EPOCH};

pub fn generate_otp(key: &str, salt: &str) -> String {
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs()
        / 30;

    let input = format!("AUTH{}{}{}", key, salt, timestamp);
    let hash = Sha256::digest(input.as_bytes());
    let code = u32::from_be_bytes(hash[0..4].try_into().unwrap()) % 1_000_000;

    format!("{:06}", code)
}

pub fn _verify_otp(key: &str, salt: &str, token: &str) -> bool {
    if token.len() != 6 {
        return false;
    } 
    generate_otp(key, salt) == token
}