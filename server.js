import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/api/krysonics/health", (req, res) => {
  res.json({ status: 'ok', service: 'krysonix-backend', timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/krysonics/api/videos", videoRoutes);
app.use("/api/krysonics/api/follow", followRoutes);
app.use("/api/krysonics/api/users", usersRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
