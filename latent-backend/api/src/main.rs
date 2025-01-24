use poem::{
    listener::TcpListener,
    middleware::Cors,
    EndpointExt, Route, Server,
};
use poem_openapi::OpenApiService;
use std::sync::Arc;

mod api;
mod error;
mod routes;
mod utils;

use db::Db;
use dotenv::dotenv;

#[derive(Clone)]
pub struct AppState {
    db: Arc<Db>,
}

pub struct Api;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    // Load environment variables
    dotenv().ok();
    
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    // Create and initialize database
    let db = Db::new().await;
    db.init().await.expect("Failed to initialize database");
    let db = Arc::new(db);

    // Create API service
    let api_service = OpenApiService::new(Api, "Latent Booking", "1.0")
        .server("http://localhost:3000/api/v1");
    
    // Create Swagger UI
    let ui = api_service.swagger_ui();

    // Create route with CORS
    let app = Route::new()
        .nest("/api/v1", api_service)
        .nest("/docs", ui)
        .with(Cors::new())
        .data(AppState { db });

    println!("Server running at http://localhost:3000");
    println!("API docs at http://localhost:3000/docs");
    
    // Start server
    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}
