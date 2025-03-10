import React, { useState } from "react";
import MainSidebar from './MainSidebar'
import MainNavbar from './MainNavbar'


const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="z-20">
        <MainNavbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`z-10 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static w-64`}
        >
          <MainSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 border-l border-t border-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
