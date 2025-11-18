const API_BASE = import.meta.env.VITE_API_URL || "";

// -----------------------------
// REGISTER ORG
// -----------------------------
export async function orgRegister(data) {
  try {
    const res = await fetch(`/api/org/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Register error:", err);
    return { success: false, error: "Network error" };
  }
}

// -----------------------------
// LOGIN ORG
// -----------------------------
export async function orgLogin(data) {
  try {
    const res = await fetch(`/api/org/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Network error" };
  }
}

// -----------------------------
// GET ORG PROFILE
// -----------------------------
export async function getOrgProfile(id) {
  try {
    const res = await fetch(`/api/org/profile?id=${id}`);
    return await res.json();
  } catch (err) {
    console.error("Profile fetch error:", err);
    return null;
  }
}
