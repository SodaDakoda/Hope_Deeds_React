import { Outlet } from "react-router-dom";
import Topbar from "../components/navigation/Topbar.jsx";
import Sidebar from "../components/navigation/Sidebar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
