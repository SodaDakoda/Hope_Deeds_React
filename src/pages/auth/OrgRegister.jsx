// src/pages/auth/OrgRegister.jsx
import { useState } from "react";
import { orgRegister } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function OrgRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    org_name: "",
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
      const result = await orgRegister(form);

      // Backend returns: { success: true } or { error }
      if (result.error) {
        setError(result.error);
        return;
      }

      alert("Organization registered successfully! Please log in.");
      navigate("/org-login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#075677]">
          Register Organization
        </h1>

        {error && <p className="text-red-600 text-center mt-3">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="org_name"
            placeholder="Organization Name"
            className="input-style"
            value={form.org_name}
            onChange={handleChange}
            required
          />

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
