import pool from "../config/db.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET;

const getS3KeyFromUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, categories, owner_hex_id } = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile) {
      return res.status(400).json({ message: "Video file is required" });
    }

    if (!videoFile.location) {
      return res.status(500).json({ message: "Failed to upload video to storage" });
    }

    if (!owner_hex_id) {
      return res.status(400).json({ message: "owner_hex_id is required" });
    }

    // Auto-sync user if they don't exist in the krysonix users table
    const userCheck = await pool.query(
      "SELECT hex_id FROM users WHERE hex_id = $1",
      [owner_hex_id]
    );
    if (userCheck.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (hex_id) VALUES ($1) ON CONFLICT (hex_id) DO NOTHING",
        [owner_hex_id]
      );
    }

    const videoUrl = videoFile.location;
    const thumbnailUrl = thumbnailFile ? thumbnailFile.location : null;

    const categoriesArray = categories
      ? categories.split(",").filter(Boolean)
      : [];

    const result = await pool.query(
      `INSERT INTO videos
       (title, description, categories, video_url, thumbnail_url, owner_hex_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        title || "",
        description || "",
        categoriesArray,
        videoUrl,
        thumbnailUrl,
        owner_hex_id,
      ]
    );

    res.status(201).json({
      message: "Video uploaded successfully",
      video: result.rows[0],
    });
  } catch (error) {
    console.error("Upload error:", error);
    if (error.code === "23503") {
      return res.status(400).json({ message: "User not found. Please sign up or sync your account first." });
    }
    if (error.code === "23502") {
      return res.status(400).json({ message: `Missing required field: ${error.column}` });
    }
    res.status(500).json({ message: "Failed to upload video" });
  }
};

export const getVideos = async (req, res) => {
  try {
    const { hexId } = req.query;

    const videos = await pool.query("SELECT * FROM videos ORDER BY created_at DESC");

    if (!hexId) return res.json(videos.rows);

    const videosWithFollowStatus = await Promise.all(
      videos.rows.map(async (video) => {
        const followCheck = await pool.query(
          `SELECT 1 FROM follows WHERE follower_hex_id = $1 AND following_hex_id = $2`,
          [hexId, video.owner_hex_id]
        );

        return {
          ...video,
          is_following: followCheck.rows.length > 0,
        };
      })
    );

    res.json(videosWithFollowStatus);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching videos" });
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const { hexId } = req.params;

    const result = await pool.query(
      `SELECT * FROM videos WHERE owner_hex_id = $1 ORDER BY created_at DESC`,
      [hexId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Error fetching user videos" });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { hexId } = req.body;

    if (!hexId) return res.status(400).json({ message: "User ID required" });

    const existing = await pool.query(
      "SELECT status FROM video_likes WHERE video_id = $1 AND user_hex_id = $2",
      [videoId, hexId]
    );

    if (existing.rows.length > 0) {
      const status = existing.rows[0].status;

      if (status === "like") {
        await pool.query("DELETE FROM video_likes WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET likes = GREATEST(likes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Like removed", liked: false });
      } else {
        await pool.query("UPDATE video_likes SET status = 'like' WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET likes = likes + 1, dislikes = GREATEST(dislikes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Changed to like", liked: true });
      }
    } else {
      await pool.query("INSERT INTO video_likes (user_hex_id, video_id, status) VALUES ($1, $2, 'like')", [hexId, videoId]);
      await pool.query("UPDATE videos SET likes = likes + 1 WHERE id = $1", [videoId]);
      res.json({ message: "Video liked", liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Error liking video" });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { hexId } = req.body;

    if (!hexId) return res.status(400).json({ message: "User ID required" });

    const existing = await pool.query(
      "SELECT status FROM video_likes WHERE video_id = $1 AND user_hex_id = $2",
      [videoId, hexId]
    );

    if (existing.rows.length > 0) {
      const status = existing.rows[0].status;

      if (status === "dislike") {
        await pool.query("DELETE FROM video_likes WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET dislikes = GREATEST(dislikes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Dislike removed", disliked: false });
      } else {
        await pool.query("UPDATE video_likes SET status = 'dislike' WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET dislikes = dislikes + 1, likes = GREATEST(likes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Changed to dislike", disliked: true });
      }
    } else {
      await pool.query("INSERT INTO video_likes (user_hex_id, video_id, status) VALUES ($1, $2, 'dislike')", [hexId, videoId]);
      await pool.query("UPDATE videos SET dislikes = dislikes + 1 WHERE id = $1", [videoId]);
      res.json({ message: "Video disliked", disliked: true });
    }
  } catch (error) {
    console.error("Dislike error:", error);
    res.status(500).json({ message: "Error disliking video" });
  }
};

export const getUserVideoStatus = async (req, res) => {
  try {
    const { videoId, hexId } = req.params;
    const result = await pool.query(
      "SELECT status FROM video_likes WHERE video_id = $1 AND user_hex_id = $2",
      [videoId, hexId]
    );
    res.json(result.rows[0] || { status: null });
  } catch (error) {
    console.error("Status fetch error:", error);
    res.status(500).json({ message: "Error fetching user status" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { username, text } = req.body;

    if (!text || !username) {
      return res.status(400).json({ message: "Username and comment text are required" });
    }

    const result = await pool.query(
      `INSERT INTO comments (video_id, username, text)
       VALUES ($1, $2, $3) RETURNING *`,
      [videoId, username, text]
    );

    res.status(201).json({ message: "Comment added", comment: result.rows[0] });
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const result = await pool.query(
      "SELECT * FROM comments WHERE video_id = $1 ORDER BY created_at DESC",
      [videoId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [videoId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    const video = result.rows[0];

    const deleteFromS3 = async (url) => {
      const key = getS3KeyFromUrl(url);
      if (!key) return;
      try {
        await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
      } catch (err) {
        console.error("S3 delete error:", err);
      }
    };

    await deleteFromS3(video.video_url);
    await deleteFromS3(video.thumbnail_url);

    await pool.query("DELETE FROM videos WHERE id = $1", [videoId]);

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ message: "Error deleting video" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const result = await pool.query(
      `UPDATE videos
       SET title = $1, description = $2
       WHERE id = $3 RETURNING *`,
      [title, description, videoId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({ message: "Video updated successfully", video: result.rows[0] });
  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({ message: "Error updating video" });
  }
};
