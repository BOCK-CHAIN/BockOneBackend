import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
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

dotenv.config();

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET;

const storage = multerS3({
  s3: s3Client,
  bucket: BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    const prefix = file.fieldname === "video" ? "videos" : "thumbnails";
    cb(null, `krysonix/${prefix}/${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error("Multer/S3 upload error:", err);
    return res.status(500).json({ message: "Failed to upload file to storage", error: err.message });
  }
  next();
};

router.post(
  "/upload",
  (req, res, next) => {
    upload.fields([
      { name: "video", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) return handleMulterError(err, req, res, next);
      next();
    });
  },
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
