import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OrgLogin from "../pages/auth/OrgLogin";
import OrgRegister from "../pages/auth/OrgRegister";

// Organization
import OrgDashboard from "../pages/organization/OrgDashboard";
import EditOpportunity from "../pages/organization/EditOpportunity";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import VolunteerProfile from "../pages/admin/VolunteerProfile";

// Protected wrapper
import ProtectedOrgRoute from "./ProtectedOrgRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        {/* Volunteer / User auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Organization auth */}
        <Route path="/org-login" element={<OrgLogin />} />
        <Route path="/org-register" element={<OrgRegister />} />

        {/* ORG DASHBOARD — PROTECTED */}
        <Route
          path="/org/dashboard"
          element={
            <ProtectedOrgRoute>
              <OrgDashboard />
            </ProtectedOrgRoute>
          }
        />

        <Route
          path="/org/opportunity/:id"
          element={
            <ProtectedOrgRoute>
              <EditOpportunity />
            </ProtectedOrgRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/volunteer/:id" element={<VolunteerProfile />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h1 className="text-center p-10">404 Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
