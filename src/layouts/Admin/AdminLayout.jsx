import React from "react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Navbar */}
      <AdminNavbar />

      {/* Sidebar and Main Content */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
