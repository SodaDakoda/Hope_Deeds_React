const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
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
