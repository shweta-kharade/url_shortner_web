# shortn/ — URL Shortener with Analytics

Live demo: [your-vercel-url]

A scalable URL shortener built to explore system design concepts:
caching, rate limiting, atomic operations, and non-blocking analytics.

## Features
- Custom aliases, expiring links, QR codes
- Click analytics (time series, referrers) via MongoDB aggregation
- Redis caching (hot URL lookups) + sliding-window rate limiting
- JWT auth, per-user link management

## Stack
Node.js/Express · MongoDB · Redis · React · Tailwind CSS

## Architecture & scale decisions
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## Running locally
\`\`\`bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
\`\`\`