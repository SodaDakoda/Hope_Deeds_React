import { apiRequest } from "../utils/api";

// ORG REGISTER
export async function orgRegister(data) {
  return apiRequest("/auth/org/register", {
    method: "POST",
    body: JSON.stringify({
      name: data.org_name,
      email: data.email,
      password: data.password,
    }),
  });
}

// ORG LOGIN
export async function orgLogin(data) {
  return apiRequest("/auth/org/login", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
}

// GET ORG PROFILE
export async function getProfile() {
- return apiRequest("/auth/me")
+ return apiRequest("/auth/org/me")
}

