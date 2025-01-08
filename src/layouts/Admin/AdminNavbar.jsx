import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
  faBars,
  faCalendarAlt,
  faGlobe,
  faProjectDiagram,
  faFileAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getTitle = () => {
    const pathToTitleMap = {
      "/admin/dashboard": "Dashboard",
      "/leads": "Leads",
      "/staff": "Staff",
      "/departments": "Departments",
      "/products": "Products",
      "/sales": "Sales",
    };
    return pathToTitleMap[location.pathname] || "Admin Dashboard";
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="relative bg-white shadow-md">
      <div className="flex items-center justify-between p-4 space-x-4 w-full">
        <h1 className="hidden md:block text-xl font-bold text-center">{getTitle()}</h1>

        {/* Search and dropdowns (hidden on small screens) */}
        <div className="hidden sm:flex space-x-4">
          <select className="border p-2 rounded-md">
            <option value="" disabled selected>Select Year</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>

          <input placeholder="Search..." className="border p-2 rounded-md" />

          <select name="language" className="border p-2 rounded-md">
            <option value="" disabled selected>Select Language</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="japanese">Japanese</option>
          </select>

          <select className="border p-2 rounded-md">
            <option value="" disabled selected>Projects</option>
            <option value="web">Web</option>
            <option value="marketing">Marketing</option>
            <option value="ios">iOS</option>
          </select>

          <select name="reports" className="border p-2 rounded-md">
            <option value="" disabled selected>Reports</option>
            <option value="ms_word">MS Word</option>
            <option value="ms_excel">MS Excel</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-10 pr-10">
          <FontAwesomeIcon icon={faUser} className="text-gray-700 hover:text-blue-500" />
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-700 hover:text-blue-500" />
          <FontAwesomeIcon icon={faBell} className="text-gray-700 hover:text-blue-500" />

          {/* Sidebar toggle button */}
          <button
            className="md:hidden p-2 rounded-md bg-gray-800 text-white"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
