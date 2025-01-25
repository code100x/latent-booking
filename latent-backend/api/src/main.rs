use poem::{get, listener::TcpListener, middleware::Cors, EndpointExt, Route, Server};
use poem_openapi::OpenApiService;
use std::sync::Arc;

mod error;
mod middleware;
mod routes;
mod utils;

use db::Db;
use dotenv::dotenv;
use std::env;

#[derive(Clone)]
pub struct AppState {
    db: Arc<Db>,
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    // Load environment variables
    dotenv().ok();

    // Initialize logger
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    // Read port from environment variable
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let server_url = format!("http://localhost:{}/api/v1", port);

    // Create and initialize database
    let db = Db::new().await;
    db.init().await.expect("Failed to initialize database");
    let db = Arc::new(db);

    // Create API service
    let api_service =
        OpenApiService::new(routes::user::UserApi, "Latent Booking", "1.0").server(&server_url);

    let admin_api_service =
        OpenApiService::new(routes::admin::AdminApi, "Admin Latent Booking", "1.0")
            .server(format!("{}/admin", server_url));

    // Create Swagger UI
    let ui = api_service.swagger_ui();

    // Create route with CORS
    let mut app = Route::new()
        .nest("/api/v1", api_service)
        .nest("/api/v1/admin", admin_api_service)
        .nest("/docs", ui);

    if cfg!(debug_assertions) {
        let test_api_service =
            OpenApiService::new(routes::test::TestApi, "Test Latent Booking", "1.0")
                .server(format!("{}/test", server_url));

        app = app.nest("/api/v1/test", test_api_service);
        println!("Test routes enabled (development mode)");
    }

    let app = app
        .at("/api/v1/admin/location", |route| {
            route
                .get()
                .with(middleware::admin::AdminMiddleware) // AdminMiddleware for GET
                .to(routes::admin::AdminApi::get_location)
                .post()
                .with(middleware::admin::SuperAdminMiddleware) // SuperAdminMiddleware for POST
                .to(routes::admin::AdminApi::create_location)
        })
        .with(Cors::new())
        .data(AppState { db });

    println!("Server running at {}", server_url);
    println!("API docs at {}/docs", server_url);

    // Start server
    Server::new(TcpListener::bind(format!("0.0.0.0:{}", port)))
        .run(app)
        .await
}
