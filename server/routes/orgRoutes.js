const express = require("express");
const router = express.Router();
const orgController = require("../controllers/orgController");

// Register
router.post("/register", orgController.registerOrg);

// Login
router.post("/login", orgController.loginOrg);

// Get logged-in org
router.get("/me", orgController.getOrgProfile);

module.exports = router;
