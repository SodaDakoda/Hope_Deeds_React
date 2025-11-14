import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    org_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    contact_person: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setStatus("Creating organization...");

    try {
      const res = await fetch("/org/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus(text || "Registration failed.");
        return;
      }

      // SUCCESS
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
                  to="/login"
                  className="bg-[#075677] text-white px-4 py-2 rounded hover:bg-[#06485f] transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* MAIN FORM */}
      <div className="flex justify-center items-center flex-grow px-6 py-20">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-2xl border-t-4 border-[#075677]">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Register Your Organization
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Create an account to begin posting opportunities
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Organization Name */}
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="org_name"
                required
                value={form.org_name}
                onChange={handleChange}
                className="input-style"
                placeholder="Example Community Center"
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-style"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="input-style"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input-style"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Address fields */}
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input-style"
                placeholder="123 Main St"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input-style"
                placeholder="Your City"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="input-style"
                placeholder="CA"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={form.zipcode}
                onChange={handleChange}
                className="input-style"
                placeholder="92780"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block font-medium text-gray-700">
                Contact Person
              </label>
              <input
                type="text"
                name="contact_person"
                value={form.contact_person}
                onChange={handleChange}
                className="input-style"
                placeholder="John Doe"
              />
            </div>

            {/* Status */}
            {status && (
              <p className="col-span-2 text-center text-red-500">{status}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="
                col-span-2 bg-[#075677] text-white py-3 rounded-lg text-lg font-semibold
                hover:bg-[#06485f] transition
              "
            >
              Create Organization
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-[#075677] font-medium ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} HopeDeeds.
        </div>
      </footer>
    </div>
  );
}
