use serde::{Deserialize, Serialize};
use poem::web::{Data, Json};
use poem_openapi::{OpenApi, Object, payload};
use uuid::Uuid;
use crate::{error::AppError, Api, AppState, auth::UserAuth};

#[derive(Debug, Serialize, Deserialize, Object)]
struct TransactionsResponse {
    transactions: Vec<Payment>,
}

#[OpenApi]
impl Api {
    /// Get user transactions
    #[oai(path = "/user/transaction", method = "get")]
    async fn get_transactions(
        &self,
        auth: UserAuth,
        state: Data<&AppState>,
    ) -> poem::Result<payload::Json<TransactionsResponse>, AppError> {
        let user_id = Uuid::parse_str(&auth.user_id).map_err(|_| AppError::InvalidData)?;
        let transactions = state.db.get_user_payments(user_id).await?;
        Ok(payload::Json(TransactionsResponse { transactions }))
    }
}
