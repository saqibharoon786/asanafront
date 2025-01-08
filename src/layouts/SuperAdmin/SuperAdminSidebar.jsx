import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTachometerAlt, FaBuilding } from "react-icons/fa"; // Import only necessary icons
import companyLogo from "../../assets/images/CompanyLogo.jpg"; // Ensure the path is correct

const SuperAdminSidebar = () => {
  const { user } = useSelector((state) => state.auth); // Fetch user details from Redux
  const [isSuperAdminSidebarOpen, setIsSuperAdminSidebarOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); // Toggle for Dashboard
  const [isCompanyOpen, setIsCompanyOpen] = useState(false); // Toggle for Company

  const toggleDropdown = (section) => {
    if (section === "dashboard") {
      setIsDashboardOpen(!isDashboardOpen); // Toggle Dashboard
      setIsCompanyOpen(false); // Close Company if open
    }
    if (section === "company") {
      setIsCompanyOpen(!isCompanyOpen); // Toggle Company
      setIsDashboardOpen(false); // Close Dashboard if open
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside>
        {/* Header with Logo */}
        <div className="p-6 border-b rounded-t-lg flex items-center gap-4">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h1 className="text-s font-bold text-black">
            Alpha Capital Security Systems LLC
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2">
          {/* Dashboard Module */}
          <div>
            <button
              onClick={() => toggleDropdown("dashboard")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaTachometerAlt className="mr-2 transform transition-transform hover:scale-110" />
              <span>Dashboard</span>
              <span>{isDashboardOpen ? "▲" : "▼"}</span>
            </button>
            {isDashboardOpen && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to={`/admin/${user?.name}`}
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📈 Analytics Dashboard
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Company Module */}
          <div>
            <button
              onClick={() => toggleDropdown("company")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaBuilding className="mr-2 transform transition-transform hover:scale-110" />
              <span>Company</span>
              <span>{isCompanyOpen ? "▲" : "▼"}</span>
            </button>
            {isCompanyOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/superadmin/add-company"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    Create Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/superadmin/company"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    Manage Company
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for Small Screens */}
      {isSuperAdminSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSuperAdminSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SuperAdminSidebar;
