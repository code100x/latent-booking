# Axum Backend with Prisma Integration

This project integrates Axum with Prisma for database handling.

## Getting Started

Follow the steps below to set up the project:

### 1. Clone the Repository

```bash
git clone <repo-url>
cd axum-backend
```

### 2. Generate the Prisma Client

Run the following command to generate the Prisma client:

```bash
cargo prisma generate
```

### 3. Querying the Database in Axum Handlers

You can extract the database state in an Axum handler as the first parameter and use it to query the database. For example:

```rust
let _db = db
    .user()
    .upsert(
        user::number::equals(payload.number.to_string()),
        user::create(payload.number.clone().to_string(), "".to_string(), vec![]),
        vec![],
    )
    .exec()
    .await;
```

## Notes

- Link for prisma client: https://prisma.brendonovich.dev/