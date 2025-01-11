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

const SalesNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getTitle = () => {
    const pathToTitleMap = {
      "/sales/dashboard": "Dashboard",
      "/leads": "Leads",
      "/staff": "Staff",
      "/departments": "Departments",
      "/products": "Products",
      "/sales": "Sales",
      "/quotes":"Quote",
      "/invoices":"Invoice",
      "/clander":"Clander"
    };
    return pathToTitleMap[location.pathname] || "Sales";
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

export default SalesNavbar;
