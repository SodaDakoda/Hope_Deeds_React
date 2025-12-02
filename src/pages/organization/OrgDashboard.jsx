import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrgProfile } from "../../services/organizations";

export default function OrgDashboard() {
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrg() {
      try {
        const data = await getOrgProfile();
        if (!data?.id) {
          navigate("/login");
          return;
        }
        setOrg(data);
      } catch (err) {
        console.error("Failed to load org:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrg();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#075677]">
        Welcome, {org.org_name}
      </h1>

      <p className="text-gray-600 mt-2">
        Manage your opportunities, volunteers, and organization info.
      </p>

      {/* Quick Actions */}
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
          <p className="text-gray-500 mt-2">Edit, update, and delete shifts.</p>
        </Link>

        <Link
          to="/org/profile"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-[#62c7f2]"
        >
          <h3 className="text-xl font-bold text-[#62c7f2]">
            Organization Profile
          </h3>
          <p className="text-gray-500 mt-2">View organization details.</p>
        </Link>
      </div>
    </div>
  );
}
