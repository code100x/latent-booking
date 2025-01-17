require("dotenv").config();

import express from "express";
import v1Router from "./routes/v1";
import {Request, Response , NextFunction } from "express";
const app = express();
app.use(express.json());

app.use("/api/v1", v1Router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message); 
    res.status(500).json({ message: "internal server error." }); 
  });

app.listen(process.env.PORT || 8080);
