use log::info;
use reqwest::Client;
use serde_json::json;
use std::env;

pub async fn send_message(message: &str, to: &str) -> Result<(), Box<dyn std::error::Error>> {
    let account_sid = env::var("TWILIO_ACCOUNT_SID")?;
    let auth_token = env::var("TWILIO_AUTH_TOKEN")?;
    let from = env::var("TWILIO_PHONE_NUMBER")?;

    info!("{}", account_sid);
    info!("{}", auth_token);
    info!("{}", from);

    let url = format!(
        "https://api.twilio.com/2010-04-01/Accounts/{}/Messages.json",
        account_sid
    );

    println!("{}", url);
    println!("{}", to);
    println!("{}", from);
    println!("{}", message);

    let client = Client::new();
    let response = client
        .post(&url)
        .basic_auth(&account_sid, Some(&auth_token))
        .form(&json!({
            "To": to,
            "From": from,
            "Body": message,
        }))
        .send()
        .await?;
    if !response.status().is_success() {
        let status = response.status();
        println!("{}", status);
        let error_message = response.text().await?;
        println!("{}", error_message); 

        return Err(format!("Failed to send SMS: {}, Details: {}", status, error_message).into());
    }

    Ok(())
} 