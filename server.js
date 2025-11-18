// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import orgRoutes from "./server/routes/orgRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
//  DATABASE CONNECTION (NEON)
// -----------------------------
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Test connection
pool
  .query("SELECT NOW()")
  .then((res) => console.log("🟢 PostgreSQL Connected:", res.rows[0].now))
  .catch((err) => console.error("❌ Database Connection Error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/org", orgRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend OK + Database OK" });
});

const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
