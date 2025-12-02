// Auto-detect API base:
// - If running on localhost → use local backend
// - Otherwise → use Render backend
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://hopedeeds-api.onrender.com/api";

// Main helper for all API requests
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

// Shortcut helpers
const api = {
  get: (path) => apiRequest(path, { method: "GET" }),

  post: (path, body) =>
    apiRequest(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body) =>
    apiRequest(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path) => apiRequest(path, { method: "DELETE" }),
};

export default api;
