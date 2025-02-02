use crate::Db;
use log::info;
use serde::{Deserialize, Serialize};
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;


#[derive(FromRow, Serialize, Deserialize)]
pub struct Location {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub image_url: String,
}


impl Db {
    pub async fn create_location(&self, name: String, description: String, image_url: String) -> Result<Location, Error> {
        info!("Creating Location");
        let location = sqlx::query_as::<_, Location>(
            r#"
            INSERT INTO locations (id, name, description, image_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            "#,
        )
        .bind(Uuid::new_v4())
        .bind(name)
        .bind(description)
        .bind(image_url)
        .fetch_one(&self.client)
        .await?;
        info!("Location created successfully with id: {}", location.id);
        Ok(location)
        
    }
    
}
