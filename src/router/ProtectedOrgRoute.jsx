import { Navigate } from "react-router-dom";

export default function ProtectedOrgRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // No token → force login
  if (!token) {
    return <Navigate to="/org-login" replace />;
  }

  // If a user exists but isn't an admin → block
  if (!user || user.role !== "admin") {
    return <Navigate to="/org-login" replace />;
  }

  return children;
}
