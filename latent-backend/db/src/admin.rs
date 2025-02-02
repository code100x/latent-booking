use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;

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
    pub r#type: AdminType, 
}

impl Db {

    pub async fn create_admin(&self, phone_number: String) -> Result<Admin, Error> {
        let admin = sqlx::query_as::<_, Admin>(
            r#"
            INSERT INTO admins (id, number, name, verified, type)
            VALUES ($1, $2, '', false, 'Creator')
            ON CONFLICT (number) DO UPDATE SET
            name = EXCLUDED.name,
            verified = EXCLUDED.verified,
            type = EXCLUDED.type
            RETURNING *
            "#,
        )
        .bind(Uuid::new_v4())
        .bind(phone_number)
        .fetch_one(&self.client)
        .await?;
        info!("Admin created/updated successfully with id: {}", admin.id);
        Ok(admin)
    }
    pub async fn get_admin_by_number(&self, phone_number: &str) -> Result<Admin, Error> {
        info!("Fetching user with number: {}", phone_number);

        let admin = sqlx::query_as::<_, Admin>("SELECT * FROM admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("User found with id: {}", admin.id);
        Ok(admin)
    }

    pub async fn verify_admin(&self, phone_number: String, name: String) -> Result<String, Error> {
        info!("Verifying user with number: {}", phone_number);

        let admin = sqlx::query_as::<_, Admin>(
            "UPDATE admins SET verified=true, name=$1 WHERE number=$2 RETURNING *",
        )
        .bind(name)
        .bind(phone_number)
        .fetch_one(&self.client)
        .await?;

        info!("Admin verified successfully with id: {}", admin.id);
        Ok(admin.id.to_string())
    }
}
