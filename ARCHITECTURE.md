# Architecture & Scale Decisions

## System overview
[Diagram: Client → Express API → MongoDB / Redis]

## Key design decisions

### 1. Short code generation
Using nanoid(7) with a collision-check-and-retry loop rather than a
sequential counter. At ~3.5 trillion possible codes, collisions are
rare, but correctness can't depend on "rare." At extreme write
volume (>10k links/sec), I'd move to a pre-generated code pool or a
Snowflake-style distributed ID generator to remove the DB round-trip
before insert.

### 2. Caching strategy
Redis caches URL lookups with a 1-hour TTL. Trade-off: bounded
staleness (an edited/deleted link can serve stale data for up to an
hour) in exchange for not needing active invalidation plumbing.
Given this app has no edit feature yet, TTL alone is sufficient;
I'd add explicit `DEL` calls on any future update/delete endpoint.

### 3. Click tracking under concurrency
Initially used `clicks += 1; save()` — a read-modify-write that
loses increments under concurrent access. Fixed with MongoDB's
atomic `$inc`, which is safe under concurrent writes without
application-level locking.

### 4. Analytics writes are non-blocking
Click events log *after* the redirect response is sent, not before.
At larger scale, this write would go through a message queue
(Kafka/RabbitMQ) instead of a direct DB write, so a slow analytics
write never risks the redirect path. The current design already
follows that separation in principle, just without the queue.

### 5. Data modeling: separate Click collection
Click events are a separate collection referencing urlId, not an
embedded array on the URL document — avoids unbounded document
growth and keeps redirect reads fast regardless of a link's total
click history size.

## What would change at 10x / 100x scale
- Shard MongoDB by shortCode hash once a single replica set can't
  hold write throughput
- Move analytics ingestion to a queue + batch writer
- Add a CDN/edge layer for redirects (Cloudflare Workers) to avoid
  round-tripping to origin for hot links entirely
- Read replicas for analytics queries, separate from the write path