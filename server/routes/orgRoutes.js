// server/routes/orgRoutes.js
import express from "express";
import {
  registerOrg,
  loginOrg,
  getOrgProfile,
} from "../controllers/orgController.js";

const router = express.Router();

router.post("/register", registerOrg);
router.post("/login", loginOrg);
router.get("/profile", getOrgProfile);

export default router;
