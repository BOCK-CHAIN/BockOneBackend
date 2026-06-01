import pool from "../config/db.js";
import crypto from "crypto";

const generateHexId = () => crypto.randomBytes(16).toString("hex");

const DUMMY_USERNAME = process.env.DUMMY_USERNAME ?? "demo";
const DUMMY_PASSWORD = process.env.DUMMY_PASSWORD ?? "demo";

export const signup = async (req, res) => {
  try {
    const { username, email } = req.body ?? {};

    if (!username && !email) {
      return res.status(400).json({ message: "username or email is required" });
    }

    if (email) {
      const existing = await pool.query(
        "SELECT hex_id, username, email FROM users WHERE email = $1",
        [email]
      );
      if (existing.rows.length > 0) {
        return res.json({ message: "User already exists", user: existing.rows[0] });
      }
    }

    const hexId = generateHexId();

    const result = await pool.query(
      "INSERT INTO users (hex_id, username, email) VALUES ($1, $2, $3) RETURNING hex_id, username, email, created_at",
      [hexId, username ?? null, email ?? null]
    );

    return res.status(201).json({ message: "Signup successful", user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const syncUser = async (req, res) => {
  try {
    const { hexId, username, email } = req.body ?? {};

    if (!hexId) {
      return res.status(400).json({ message: "hexId is required" });
    }

    const existing = await pool.query(
      "SELECT hex_id, username, email, created_at FROM users WHERE hex_id = $1",
      [hexId]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "User synced", user: existing.rows[0] });
    }

    const created = await pool.query(
      "INSERT INTO users (hex_id, username, email) VALUES ($1, $2, $3) RETURNING hex_id, username, email, created_at",
      [hexId, username ?? null, email ?? null]
    );

    return res.status(201).json({ message: "User synced", user: created.rows[0] });
  } catch (error) {
    console.error("Sync user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginWithHexId = async (req, res) => {
  try {
    const { hexId } = req.body ?? {};

    if (!hexId) {
      return res.status(400).json({ message: "hexId is required" });
    }

    const result = await pool.query(
      "SELECT hex_id, username, email, created_at FROM users WHERE hex_id = $1",
      [hexId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Login successful", user: result.rows[0] });
  } catch (error) {
    console.error("Login with hexId error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { hexId } = req.params;
    const result = await pool.query(
      "SELECT hex_id, username, email, created_at FROM users WHERE hex_id = $1",
      [hexId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    if (username !== DUMMY_USERNAME || password !== DUMMY_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const existing = await pool.query(
      "SELECT hex_id, username, email, created_at FROM users WHERE username = $1",
      [DUMMY_USERNAME]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "Login successful", user: existing.rows[0] });
    }

    const hexId = generateHexId();
    const created = await pool.query(
      "INSERT INTO users (hex_id, username, email) VALUES ($1, $2, $3) RETURNING hex_id, username, email, created_at",
      [hexId, DUMMY_USERNAME, null]
    );

    return res.status(201).json({ message: "Login successful", user: created.rows[0] });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
