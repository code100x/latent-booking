use log::info;
use poem::{
    http::StatusCode, middleware::Middleware, Endpoint
};
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
struct Claims {
    sub: String,
    exp: usize,
    admin_type: String,
}

pub struct AuthMiddleware {
    jwt_secret: String,
}

impl AuthMiddleware {
    pub fn new(jwt_secret: String) -> Self {
        Self { jwt_secret }
    }
}

impl<E: Endpoint> Middleware<E> for AuthMiddleware {
    type Output = AuthMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        AuthMiddlewareImpl { 
            ep,
            jwt_secret: self.jwt_secret.clone(),
        }
    }
}

pub struct AuthMiddlewareImpl<E> {
    ep: E,
    jwt_secret: String,
}

impl<E: Endpoint> Endpoint for AuthMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, mut req: poem::Request) -> Result<Self::Output, poem::Error> {
        // Extract the authorization header
        let auth_header = req
            .headers()
            .get("Authorization")
            .ok_or_else(|| poem::Error::from_status(StatusCode::UNAUTHORIZED))?;

        let token_str = auth_header
            .to_str()
            .map_err(|_| poem::Error::from_status(StatusCode::UNAUTHORIZED))?;

        let token = token_str.trim_start_matches("Bearer ").trim();

        info!("Processing token: {}", token);

        let validation = Validation::new(Algorithm::HS256); 
        let decoding_key = DecodingKey::from_secret(self.jwt_secret.as_bytes());

        let decoded = decode::<Claims>(token, &decoding_key, &validation)
            .map_err(|e| {
                info!("Token decode error: {:?}", e);
                poem::Error::from_string("Invalid token", StatusCode::UNAUTHORIZED)
            })?;

        info!("Decoded token: {:?}", decoded);

        // Check the admin type
        match decoded.claims.admin_type.as_str() {
            "admin" => {
                info!("Admin access granted");
                req.extensions_mut().insert(decoded.claims);
            },
            _ => {
                return Err(poem::Error::from_string(
                    "Unauthorized access", 
                    StatusCode::UNAUTHORIZED
                ));
            }
        }

        self.ep.call(req).await
    }
}