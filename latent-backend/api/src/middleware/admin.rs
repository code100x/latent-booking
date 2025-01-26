use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use poem::{Endpoint, EndpointExt, Middleware, Request, Result};
use poem_openapi::payload;
use serde::{Deserialize, Serialize};

use crate::{
    error::AppError,
    utils::config::{admin_jwt_password, superadmin_jwt_password},
};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String, // Subject (e.g., user ID)
    exp: usize,  // Expiration time
}

#[derive(Debug, Clone)]
pub struct TokenData {
    pub id: String,
}

pub struct JwtMiddleware {
    secret: String, // Secret key for JWT verification
}

impl JwtMiddleware {
    /// Create a new instance of `JwtMiddleware` with the given secret key
    pub fn new(secret: String) -> Self {
        Self { secret }
    }
}
impl<E: Endpoint> Middleware<E> for JwtMiddleware {
    type Output = JwtMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        JwtMiddlewareImpl {
            ep,
            secret: self.secret.clone(),
        }
    }
}

pub struct JwtMiddlewareImpl<E> {
    ep: E,
    secret: String,
}

impl<E: poem::Endpoint> poem::Endpoint for JwtMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, mut req: Request) -> Result<Self::Output, poem::Error> {
        let token = req
            .headers()
            .get("Authorization")
            .and_then(|value| value.to_str().ok());

        if let Some(token) = token {
            let decoding_key = DecodingKey::from_secret(self.secret.as_bytes());
            let validation = Validation::new(Algorithm::HS256);

            match decode::<Claims>(token, &decoding_key, &validation) {
                Ok(token_data) => {
                    req.extensions_mut().insert(TokenData {
                        id: token_data.claims.sub,
                    });
                    self.ep.call(req).await
                }
                Err(_) => Err(
                    AppError::Unauthorized(payload::Json(crate::error::ErrorBody {
                        message: "Unauthorized".to_string(),
                    }))
                    .into(),
                ),
            }
        } else {
            Err(
                AppError::Unauthorized(payload::Json(crate::error::ErrorBody {
                    message: "Unauthorized".to_string(),
                }))
                .into(),
            )
        }
    }
}

pub fn admin_middleware(ep: impl Endpoint) -> impl Endpoint {
    ep.with(JwtMiddleware::new(admin_jwt_password()))
}

pub fn superadmin_middleware(ep: impl Endpoint) -> impl Endpoint {
    ep.with(JwtMiddleware::new(superadmin_jwt_password()))
}
