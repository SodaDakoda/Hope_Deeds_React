// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./server/db/db.js";
import orgRoutes from "./server/routes/orgRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Resolve dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
//  TEST DB CONNECTION
// -----------------------------
pool
  .query("SELECT NOW()")
  .then((res) => console.log("🟢 Connected to PostgreSQL:", res.rows[0].now))
  .catch((err) => console.error("❌ Database connection failed:", err));

// -----------------------------
//  MIDDLEWARE
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
//  ROUTES
// -----------------------------
app.use("/api/org", orgRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend running ✔" });
});

// -----------------------------
//  SERVE FRONTEND (React Build)
// -----------------------------
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
