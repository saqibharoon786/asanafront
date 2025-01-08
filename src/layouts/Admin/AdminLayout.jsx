import React, { useState } from 'react';
import Sidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'


const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 bg-gray-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static w-64`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="shadow-md bg-white">
          <AdminNavbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Placeholder */}
        <div className="flex-1  bg-gray-50">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
