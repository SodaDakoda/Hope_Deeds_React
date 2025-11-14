import Sidebar from "../navigation/Sidebar";
import Topbar from "../navigation/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
