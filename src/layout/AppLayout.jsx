import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* future: TopBar, Nav, etc. */}
      <Outlet /> {/* This is where Home, Login, Register will render */}
    </div>
  );
}
