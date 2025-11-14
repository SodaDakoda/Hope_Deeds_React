// src/services/auth.js
const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function orgRegister(data) {
  const res = await fetch(`${API_BASE}/org/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function orgLogin(data) {
  const res = await fetch(`${API_BASE}/org/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getOrgProfile() {
  try {
    const res = await fetch("/api/org/profile", {
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching org:", err);
  }
}
