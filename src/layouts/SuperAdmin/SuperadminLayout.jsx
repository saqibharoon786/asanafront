import React, { useState } from "react";
import SuperAdminNavbar from "./SuperAdminNavbar";
import SuperAdminSidebar from "./SuperAdminSidebar"

const SuperAdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Full Page Layout */}
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navbar */}
        <SuperAdminNavbar toggleSidebar={toggleSidebar} />

        {/* Hamburger Button (Mobile) */}
        <div className="lg:hidden flex items-center p-4">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-50 bg-white text-white w-64 h-full transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen || isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            } lg:relative lg:translate-x-0`}
          >
            <SuperAdminSidebar />
          </div>

          {/* Overlay for Small Screens */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleMobileMenu}
            ></div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminLayout;
