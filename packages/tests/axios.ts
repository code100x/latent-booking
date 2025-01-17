import axios2 from "axios"

const client = axios2.create();

client.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export const axios = client;