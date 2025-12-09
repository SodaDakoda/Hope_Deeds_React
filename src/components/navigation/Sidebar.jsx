import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `
    flex items-center px-5 py-3 rounded-md transition
    ${
      isActive
        ? "bg-white text-[#075677] font-semibold"
        : "text-[#e6f3f8] hover:bg-[#0b6e94]"
    }
  `;

  return (
    <aside className="w-64 min-h-screen bg-[#075677] flex flex-col">
      {/* LOGO / TITLE */}
      <div className="px-6 py-6 border-b border-white/20">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Hope Deeds
        </h1>
        <p className="text-sm text-[#cde9f3] mt-1">Organization Dashboard</p>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        <NavLink to="/org/dashboard" className={linkClasses}>
          Dashboard
        </NavLink>

        <NavLink to="/org/opportunities" className={linkClasses}>
          Opportunities
        </NavLink>

        <NavLink to="/org/shifts" className={linkClasses}>
          Shifts
        </NavLink>

        <NavLink to="/org/volunteers" className={linkClasses}>
          Volunteers
        </NavLink>
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-white/20 text-sm text-[#cde9f3]">
        © {new Date().getFullYear()} Hope Deeds
      </div>
    </aside>
  );
}
