// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 8080;

// -----------------------------
//  DATABASE CONNECTION (NEON)
// -----------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

// Test DB connection on startup
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("🟢 Connected to PostgreSQL:", result.rows[0].now);
  }
});

// -----------------------------
//  MIDDLEWARE
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
//  API ROUTES
// -----------------------------

// Test backend + db
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Example placeholder route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend running ✔ and DB connected ✔" });
});

// ----------------------------------
//  SERVE REACT FRONTEND
// ----------------------------------
const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// -----------------------------
//  START SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { pool };
