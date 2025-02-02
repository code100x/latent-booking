use poem::{
    listener::TcpListener,
    middleware::Cors,
    EndpointExt, Route, Server,
};
use poem_openapi::OpenApiService;
use services::sms_service::SmsService;
use std::{env, sync::Arc};

mod error;
mod routes;
mod utils;
mod middleware;
mod services;

use db::Db;
use dotenv::dotenv;

#[derive(Clone)]
pub struct AppState {
    sms_service: Arc<SmsService>,
    db: Arc<Db>,
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));

    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let admin_secret = env::var("ADMIN_JWT_PASSWORD").unwrap_or_else(|_| "admin".to_string());
    println!("admin_secret inside main {:}", admin_secret);
    let server_url = format!("http://localhost:{}/api/v1", port);

    let db = Db::new().await;
    db.init().await.expect("Failed to initialize database");
    let db = Arc::new(db);

    // Injecting the sms service
    let sms_service = Arc::new(SmsService::default());

    // API services
    let user_api_service = OpenApiService::new(routes::user::user::UserApi, "Latent Booking API", "1.0");

    let admin_api_service = OpenApiService::new(routes::admin::admin::AdminApi, "Admin Latent Booking API", "1.0");

    let location_api_service =  OpenApiService::new(routes::admin::location::LocationApi, "Location Latent Booking API", "1.0");

    let event_api_service = OpenApiService::new(routes::admin::event::EventApi,  "Location Latent Booking API", "1.0");

    // Swagger UI for each API group
    let user_ui = user_api_service.swagger_ui();
    let admin_ui = admin_api_service.swagger_ui();
    let location_ui = location_api_service.swagger_ui();
    let events_ui = event_api_service.swagger_ui();

    // routes
    let mut app = Route::new()
        .nest("/api/v1/users", user_api_service)
        .nest("/api/v1/admin", admin_api_service)
        .nest("/api/v1/admin/location", location_api_service)
        .nest("/api/v1/admin/event", event_api_service.with(middleware::admin::AuthMiddleware::new(admin_secret)))
        .nest("/docs/user", user_ui)
        .nest("/docs/admin", admin_ui)
        .nest("/docs/admin/location", location_ui)
        .nest("/docs/admin/event", events_ui);

    // Test route
        if cfg!(debug_assertions) {
            let test_api_service = OpenApiService::new(routes::test::test::TestApi, "Test Latent Booking", "1.0")
                .server(format!("{}/test", server_url));
    
            app = app.nest("/api/v1/test", test_api_service);
            println!("Test routes enabled (development mode)");
        }

    // middleware and shared state
    let app = app.with(Cors::new()).data(AppState { sms_service,  db });

    println!("Server running at http://localhost:{}", port);
    println!("User API docs available at http://localhost:{}/docs/user", port);
    println!("Admin API docs available at http://localhost:{}/docs/admin", port);
    

    Server::new(TcpListener::bind(format!("0.0.0.0:{}", port)))
        .run(app)
        .await
}
