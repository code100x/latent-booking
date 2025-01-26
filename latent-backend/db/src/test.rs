use crate::{admin::{Admin, AdminType}, Db, User};
use sqlx::Error;
use uuid::Uuid;
use log::info;

impl Db {
    pub async fn create_test_admin(&self, phone_number: String, name: String, admin_type: AdminType) -> Result<Admin, Error> {
        info!("Creating test admin with number: {} and name: {}", phone_number, name);
        
        let admin = sqlx::query_as::<_, Admin>(
            r#"
            INSERT INTO admins (id, number, name, verified, type)
            VALUES ($1, $2, $3, false, $4)
            ON CONFLICT (number) DO UPDATE
            SET number = EXCLUDED.number
            RETURNING *
            "#
        )
        .bind(Uuid::new_v4())
        .bind(phone_number)
        .bind(name)
        .bind(admin_type)
        .fetch_one(&self.client)
        .await?;

        info!("Test admin created/updated successfully with id: {}", admin.id);
        Ok(admin)
    }

    pub async fn create_test_user(&self, phone_number: String, name: String) -> Result<User, Error> {
        info!("Creating test user with number: {} and name: {}", phone_number, name);
        
        let user = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (id, number, name, verified)
            VALUES ($1, $2, $3, false)
            ON CONFLICT (number) DO UPDATE
            SET number = EXCLUDED.number
            RETURNING *
            "#
        )
        .bind(Uuid::new_v4())
        .bind(phone_number)
        .bind(name)
        .fetch_one(&self.client)
        .await?;

        info!("Test User created/updated successfully with id: {}", user.id);
        Ok(user)
    }
}

