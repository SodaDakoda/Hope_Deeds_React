import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OrgDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if no user after loading
  useEffect(() => {
    if (!loading && !user) {
      navigate("/org-login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">Loading your dashboard...</div>
    );
  }

  if (!user) {
    // Safety fallback — should never hit due to redirect
    return (
      <div className="p-10 text-center text-xl text-red-600">
        Not authorized.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-[#075677]">
        Welcome, {user.name}
      </h1>

      <p className="text-gray-600 mt-2">
        Manage your opportunities, volunteers, and organization info.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Link
          to="/org/opportunities/create"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-[#075677]"
        >
          <h3 className="text-xl font-bold text-[#075677]">
            Create Opportunity
          </h3>
          <p className="text-gray-500 mt-2">
            Post new volunteer opportunities.
          </p>
        </Link>

        <Link
          to="/org/opportunities"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-[#f8993a]"
        >
          <h3 className="text-xl font-bold text-[#f8993a]">
            Manage Opportunities
          </h3>
          <p className="text-gray-500 mt-2">Edit & manage shifts.</p>
        </Link>

        <Link
          to="/org/profile"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-[#62c7f2]"
        >
          <h3 className="text-xl font-bold text-[#62c7f2]">
            Organization Profile
          </h3>
          <p className="text-gray-500 mt-2">View org details.</p>
        </Link>
      </div>
    </div>
  );
}
