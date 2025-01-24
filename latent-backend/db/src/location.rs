use crate::Db;
use sqlx::Error;
use sqlx::FromRow;
use uuid::Uuid;
use serde::{Deserialize, Serialize};
use log::info;

#[derive(FromRow, Serialize, Deserialize)]
pub struct Location {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub image_url: Option<String>,
}

impl Db {
    pub async fn create_location(
        &self,
        name: String,
        description: Option<String>,
        image_url: Option<String>,
    ) -> Result<Location, Error> {
        info!("Creating new location: {}", name);
        
        let location = sqlx::query_as::<_, Location>(
            r#"
            INSERT INTO locations (id, name, description, image_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            "#
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

    pub async fn get_locations(&self) -> Result<Vec<Location>, Error> {
        info!("Fetching all locations");
        
        let locations = sqlx::query_as::<_, Location>("SELECT * FROM locations")
            .fetch_all(&self.client)
            .await?;

        info!("Found {} locations", locations.len());
        Ok(locations)
    }
}
