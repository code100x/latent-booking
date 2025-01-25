use crate::handlers::{
    base::healthcheck,
    auth::{
        signin,
        signin_varification,
        signup,
        signup_verification
    }
};

use axum::{
    routing::{get, post},
    Router,
};

fn auth_router() -> Router {
    Router::new()
    .route("/signup", post(signup))
    .route("/signup/verify", post(signup_verification))
    .route("/signin", post(signin))
    .route("/signin/verify", post(signin_varification))
}

pub fn create_router() -> Router {
    let v1_routes = Router::new()
        .merge(auth_router())
        .route("/ping", get(healthcheck));

    return Router::new().nest("/api/v1", v1_routes);
}