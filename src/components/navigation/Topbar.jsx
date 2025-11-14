// src/components/layout/TopBar.jsx
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-extrabold text-[#075677]">
          Hope<span className="text-[#f8993a]">Deeds</span>
        </h1>

        <nav>
          <ul className="flex gap-6 items-center text-lg font-medium">
            <li>
              <Link to="/login" className="hover:text-[#075677]">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-[#075677] text-white px-4 py-2 rounded hover:bg-[#06485f] transition"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
