extern crate dotenv;
mod handlers;
#[allow(warnings)]
mod prisma;
mod routes;
mod utils;
mod services;

use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        Method,
    },
    Extension,
};
use prisma::PrismaClient;
use routes::route::create_router;
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{AllowOrigin, CorsLayer};
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let db_client = Arc::new(PrismaClient::_builder().build().await.unwrap());
    let cors: CorsLayer = CorsLayer::new()
        .allow_origin(AllowOrigin::any())
        .allow_methods([Method::GET, Method::POST])
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let app = create_router().layer(Extension(db_client)).layer(cors);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    println!("🚀 APPLICATION ROLLING ON 3000");
    println!("✅ CONNECTED TO DATABASE");
    axum::serve(listener, app).await.unwrap();
}
