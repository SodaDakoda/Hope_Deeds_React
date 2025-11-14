// server/controllers/orgController.js
const bcrypt = require("bcryptjs");
const { pool } = require("../db/db");

// -----------------------------
// REGISTER ORGANIZATION
// POST /api/org/register
// -----------------------------
exports.registerOrg = async (req, res) => {
  const {
    org_name,
    email,
    phone,
    address,
    city,
    state,
    zipcode,
    contact_person,
    password,
  } = req.body;

  if (!org_name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Check if email exists
    const exists = await pool.query(
      "SELECT id FROM organizations WHERE email = $1",
      [email]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert
    const result = await pool.query(
      `INSERT INTO organizations 
      (org_name, email, phone, address, city, state, zipcode, contact_person, password)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id, org_name, email`,
      [
        org_name,
        email,
        phone,
        address,
        city,
        state,
        zipcode,
        contact_person,
        hashed,
      ]
    );

    res.json({ success: true, org: result.rows[0] });
  } catch (err) {
    console.error("ORG REGISTRATION ERROR:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
};

// -----------------------------
// LOGIN ORGANIZATION
// POST /api/org/login
// -----------------------------
exports.loginOrg = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required." });

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
// GET ORG PROFILE
// GET /api/org/profile
// -----------------------------
exports.getOrgProfile = async (req, res) => {
  try {
    const orgId = req.query.id || req.session?.orgId;

    if (!orgId) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const result = await pool.query(
      `SELECT id, org_name, email, phone, address, city, state, zipcode, contact_person 
       FROM organizations WHERE id = $1`,
      [orgId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error loading org profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};
