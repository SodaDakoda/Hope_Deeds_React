const { pool } = require("../../server.js");
const bcrypt = require("bcrypt");

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

const { pool } = require("../db/db");

exports.getOrgProfile = async (req, res) => {
  try {
    const orgId = req.session?.orgId;

    if (!orgId) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const query = `SELECT id, org_name, email, phone, address, city, state, zipcode
                   FROM organizations WHERE id = $1`;

    const result = await pool.query(query, [orgId]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error loading org profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};
