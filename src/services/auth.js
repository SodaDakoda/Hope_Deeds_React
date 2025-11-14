// src/services/auth.js
export async function orgLogin({ email, password }) {
  try {
    const res = await fetch("/api/org/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // If backend crashed or URL is wrong → res.ok = false
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || "Server error (login failed)",
      };
    }

    const data = await res.json();
    return { success: true, org: data.org };
  } catch (err) {
    console.error("Login request error:", err);
    return { success: false, error: "Network error or server offline" };
  }
}
