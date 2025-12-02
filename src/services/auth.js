import { apiRequest } from "../utils/api";

// -----------------------------
// REGISTER ORGANIZATION
// -----------------------------
export async function orgRegister(data) {
  return apiRequest("/auth/register-org", {
    method: "POST",
    body: JSON.stringify({
      name: data.org_name, // backend expects "name"
      email: data.email,
      password: data.password,
    }),
  });
}

// -----------------------------
// LOGIN (Organization Admin)
// -----------------------------
export async function orgLogin(data) {
  return apiRequest("/auth/login-org", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
}

// -----------------------------
// GET LOGGED-IN USER PROFILE
// -----------------------------
export async function getProfile() {
  return apiRequest("/auth/me", {
    method: "GET",
  });
}
