use log::{error, info};
use sqlx::postgres::PgPool;

mod admin;
mod config;
mod event;
mod location;
mod user;

#[cfg(debug_assertions)]
pub mod test;

pub use admin::AdminType;
pub use event::{CreateEventInput, SeatTypeInput, UpdateEventInput, SeatUpdateInput, DBError};
pub use location::Location;
pub use user::User;

pub struct Db {
    client: PgPool,
}

impl Db {
    pub async fn new() -> Self {
        info!("Creating database pool...");
        let pool = config::create_pool().await;
        Self { client: pool }
    }

    pub async fn init(&self) -> Result<(), sqlx::Error> {
        info!("Running database migrations...");

        // First verify connection
        match sqlx::query("SELECT 1").execute(&self.client).await {
            Ok(_) => info!("Database connection successful"),
            Err(e) => {
                error!("Failed to connect to database: {}", e);
                return Err(e);
            }
        }

        // Run migrations
        match sqlx::migrate!("./migrations").run(&self.client).await {
            Ok(_) => {
                info!("Database migrations completed successfully");
                Ok(())
            }
            Err(e) => {
                error!("Migration failed: {}", e);
                Err(e.into())
            }
        }
    }
}
