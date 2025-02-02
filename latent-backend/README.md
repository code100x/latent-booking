## Setup procedure
 - Clone the repo
 - Copy .env.example to .env
 - Start postgres locally

 ```
docker run -d \
  --name postgres-container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=latent \
  -p 5432:5432 \
  postgres:latest

 ```
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