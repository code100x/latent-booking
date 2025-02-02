use poem_openapi::{
    payload::{self, Json},
    ApiResponse, Object,
};

#[derive(Debug, Object)]
pub struct ErrorBody {
    pub message: String,
}

#[derive(ApiResponse, Debug)]
pub enum AppError {
    /// Database error (500)
    #[oai(status = 500)]
    Database(Json<ErrorBody>),

    /// Not found (404)
    #[oai(status = 404)]
    NotFound(Json<ErrorBody>),

    /// Invalid credentials (401)
    #[oai(status = 401)]
    InvalidCredentials(Json<ErrorBody>),

    /// Unauthorized (401)
    #[oai(status = 401)]
    Unauthorized(Json<ErrorBody>),

    /// Internal server error (500)
    #[oai(status = 500)]
    InternalServerError(Json<ErrorBody>),

    /// Bad request (400)
    #[oai(status = 400)]
    BadRequest(Json<ErrorBody>),

    // Too Many Requests
    #[oai(status = 429)]
    RateLimitted(Json<ErrorBody>),

    // Any 3rd Party API Call Error
    #[oai(status = 500)]
    NetworkError(Json<ErrorBody>),
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => AppError::NotFound(Json(ErrorBody {
                message: "Resource not found".to_string(),
            })),

            e => AppError::Database(Json(ErrorBody {
                // message: "Database error occurred".to_string(),
                message: format!("{:?}", e.to_string()),
            })),
        }
    }
}

impl From<reqwest::Error> for AppError {
    fn from(err: reqwest::Error) -> Self {
        if let Some(status) = err.status() {
            if status != reqwest::StatusCode::OK {
                return AppError::NetworkError(payload::Json(ErrorBody {
                    message: "Cannot send OTP now. Please try again later.".to_string(),
                }));
            }
        }
        AppError::InternalServerError(payload::Json(ErrorBody {
            message: "Somthing went wrong".to_string(),
        }))
    }
}
