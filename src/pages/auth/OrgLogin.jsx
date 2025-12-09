import { useState } from "react";
import { orgLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OrgLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await orgLogin(form);

      // Expecting: { success, token, user }
      if (!result?.success || !result?.token || !result?.user) {
        setError(result?.error || "Login failed");
        setLoading(false);
        return;
      }

      // Save JWT for future requests
      localStorage.setItem("token", result.token);

      // ✅ IMPORTANT: update auth context
      setUser(result.user);

      // Navigate AFTER auth state is set
      navigate("/org/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#075677]">
          Organization Login
        </h1>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-style"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-style"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#075677] text-white py-2 rounded hover:bg-[#06485f] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
