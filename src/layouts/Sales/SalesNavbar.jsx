import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { FaBars } from "react-icons/fa";
import companyLogo from "../../assets/images/CompanyLogo.jpg";

const SalesNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user?.name);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-100 text-black p-4 sm:p-6 flex justify-between items-center border-b border-gray-300">
      {/* Burger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-black bg-gray-300 rounded-md lg:hidden"
      >
        <FaBars />
      </button>

      {/* Company Logo and Name */}
      <div className="flex items-center gap-4">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
        />
        <span className="text-xl sm:text-3xl font-bold text-gray-800">
          Alpha Capital Security Systems LLC
        </span>
      </div>

      {/* Welcome Message */}
      <div className="hidden sm:block text-base sm:text-lg font-medium">
        Welcome to the Dashboard, Sales {name}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="font-medium py-2 px-4 rounded hover:bg-brown-600 transition duration-300"
        style={{
          backgroundColor: "#D2B48C",
          color: "#fff",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default SalesNavbar;
