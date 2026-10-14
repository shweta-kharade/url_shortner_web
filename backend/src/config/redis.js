// const {createClient} = require("redis");

// const redisClient = createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
// })

// redisClient.on('error', (err) => console.error('Redis error:', err));

// (async () => {
//   await redisClient.connect();
//   console.log('Redis connected');
// })();

// module.exports = redisClient;


const { createClient } = require("redis");

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is missing from environment variables");
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        return new Error("Redis reconnection limit reached");
      }
      return Math.min(retries * 500, 5000);
    },
  },
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

module.exports = redisClient;