// const express = require("express");
import express from "express"; // cai babel moi dung import duoc
// const cors = require("cors");
import cors from "cors";
require("dotenv").config();
// import INIT Routes
// const initRoutes = require("./src/routes");
import initRoutes from "./src/routes";

// import connect_database
require("./connect_database");

const app = express();
// Cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// CURD
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT || 8888;

const listener = app.listen(PORT, () => {
  console.log("Server is running on the port " + listener.address().port);
});
