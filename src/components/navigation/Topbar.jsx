import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link to="/" className="font-bold text-[#075677]">
        Hope Deeds
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/org-login" className="text-[#075677]">
              Login
            </Link>
            <Link
              to="/org-register"
              className="bg-[#075677] text-white px-4 py-2 rounded"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link to="/org/dashboard" className="text-[#075677]">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-red-600 font-medium">
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
