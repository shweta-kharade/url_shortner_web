const redisClient = require("../config/redis");

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 10;  // 10 requests per minute per IP

async function rateLimiter(req, res, next){
    const key = `ratelimit:${req.ip}`;
    const now = Date.now();
    const windowStart = now - WINDOW_SECONDS * 1000;

    try {
        //remove timestamps outside the current window
        await redisClient.zRemRangeByScore(key, 0 , windowStart);

        //count how many requests remain in the window
        const requestCount = await redisClient.zCard(key);

        if(requestCount >= MAX_REQUESTS) {
            return res.status(429).json({ error: 'Too many requests, slow down' });
        };

        // Record this request
        await redisClient.zAdd(key, { score: now, value: `${now}` });
        await redisClient.expire(key, WINDOW_SECONDS); // auto-cleanup if IP goes idle

        next();

    } catch (error) {
        console.error('Rate limiter error:', err);
        next(); // fail open — don't block legit traffic if Redis has an issue
    }
}

module.exports = rateLimiter;