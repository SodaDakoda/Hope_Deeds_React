import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-3xl font-extrabold text-[#075677]">
            Hope<span className="text-[#f8993a]">Deeds</span>
          </h1>

          <nav>
            <ul className="flex gap-6 items-center text-lg font-medium">
              <li>
                <Link to="/login" className="hover:text-[#075677]">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-[#075677] text-white px-4 py-2 rounded hover:bg-[#06485f] transition"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between container mx-auto px-6 py-20">
        {/* Left content */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Connecting Hands,
            <span className="text-[#075677]"> Changing Lives</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            HopeDeeds makes it simple for organizations to manage volunteers,
            post opportunities, track hours, and streamline communication.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/login"
              className="bg-[#075677] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#06485f] transition"
            >
              Organization Login
            </Link>

            <Link
              to="/register"
              className="border-2 border-[#075677] text-[#075677] px-6 py-3 rounded-lg text-lg hover:bg-[#075677] hover:text-white transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Right image / illustration */}
        <div className="mt-14 lg:mt-0">
          <img
            src="/img/hero_volunteers.png"
            alt="Volunteers illustration"
            className="w-full max-w-lg drop-shadow-lg"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-16 border-t">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10 text-gray-800">
            Why Choose <span className="text-[#075677]">HopeDeeds?</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <i className="fas fa-hand-holding-heart text-[#075677] text-4xl"></i>
              <h4 className="text-xl font-semibold mt-4">
                Volunteer Management
              </h4>
              <p className="text-gray-600 mt-2">
                Keep track of volunteers, hours, shift approvals, and profiles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <i className="fas fa-calendar-check text-[#f8993a] text-4xl"></i>
              <h4 className="text-xl font-semibold mt-4">
                Opportunity Posting
              </h4>
              <p className="text-gray-600 mt-2">
                Post, edit, update, and fill service opportunities instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
              <i className="fas fa-chart-line text-[#62c7f2] text-4xl"></i>
              <h4 className="text-xl font-semibold mt-4">
                Reports & Analytics
              </h4>
              <p className="text-gray-600 mt-2">
                Track growth, service hours, and volunteer engagement trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-100 py-6">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} HopeDeeds.
        </div>
      </footer>
    </div>
  );
}
