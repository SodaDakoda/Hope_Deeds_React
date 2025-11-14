// server.js
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Serve React Build ---
const buildPath = path.join(__dirname, "dist");

app.use(express.static(buildPath));

// Example API route (replace later)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running ✔" });
});

// Handle all other routes (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
