import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-6">
        Hope<span className="text-orange-500">Deeds</span>
      </h2>

      <nav className="flex flex-col gap-3">
        <Link to="/org/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/org/dashboard#opportunities" className="hover:text-blue-600">
          Opportunities
        </Link>
        <a href="/org/logout" className="text-red-500">
          Logout
        </a>
      </nav>
    </aside>
  );
}
