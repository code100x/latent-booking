use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(sqlx::Type, Debug, Serialize, Deserialize)]
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
    #[sqlx(rename = "type")]
    pub admin_type: AdminType,
}

impl Db {
    pub async fn get_admin_by_number(&self, phone_number: &str) -> Result<Admin, Error> {
        info!("Fetching admin with number: {}", phone_number);

        let result = sqlx::query_as::<_, Admin>("SELECT * FROM admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await;

        match result {
            Ok(admin) => {
                info!("Admin found with id: {}", admin.id);
                Ok(admin)
            }
            Err(e) => {
                eprintln!("Database error occurred: {}", e);
                Err(e)
            }
        }
        //info!("Admin found with id: {}", admin.id);
        //Ok(admin)
    }

    pub async fn verify_admin_signin(&self, phone_number: String) -> Result<String, Error> {
        info!("Verifying signin for admin with number: {}", phone_number);

        let admin = sqlx::query_as::<_, Admin>("SELECT * FROM admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("Signin verified for admin with id: {}", admin.id);
        Ok(admin.id.to_string())
    }
}
