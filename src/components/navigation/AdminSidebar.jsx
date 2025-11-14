import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/admin" className="hover:text-blue-600">
          Volunteers
        </Link>
        <Link to="/admin/shifts" className="hover:text-blue-600">
          Shifts
        </Link>
        <a href="/org/logout" className="text-red-500">
          Logout
        </a>
      </nav>
    </aside>
  );
}
