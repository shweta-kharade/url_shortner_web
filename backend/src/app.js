// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./config/db");
// const urlRoutes = require('./routes/url.routes');
// const cors = require("cors");
// // const dns = require("dns");

// const app = express();

// connectDB();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173'
// }));

// app.use(express.json());

// app.use("/", urlRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT , () => console.log(`Server running on port ${PORT}`));


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const urlRoutes = require("./routes/url.routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log("Redis connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error.message);
    process.exit(1);
  }
}

startServer();