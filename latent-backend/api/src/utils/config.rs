use std::env;

pub fn jwt_password() -> String {
    env::var("JWT_PASSWORD").unwrap_or_else(|_| "123random".to_string())
}

pub fn admin_jwt_password() -> String {
    env::var("ADMIN_JWT_PASSWORD").unwrap_or_else(|_| "123random".to_string())
}

pub fn superadmin_jwt_password() -> String {
    env::var("SUPERADMIN_JWT_PASSWORD").unwrap_or_else(|_| "123random".to_string())
}
