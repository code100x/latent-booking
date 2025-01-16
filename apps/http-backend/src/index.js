const express = require("express");
const app = express();

app.use(express.json());

app.post("/signin", (req, res) => {});

app.post("/event", (req, res) => {});

app.put("/event", (req, res) => {});

app.delete("/event", (req, res) => {});

app.get("/event", (req, res) => {});
