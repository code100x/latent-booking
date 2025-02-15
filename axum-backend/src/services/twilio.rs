use reqwest::{Client, Error};
use std::env;

pub async fn send_message(body: String, number: String) -> Result<bool, Error> {
    let twilio_account_sid =
        env::var("TWILIO_ACCOUNT_SID").expect("Twilio Account SID could not be retrieved.");
    let twilio_auth_token =
        env::var("TWILIO_AUTH_TOKEN").expect("Twilio Auth Token could not be retrieved.");
    let twilio_phone_number =
        env::var("TWILIO_PHONE_NUMBER").expect("The Twilio phone number could not be retrieved.");

    let request_url =
        format!("https://api.twilio.com/2010-04-01/Accounts/{twilio_account_sid}/Messages.json");

    let client = Client::new();
    let request_params: [(&str, &String); 3] = [
        ("To", &number),
        ("From", &twilio_phone_number),
        ("Body", &body),
    ];
    let response = client
        .post(request_url)
        .basic_auth(twilio_account_sid, Some(twilio_auth_token))
        .form(&request_params)
        .send()
        .await?;

    // TODO: handle return
    if !response.status().is_success(){
        let response_text = response.text().await?;
        println!("{}", response_text);
    }

    Ok(true)
}
