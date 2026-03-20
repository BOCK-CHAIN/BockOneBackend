import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
