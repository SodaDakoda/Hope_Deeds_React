const express = require("express");
const router = express.Router();
const { loginOrg } = require("../controllers/orgController");

// LOGIN
router.post("/login", loginOrg);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getOrgProfile } = require("../controllers/orgController");

router.get("/profile", getOrgProfile);

module.exports = router;
