import { useState } from "react";
import { orgLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function OrgLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const result = await orgLogin(form);

      // Backend returns { success, token, user }
      if (!result.success || !result.token) {
        setError(result.error || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", result.token);

      // Save admin user (organization owner)
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/org/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#075677]">
          Organization Login
        </h1>

        {error && <p className="text-red-600 text-center mt-3">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-style"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-style"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#075677] text-white py-2 rounded hover:bg-[#06485f]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
