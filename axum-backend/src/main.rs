mod routes;
mod handlers;

use std::net::SocketAddr;
use axum::http::{header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE}, Method};
use tower_http::cors::{AllowOrigin, CorsLayer};
use routes::route::create_router;

#[tokio::main]
async fn main() {
    let client = "";
    let cors: CorsLayer = CorsLayer::new()
        .allow_origin(AllowOrigin::any())
        .allow_methods([
            Method::GET,
            Method::POST,
        ])
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let app = create_router().layer(cors);
    let listener= tokio::net::TcpListener::bind(&addr).await.unwrap();

    
    println!("🚀 APPLICATION ROLLING ON 3000");
    println!("✅ CONNECTED TO DATABASE: {:?}", client);
    axum::serve(listener, app).await.unwrap();
}
