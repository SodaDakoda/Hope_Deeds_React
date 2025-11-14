import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import OrgDashboard from "../pages/organization/OrgDashboard";
import EditOpportunity from "../pages/organization/EditOpportunity";

import AdminDashboard from "../pages/admin/AdminDashboard";
import VolunteerProfile from "../pages/admin/VolunteerProfile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Organization */}
        <Route path="/org/dashboard" element={<OrgDashboard />} />
        <Route path="/org/opportunity/:id" element={<EditOpportunity />} />

        {/* Admin */}
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
