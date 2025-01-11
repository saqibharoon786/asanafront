import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faBell,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../../assets/images/CompanyLogo.jpg";

const SuperAdminNavbar = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative shadow-md">
      {/* Primary Navbar */}
      <div className="flex items-center justify-between bg-gray-900 text-white h-12 px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-8 h-8 rounded"
          />
          <h1 className="text-lg font-bold">ACSSLC</h1>
        </div>

        {/* Navbar Controls */}
        <div className="flex items-center space-x-6">
          <FontAwesomeIcon icon={faEnvelope} className="hover:text-gray-300" />
          <FontAwesomeIcon icon={faBell} className="hover:text-gray-300" />
          <FontAwesomeIcon icon={faUser} className="hover:text-gray-300" />

          {/* Sidebar Toggle Button */}
          <button
            className="md:hidden p-2 rounded bg-gray-700 hover:bg-gray-600"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNavbar;
