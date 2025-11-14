import { AuthProvider } from "./context/AuthContext";
import { OrgProvider } from "./context/OrgContext";
import { AdminProvider } from "./context/AdminContext";
import { UIProvider } from "./context/UIContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <OrgProvider>
          <AdminProvider>
            <BrowserRouter>
              <Routes>
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
                      <Login />
                    </AppLayout>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <AppLayout>
                      <Register />
                    </AppLayout>
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
