use crate::handlers::base::healthcheck;

use axum::{
    routing::get,
    Router,
};

pub fn create_router() -> Router {
    let v1_routes = Router::new()
        .route("/ping", get(healthcheck));

    return Router::new().nest("/api/v1", v1_routes);
}