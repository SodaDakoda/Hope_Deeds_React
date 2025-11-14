import Topbar from "../navigation/Topbar";
import Sidebar from "../navigation/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
