const express = require("express");
const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {});

app.get("/profile", (req, res) => {});

app.get("/events", (req, res) => {});
