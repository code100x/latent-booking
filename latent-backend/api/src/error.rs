use db::DBError;
use poem_openapi::{payload::Json, ApiResponse, Object};
use poem::error::Error as PoemError;
use jsonwebtoken::errors::Error as JwtError;

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

    /// Admin Not Found (411)
    #[oai(status = 411)]
    AdminNotFound(Json<ErrorBody>),
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => AppError::NotFound(Json(ErrorBody {
                message: "Resource not found".to_string(),
            })),
            _ => AppError::Database(Json(ErrorBody {
                message: "Database error occurred".to_string(),
            })),
        }
    }
}

impl From<PoemError> for AppError {
    fn from(err: PoemError) -> Self {
        AppError::InternalServerError(Json(ErrorBody {
            message: err.to_string(),
        }))
    }
}

impl From<JwtError> for AppError {
    fn from(err: JwtError) -> Self {
        AppError::InternalServerError(Json(ErrorBody {
            message: format!("JWT error: {}", err),
        }))
    }
}

impl From<DBError> for AppError {
    fn from(err: DBError) -> Self {
        match err {
            DBError::NotFound(msg) => AppError::NotFound(Json(ErrorBody {
                message: msg,
            })),
            DBError::InvalidInput(msg) => AppError::BadRequest(Json(ErrorBody {
                message: msg,
            })),
            DBError::DatabaseError(sqlx_err) => sqlx_err.into(), // Convert sqlx::Error to AppError
        }
    }
}
