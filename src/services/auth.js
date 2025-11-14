// src/services/auth.js

// ------------------------
// Register Organization
// ------------------------
export async function orgRegister(form) {
  try {
    const res = await fetch("/api/org/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Registration failed",
      };
    }

    return { success: true, org: data.org };
  } catch (err) {
    console.error("Registration request failed:", err);
    return { success: false, error: "Network error" };
  }
}

// ------------------------
// Login Organization
// ------------------------
export async function orgLogin({ email, password }) {
  try {
    const res = await fetch("/api/org/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Invalid credentials",
      };
    }

    return { success: true, org: data.org };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Network error" };
  }
}

// ------------------------
// Get Org Profile (Dashboard)
// ------------------------
export async function getOrgProfile() {
  try {
    const res = await fetch("/api/org/profile");

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Unable to load profile",
      };
    }

    return { success: true, org: data };
  } catch (err) {
    console.error("Profile request failed:", err);
    return { success: false, error: "Network error" };
  }
}
