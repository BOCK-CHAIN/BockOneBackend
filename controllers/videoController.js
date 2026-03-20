import pool from "../config/db.js";
import fs from "fs";
import path from "path";
export const uploadVideo = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, description, categories, owner_hex_id } = req.body;

    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!videoFile) {
      return res.status(400).json({ message: "Video file is required" });
    }

    // Persist relative media paths so clients can resolve host per platform.
    const videoUrl = `/uploads/videos/${videoFile.filename}`;
    const thumbnailUrl = thumbnailFile
      ? `/uploads/thumbnails/${thumbnailFile.filename}`
      : null;

    const result = await pool.query(
      `INSERT INTO videos
       (title, description, categories, video_url, thumbnail_url, owner_hex_id)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        title || "",
        description || "",
        categories ? categories.split(",") : [],
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
    res.status(500).json({ message: error.message });
  }
};


export const getVideos = async (req, res) => {
  try {
    const { hexId } = req.query; // viewer's ID (optional)

    const videos = await pool.query("SELECT * FROM videos ORDER BY created_at DESC");
    console.log("VIDEOS ROWS:", videos.rows.length);

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

// 🧑‍🎨 Get videos uploaded by a specific user (Creator Studio)
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


// 👍 Like Video (toggle system)
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
        // ✅ Unlike (remove like)
        await pool.query("DELETE FROM video_likes WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET likes = GREATEST(likes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Like removed", liked: false });
      } else {
        // ✅ Switch from dislike → like
        await pool.query("UPDATE video_likes SET status = 'like' WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET likes = likes + 1, dislikes = GREATEST(dislikes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Changed to like", liked: true });
      }
    } else {
      // ✅ New like
      await pool.query("INSERT INTO video_likes (user_hex_id, video_id, status) VALUES ($1, $2, 'like')", [hexId, videoId]);
      await pool.query("UPDATE videos SET likes = likes + 1 WHERE id = $1", [videoId]);
      res.json({ message: "Video liked", liked: true });
    }
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Error liking video" });
  }
};

// 👎 Dislike Video (toggle system)
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
        // ✅ Remove dislike
        await pool.query("DELETE FROM video_likes WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET dislikes = GREATEST(dislikes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Dislike removed", disliked: false });
      } else {
        // ✅ Switch from like → dislike
        await pool.query("UPDATE video_likes SET status = 'dislike' WHERE video_id = $1 AND user_hex_id = $2", [videoId, hexId]);
        await pool.query("UPDATE videos SET dislikes = dislikes + 1, likes = GREATEST(likes - 1, 0) WHERE id = $1", [videoId]);
        return res.json({ message: "Changed to dislike", disliked: true });
      }
    } else {
      // ✅ New dislike
      await pool.query("INSERT INTO video_likes (user_hex_id, video_id, status) VALUES ($1, $2, 'dislike')", [hexId, videoId]);
      await pool.query("UPDATE videos SET dislikes = dislikes + 1 WHERE id = $1", [videoId]);
      res.json({ message: "Video disliked", disliked: true });
    }
  } catch (error) {
    console.error("Dislike error:", error);
    res.status(500).json({ message: "Error disliking video" });
  }
};

// 🧾 Get User Like/Dislike Status
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

// 💬 Add Comment
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

// 🧾 Get Comments for a Video
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

// 🗑️ Delete Video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const result = await pool.query("SELECT * FROM videos WHERE id = $1", [videoId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    const video = result.rows[0];

    const toLocalPath = (maybeUrl) => {
      if (!maybeUrl) return null;
      try {
        const u = new URL(maybeUrl);
        return u.pathname; // e.g. /uploads/videos/xxx.mp4
      } catch {
        return maybeUrl; // already a path
      }
    };

    const deleteIfExists = (publicPath) => {
      const normalized = toLocalPath(publicPath);
      if (!normalized) return;

      const clean = normalized.replace(/^\/+/, "");
      const filePath = path.join(process.cwd(), clean);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    deleteIfExists(video.video_url);
    deleteIfExists(video.thumbnail_url);

    await pool.query("DELETE FROM videos WHERE id = $1", [videoId]);

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ message: "Error deleting video" });
  }
};



// ✏️ Update Video (Title + Description)
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


