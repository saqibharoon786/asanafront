import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaProjectDiagram,
  FaFileInvoice,
  FaBullhorn,
  FaRegFileAlt,
  FaBars,
} from "react-icons/fa";
import companyLogo from "../../assets/images/CompanyLogo.jpg";  // Ensure the path is correct

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [isSalesOpen, setIsSalesOpen] = useState(true);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDropdown = (section) => {
    if (section === "dashboard") setIsDashboardOpen(!isDashboardOpen);
    if (section === "sales") setIsSalesOpen(!isSalesOpen);
    if (section === "pages") setIsPagesOpen(!isPagesOpen);
  };

  return (
    <>
      {/* Burger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-black bg-gray-300 md:hidden"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative top-0 left-0 w-64 bg-white shadow-lg h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out z-50 rounded-lg`}
      >
        <div className="p-6 border-b rounded-t-lg flex items-center gap-4">
          {/* Company Logo */}
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Company Name */}
          <h1 className="text-s font-bold text-black">Alpha Capital Security Systems LLC</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2">
          {/* Dashboard Module */}
          <div>
            <button
              onClick={() => toggleDropdown("dashboard")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <span>Dashboard</span>
              <span>{isDashboardOpen ? "▲" : "▼"}</span>
            </button>

            {isDashboardOpen && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to={`/sales/${user?.name}`}
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📈 Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/discover"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🔍 Discover Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    💼 Sales Overview
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Sales Module */}
          <div>
            <button
              onClick={() => toggleDropdown("sales")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <span>Sales</span>
              <span>{isSalesOpen ? "▲" : "▼"}</span>
            </button>

            {isSalesOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/customers"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    👥 Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-leads"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🔥 Leads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-Quote-Panel"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📝 Quotes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/retainer-invoices"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📄 Retainer Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-orders"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🚀 Sales Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/delivery-challans"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📦 Delivery Challans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quotePanel"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🧾 Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/payment-received"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    💵 Payments Received
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recurring-invoices"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🔁 Recurring Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/credit-notes"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    💳 Credit Notes
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
