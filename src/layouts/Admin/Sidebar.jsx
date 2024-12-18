import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useSelector } from "react-redux";

import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaProjectDiagram,
  FaFileInvoice,
  FaBullhorn,
  FaRegFileAlt,
} from "react-icons/fa";

function SideBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-center text-white">Admin</h2>
      <nav className="flex flex-col space-y-4">
        {/* Dashboard */}
        <Link
          to={`/admin/${user.name}`} // Use curly braces to interpolate the string
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        {/* Staff */}
        <Link
          to="/staff"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaUsers />
          <span>Staff</span>
        </Link>

        {/* Departments */}
        <Link
          to="/department"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaBuilding />
          <span>Departments</span>
        </Link>

        {/* Projects */}
        <Link
          to="/projects"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </Link>
        {/* Campaigns */}
        <Link
          to="/products"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaBullhorn />
          <span>Product</span>
        </Link>

          {/* Leads */}
          <Link
          to="/leads"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaBullhorn />
          <span>Leads</span>
        </Link>
      
        {/* Quotations */}
        <Link
          to="/quotePanel"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaRegFileAlt />
          <span>Quotations</span>
        </Link>
          {/* Invoices */}
          <Link
          to="/invoicepanel"
          className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md"
        >
          <FaFileInvoice />
          <span>Invoices</span>
        </Link>

      </nav>
    </div>
  );
}

export default SideBar;
