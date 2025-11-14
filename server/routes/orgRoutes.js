const express = require("express");
const router = express.Router();
const { registerOrg, loginOrg } = require("../controllers/orgController");

// Register
router.post("/register", registerOrg);

// Login
router.post("/login", loginOrg);

module.exports = router;
