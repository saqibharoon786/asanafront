import React, { useState } from "react";
import SalesNavbar from "./SalesNavbar";
import SalesSideBar from "./SalesSideBar";

const SalesLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Full Page Layout */}
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navbar */}
        <SalesNavbar toggleSidebar={toggleSidebar} />

        {/* Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-50 bg-gray-800 text-white w-64 h-full transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0`}
          >
            <SalesSideBar />
          </div>

          {/* Overlay for Small Screens */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleSidebar}
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

export default SalesLayout;
