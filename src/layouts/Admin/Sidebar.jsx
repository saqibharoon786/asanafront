import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faChartLine,
  faUserShield,
  faBoxOpen,
  faBullhorn,
  faUserTie,
  faHouse,
  faBuilding,
  faUser,
  faSackDollar,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../../assets/images/CompanyLogo.jpg";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    HR: false,
    product: false,
    sales: false,
  });

  const toggleDropdown = (section) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleOptionClick = () => {
    if (isSidebarOpen) toggleSidebar(); // Close the sidebar if it is open
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center space-x-4 bg-blue-600 text-white">
        <img src={companyLogo} alt="Company Logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-lg font-bold">ACSSLC</h1>
      </div>

      {/* Sidebar Content */}
      <div className="mt-4 overflow-y-auto h-[calc(100vh-6rem)]">
        <ul className="text-gray-800">
          {/* Dashboard Section */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("dashboard")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-blue-600 group-hover:text-blue-600 transition duration-200"
                />
                <span className="group-hover:text-blue-600 transition duration-200">Home</span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.dashboard ? faChevronDown : faChevronRight}
                className="text-gray-900 group-hover:text-blue-600 transition duration-200"
              />
            </div>
            {openDropdowns.dashboard && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to={`/admin/${user?.name}`}
                    className="flex items-center space-x-2 hover:text-gray-900 transition duration-200 p-2 rounded-lg"
                    onClick={handleOptionClick} // Close sidebar on click
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Dashboard</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* HR Section */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("HR")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="text-blue-600 group-hover:text-blue-600 transition duration-200"
                />
                <span className="group-hover:text-blue-600 transition duration-200">HR</span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.HR ? faChevronDown : faChevronRight}
                className="text-gray-900 group-hover:text-blue-600 transition duration-200"
              />
            </div>
            {openDropdowns.HR && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/departments"
                    className="flex items-center space-x-2 hover:text-gray-900 transition duration-200 p-2 rounded-lg"
                    onClick={handleOptionClick} // Close sidebar on click
                  >
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>Departments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff"
                    className="flex items-center space-x-2 hover:text-gray-900 transition duration-200 p-2 rounded-lg"
                    onClick={handleOptionClick} // Close sidebar on click
                  >
                    <FontAwesomeIcon icon={faUserTie} />
                    <span>Staff</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Product Section */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("product")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-blue-600 group-hover:text-blue-600 transition duration-200"
                />
                <span className="group-hover:text-blue-600 transition duration-200">Product</span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.product ? faChevronDown : faChevronRight}
                className="text-gray-600 group-hover:text-black-900 transition duration-200"
              />
            </div>
            {openDropdowns.product && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/products"
                    className="flex items-center space-x-2 hover:text-gray-900 transition duration-200 p-2 rounded-lg"
                    onClick={handleOptionClick} // Close sidebar on click
                  >
                    <FontAwesomeIcon icon={faBoxOpen} />
                    <span>Product List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Sales Section */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("sales")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faScaleBalanced}
                  className="text-blue-600 group-hover:text-blue-600 transition duration-200"
                />
                <span className="group-hover:text-blue-600 transition duration-200">Sales</span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.sales ? faChevronDown : faChevronRight}
                className="text-gray-900 group-hover:text-blue-600 transition duration-200"
              />
            </div>
            {openDropdowns.sales && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/leads"
                    className="flex items-center space-x-2 hover:text-gray-900 transition duration-200 p-2 rounded-lg"
                    onClick={handleOptionClick} // Close sidebar on click
                  >
                    <FontAwesomeIcon icon={faSackDollar} />
                    <span>Leads</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
