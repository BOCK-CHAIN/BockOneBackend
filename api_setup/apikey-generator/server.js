import express from "express";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to Redis. In Kubernetes this should point at a Redis service or ElastiCache endpoint.
const redis = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
redis.on("error", (err) => console.error("Redis error:", err));
await redis.connect();

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Generate API key
app.post("/api/generate-key", async (req, res) => {
  try {
    const { userId } = req.body;          // optional: to link with user
    const apiKey = uuidv4().replace(/-/g, "");   // clean 32-char key

    
    // store a JSON string with status and userId
    const value = JSON.stringify({ userId: userId || "anonymous", status: "active" });

    await redis.set(`api_key:${apiKey}`, value, { EX: 60 * 60 * 24 * 30 }); // 30 days TTL

    res.json({ apiKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate API key" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
