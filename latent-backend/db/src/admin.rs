use crate::Db;
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;
use serde::{Deserialize, Serialize};
use log::info;

#[derive(FromRow, Serialize, Deserialize)]
pub struct Admin {
    pub id: Uuid,
    pub number: String,
    pub name: String,
    pub verified: bool,
}

#[derive(FromRow, Serialize, Deserialize)]
pub struct SuperAdmin {
    pub id: Uuid,
    pub number: String,
    pub name: String,
    pub verified: bool,
}

impl Db {
    pub async fn get_admin_by_number(&self, phone_number: &str) -> Result<Admin, Error> {
        info!("Fetching admin with number: {}", phone_number);
        
        let admin = sqlx::query_as::<_, Admin>("SELECT * FROM admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("Admin found with id: {}", admin.id);
        Ok(admin)
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

    pub async fn get_superadmin_by_number(&self, phone_number: &str) -> Result<SuperAdmin, Error> {
        info!("Fetching superadmin with number: {}", phone_number);
        
        let admin = sqlx::query_as::<_, SuperAdmin>("SELECT * FROM super_admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("Superadmin found with id: {}", admin.id);
        Ok(admin)
    }

    pub async fn verify_superadmin_signin(&self, phone_number: String) -> Result<String, Error> {
        info!("Verifying signin for superadmin with number: {}", phone_number);
        
        let admin = sqlx::query_as::<_, SuperAdmin>("SELECT * FROM super_admins WHERE number = $1")
            .bind(phone_number)
            .fetch_one(&self.client)
            .await?;

        info!("Signin verified for superadmin with id: {}", admin.id);
        Ok(admin.id.to_string())
    }
}
