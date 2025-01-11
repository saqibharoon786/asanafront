import React, { useState } from 'react';
import SalesSidebar from './SalesSidebar';
import SalesNavbar from './SalesNavbar';

const SalesLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 transform transition-transform duration-300 bg-gray-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static w-64`}
      >
        <SalesSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-64 right-0 z-20 shadow-md bg-white h-16">
        <SalesNavbar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Placeholder */}
      <div className="flex-1 overflow-y-auto bg-gray-50 mt-16">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SalesLayout;
