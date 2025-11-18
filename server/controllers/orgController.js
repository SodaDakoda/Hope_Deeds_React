// server/controllers/orgController.js
import bcrypt from "bcryptjs";
import { pool } from "../db/db.js";

export const registerOrg = async (req, res) => {
  try {
    const { org_name, email, password } = req.body;

    if (!org_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check duplicate
    const existing = await pool.query(
      "SELECT id FROM organizations WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO organizations (org_name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, org_name, email`,
      [org_name, email, hashed]
    );

    return res.json({ success: true, org: result.rows[0] });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({ error: "Server error during registration." });
  }
};

// -----------------------------
// LOGIN ORGANIZATION
// -----------------------------
export const loginOrg = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  try {
    const result = await pool.query(
      "SELECT id, org_name, email, password FROM organizations WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials." });

    const org = result.rows[0];
    const match = await bcrypt.compare(password, org.password);

    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    res.json({
      success: true,
      org: {
        id: org.id,
        org_name: org.org_name,
        email: org.email,
      },
    });
  } catch (err) {
    console.error("ORG LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};

// -----------------------------
// GET PROFILE
// -----------------------------
export const getOrgProfile = async (req, res) => {
  try {
    const orgId = req.query.id;

    if (!orgId)
      return res.status(401).json({ error: "No organization ID provided." });

    const result = await pool.query(
      `SELECT id, org_name, email FROM organizations WHERE id = $1`,
      [orgId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Organization not found." });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PROFILE LOAD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
