import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  uploadVideo,
  getVideos,
  getUserVideos,
  likeVideo,
  dislikeVideo,
  addComment,
  getComments,
  getUserVideoStatus,
  deleteVideo,
  updateVideo,
} from "../controllers/videoController.js";

const router = express.Router();

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const uploadsRoot = path.join(process.cwd(), "uploads");
const videosDir = path.join(uploadsRoot, "videos");
const thumbnailsDir = path.join(uploadsRoot, "thumbnails");
ensureDir(videosDir);
ensureDir(thumbnailsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = file.fieldname === "video" ? videosDir : thumbnailsDir;
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeOriginal}`);
  },
});

const upload = multer({ storage });

// ---------- ROUTES ----------
router.post(
  "/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

router.get("/user/:hexId", getUserVideos);
router.get("/", getVideos);

router.post("/:videoId/like", likeVideo);
router.post("/:videoId/dislike", dislikeVideo);
router.get("/:videoId/status/:hexId", getUserVideoStatus);

router.post("/:videoId/comments", addComment);
router.get("/:videoId/comments", getComments);

router.put("/:videoId", updateVideo);
router.delete("/:videoId", deleteVideo);

export default router;
