import express from "express";
import dotenv from "dotenv";
import colors from "colors/safe.js";

import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5005;

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.listen(
  PORT,
  console.log(colors.yellow.bold(`Server running on ${process.env.NODE_ENV} env on port ${PORT}`))
);
