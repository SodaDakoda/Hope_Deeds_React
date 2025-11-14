import AdminSidebar from "../navigation/AdminSidebar";
import Topbar from "../navigation/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <Topbar admin />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
