import { AuthProvider } from "./context/AuthContext";
import { OrgProvider } from "./context/OrgContext";
import { AdminProvider } from "./context/AdminContext";
import { UIProvider } from "./context/UIContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

import Home from "./pages/home/Home";

// Org Auth
import OrgLogin from "./pages/auth/OrgLogin";
import OrgRegister from "./pages/auth/OrgRegister";

// Org Dashboard
import OrgDashboard from "./pages/organization/OrgDashboard";

// Protected Route
import ProtectedOrgRoute from "./router/ProtectedOrgRoute";

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <OrgProvider>
          <AdminProvider>
            <BrowserRouter>
              <Routes>
                {/* PUBLIC PAGES */}
                <Route
                  path="/"
                  element={
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <AppLayout>
                      <OrgLogin />
                    </AppLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AppLayout>
                      <OrgRegister />
                    </AppLayout>
                  }
                />

                {/* ORG DASHBOARD */}
                <Route
                  path="/org/dashboard"
                  element={
                    <ProtectedOrgRoute>
                      <DashboardLayout>
                        <OrgDashboard />
                      </DashboardLayout>
                    </ProtectedOrgRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </OrgProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
