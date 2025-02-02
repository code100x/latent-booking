use sqlx::postgres::{PgPool, PgPoolOptions};
use std::env;
use log::info;

pub struct Config {
    pub db_url: String
}

impl Default for Config {
    fn default() -> Self {
        let db_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");
        info!("DATABASE_URL: {}", db_url); // logging the env 
        Self {
            db_url
        }
    }
}

pub async fn create_pool() -> PgPool {
    let config = Config::default();
    info!("Creating database pool with connection timeout of 5 seconds");
    
    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(5))
        .connect(&config.db_url)
        .await
        .expect("Failed to create pool")
}