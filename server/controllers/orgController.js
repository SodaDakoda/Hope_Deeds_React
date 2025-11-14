// server/controllers/orgController.js

const pool = require("../db/db");
const bcrypt = require("bcryptjs");

// ----------------------------------
// POST /api/org/register
// ----------------------------------
const { pool } = require("../db/db");
const bcrypt = require("bcryptjs");

// POST /api/org/register
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
    return res
      .status(400)
      .json({ error: "Organization name, email, and password are required." });
  }

  try {
    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO organizations 
      (org_name, email, phone, address, city, state, zipcode, contact_person, password_hash)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id, org_name, email
    `;

    const values = [
      org_name,
      email,
      phone || "",
      address || "",
      city || "",
      state || "",
      zipcode || "",
      contact_person || "",
      hashed,
    ];

    const result = await pool.query(query, values);

    res.json({
      success: true,
      org: result.rows[0],
    });
  } catch (err) {
    console.error("ORG REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
};

// ----------------------------------
// POST /api/org/login
// ----------------------------------
const { pool } = require("../db/db");
const bcrypt = require("bcryptjs");

// POST /api/org/login
exports.loginOrg = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });

  try {
    const result = await pool.query(
      "SELECT id, org_name, email, password_hash FROM organizations WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials." });

    const org = result.rows[0];

    const match = await bcrypt.compare(password, org.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    return res.json({
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

// ----------------------------------
// GET /api/org/me
// ----------------------------------
exports.getOrgProfile = async (req, res) => {
  try {
    const orgId = req.session?.orgId;

    if (!orgId) return res.status(401).json({ error: "Not logged in" });

    const result = await pool.query(
      `SELECT id, org_name, email, phone, address, city, state, zipcode
       FROM organizations WHERE id = $1`,
      [orgId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ORG PROFILE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
