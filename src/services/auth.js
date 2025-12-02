import { apiRequest } from "../utils/api";

// -----------------------------
// ORGANIZATION REGISTER
// -----------------------------
export async function orgRegister(data) {
  return apiRequest("/auth/register-org", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// -----------------------------
// ORGANIZATION LOGIN
// -----------------------------
export async function orgLogin(data) {
  return apiRequest("/auth/login-org", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// -----------------------------
// USER LOGIN (Admin, Manager, Volunteer)
// -----------------------------
export async function userLogin(data) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// -----------------------------
// GET LOGGED-IN USER PROFILE
// -----------------------------
export async function getProfile(token) {
  return apiRequest("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
