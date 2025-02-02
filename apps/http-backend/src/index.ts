require("dotenv").config();

import express from "express";
import cookieParser from "cookie-parser";
import v1Router from "./routes/v1";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use("/api/v1", v1Router);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Running on port ${process.env.PORT || 8080}`)
});
