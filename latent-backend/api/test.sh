#!/bin/bash

PORT=${PORT:-8080}
BASE_URL="http://localhost:${PORT}"

echo "1. Creating new user..."
curl -X POST "$BASE_URL/api/v1/signup" \
  -H "Content-Type: application/json" \
  -d '{"number": "9729302411"}' | jq

echo -e "\nPress Enter to continue with signup verification..."
read

echo "2. Verifying signup..."
curl -X POST "$BASE_URL/api/v1/signup/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "9729302411",
    "totp": "123456",
    "name": "John Doe"
  }' | jq

echo -e "\nPress Enter to continue with signin..."
read

echo "3. Signing in..."
curl -X POST "$BASE_URL/api/v1/signin" \
  -H "Content-Type: application/json" \
  -d '{"number": "9729302411"}' | jq

echo -e "\nPress Enter to continue with signin verification..."
read

echo "4. Verifying signin..."
curl -X POST "$BASE_URL/api/v1/signin/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "9729302411",
    "totp": "123456"
  }' | jq 
