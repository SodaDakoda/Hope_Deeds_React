import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "../layout/AppLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Pages — Home
import Home from "../pages/home/Home";

// Org Auth
import OrgLogin from "../pages/auth/OrgLogin";
import OrgRegister from "../pages/auth/OrgRegister";

// Org Dashboard
import OrgDashboard from "../pages/organization/OrgDashboard";

// Protected Routes
import ProtectedOrgRoute from "./ProtectedOrgRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =======================
            PUBLIC ROUTES
        ========================== */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/org-login" element={<OrgLogin />} />
          <Route path="/org-register" element={<OrgRegister />} />

          {/* Optional backwards-compatible paths */}
          <Route path="/login" element={<OrgLogin />} />
          <Route path="/register" element={<OrgRegister />} />
        </Route>

        {/* =======================
            ORGANIZATION DASHBOARD
        ========================== */}
        <Route
          element={
            <ProtectedOrgRoute>
              <DashboardLayout />
            </ProtectedOrgRoute>
          }
        >
          <Route path="/org/dashboard" element={<OrgDashboard />} />
        </Route>

        {/* =======================
            404 PAGE
        ========================== */}
        <Route
          path="*"
          element={
            <AppLayout>
              <h1 className="text-center p-10">404 Not Found</h1>
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
