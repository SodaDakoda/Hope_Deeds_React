// server/routes/orgRoutes.js
const express = require("express");
const router = express.Router();
const orgController = require("../controllers/orgController");

// Register
router.post("/register", orgController.register);

// Login
router.post("/login", orgController.login);

// Get logged-in org info
router.get("/me", orgController.getProfile);

module.exports = router;
