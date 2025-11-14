import { useOrg } from "../context/OrgContext";
import { Navigate } from "react-router-dom";

export default function ProtectedOrgRoute({ children }) {
  const { org, loading } = useOrg();

  if (loading) return <div>Checking session...</div>;

  if (!org) return <Navigate to="/login" replace />;

  return children;
}
