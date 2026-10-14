require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require('./routes/url.routes');
const cors = require("cors");
// const dns = require("dns");

const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));