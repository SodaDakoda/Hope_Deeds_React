// src/utils/api.jsx
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

export default {
  get: (path) => api(path),
  post: (path, body) =>
    api(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => api(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => api(path, { method: "DELETE" }),
};
