import { Outlet } from "react-router-dom";
import Topbar from "../navigation/Topbar";
import Sidebar from "../navigation/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6">
          <Outlet /> {/* OrgDashboard renders here */}
        </main>
      </div>
    </div>
  );
}
