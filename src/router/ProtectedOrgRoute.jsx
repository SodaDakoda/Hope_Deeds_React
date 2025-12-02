import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedOrgRoute({ children }) {
  const { user, loading } = useAuth();

  // Still checking the token?
  if (loading) {
    return <div className="p-6 text-center text-xl">Checking session...</div>;
  }

  // No user logged in → redirect to organization login
  if (!user) {
    return <Navigate to="/org-login" replace />;
  }

  // User is logged in but NOT an admin/org account → block access
  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
