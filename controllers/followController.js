import pool from "../config/db.js";

// ➕ Follow a channel
export const followChannel = async (req, res) => {
  try {
    const { followerHexId, followingHexId } = req.body;

    if (!followerHexId || !followingHexId)
      return res.status(400).json({ message: "Follower and Following IDs required" });

    if (followerHexId === followingHexId)
      return res.status(400).json({ message: "You cannot follow yourself" });

    await pool.query(
      `INSERT INTO follows (follower_hex_id, following_hex_id)
       VALUES ($1, $2)
       ON CONFLICT (follower_hex_id, following_hex_id) DO NOTHING`,
      [followerHexId, followingHexId]
    );

    res.json({ message: "Now following", following: true });
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({ message: "Error following channel" });
  }
};

// ➖ Unfollow a channel
export const unfollowChannel = async (req, res) => {
  try {
    const { followerHexId, followingHexId } = req.body;

    await pool.query(
      `DELETE FROM follows WHERE follower_hex_id = $1 AND following_hex_id = $2`,
      [followerHexId, followingHexId]
    );

    res.json({ message: "Unfollowed successfully", following: false });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({ message: "Error unfollowing channel" });
  }
};

// 🔍 Check if user follows a channel
export const checkFollowingStatus = async (req, res) => {
  try {
    const { followerHexId, followingHexId } = req.params;
    const result = await pool.query(
      `SELECT 1 FROM follows WHERE follower_hex_id = $1 AND following_hex_id = $2`,
      [followerHexId, followingHexId]
    );

    res.json({ is_following: result.rows.length > 0 });
  } catch (error) {
    console.error("Follow check error:", error);
    res.status(500).json({ message: "Error checking following status" });
  }
};
