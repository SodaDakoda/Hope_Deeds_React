import { AuthProvider } from "./context/AuthContext";
import { OrgProvider } from "./context/OrgContext";
import { AdminProvider } from "./context/AdminContext";
import { UIProvider } from "./context/UIContext";

import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <OrgProvider>
          <AdminProvider>
            <AppRouter />
          </AdminProvider>
        </OrgProvider>
      </UIProvider>
    </AuthProvider>
  );
}
