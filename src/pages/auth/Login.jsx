import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch("/org/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus(text || "Login failed");
        return;
      }

      // SUCCESS → redirect
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-3xl font-extrabold text-[#075677]">
            Hope<span className="text-[#f8993a]">Deeds</span>
          </h1>

          <nav>
            <ul className="flex gap-6 items-center text-lg font-medium">
              <li>
                <Link to="/" className="hover:text-[#075677]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-[#075677] text-white px-4 py-2 rounded hover:bg-[#06485f] transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* LOGIN FORM */}
      <div className="flex justify-center items-center flex-grow px-6 py-20">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md border-t-4 border-[#075677]">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Organization Login
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Sign in to manage your volunteer opportunities
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-[#075677] focus:outline-none
                "
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-[#075677] focus:outline-none
                "
                placeholder="Enter your password"
              />
            </div>

            {/* Status message */}
            {status && (
              <p className="text-center text-sm text-red-500">{status}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full bg-[#075677] text-white py-3 rounded-lg text-lg font-semibold
                hover:bg-[#06485f] transition
              "
            >
              Log In
            </button>
          </form>

          {/* Extra links */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#075677] font-medium ml-1 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} HopeDeeds.
        </div>
      </footer>
    </div>
  );
}
