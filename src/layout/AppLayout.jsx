export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Do NOT include TopBar or Footer here yet */}
      {children}
    </div>
  );
}
