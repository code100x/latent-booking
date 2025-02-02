use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub number: String,
    pub name: String,
    pub verified: bool,
}

#[derive(sqlx::Type, Serialize, Deserialize)]
#[sqlx(type_name = "admin_type")]
pub enum AdminType {
    SuperAdmin,
    Creator,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct Admin {
    pub id: Uuid,
    pub number: String,
    pub name: String,
    pub verified: bool,
    pub r#type: AdminType, // Change this to use the enum directly
}

impl Db {
    pub async fn create_user(&self, phone_number: String) -> Result<User, Error> {
        info!("Creating new user with number: {}", phone_number);

        let user = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (id, number, name, verified)
            VALUES ($1, $2, '', false)
            ON CONFLICT (number) DO UPDATE
            SET number = EXCLUDED.number
            RETURNING *
            "#,
        )
        .bind(Uuid::new_v4())
        .bind(phone_number)
        .fetch_one(&self.client)
        .await?;

        info!("User created/updated successfully with id: {}", user.id);
        Ok(user)
    }

    pub async fn verify_user(&self, phone_number: String, name: String) -> Result<String, Error> {
        info!("Verifying user with number: {}", phone_number);

        let user = sqlx::query_as::<_, User>(
            "UPDATE users SET verified=true, name=$1 WHERE number=$2 RETURNING *",
        )
        .bind(name)
        .bind(phone_number)
        .fetch_one(&self.client)
        .await?;

        info!("User verified successfully with id: {}", user.id);
        Ok(user.id.to_string())
    }

    pub async fn get_user_by_number(&self, phone_number: &str) -> Result<User, Error> {
        info!("Fetching user with number: {}", phone_number);

        let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("User found with id: {}", user.id);
        Ok(user)
    }

    pub async fn verify_signin(&self, phone_number: String) -> Result<String, Error> {
        info!("Verifying signin for user with number: {}", phone_number);

        let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("Signin verified for user with id: {}", user.id);
        Ok(user.id.to_string())
    }
}
