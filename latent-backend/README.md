## Setup procedure
 - Clone the repo
 - Copy .env.example to .env
 - Start postgres locally
 - Migrate Postgres
 ```
    psql "postgres://postgres:mysecretpassword@localhost:5432/"
    CREATE database latent;
    exit

    cd db
    sqlx migrate run  --database-url postgres://postgres:mysecretpassword@localhost:5432/latent
 ```

  - Run the API
  ```
    cd api
    cargo run
  ```