// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-100 py-6">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} HopeDeeds.
      </div>
    </footer>
  );
}
