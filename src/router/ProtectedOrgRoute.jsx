import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedOrgRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Loading session...</div>;
  }

  if (!user) {
    return <Navigate to="/org-login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
