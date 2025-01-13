import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronDown,
  faChevronRight,
  faHouse,
  faUserShield,
  faBuilding,
  faUserTie,
  faMoneyCheckDollar,
  faClipboardList,
  faReceipt,
  faCalendarAlt,
  faBoxOpen,
  faTruckLoading,
  faFileInvoiceDollar,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../../assets/images/CompanyLogo.jpg";

const SalesSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const [activeItem, setActiveItem] = useState(null); // Track the currently active item
  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    product: false,
    sales: false,
  });

  const toggleDropdown = (section) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleOptionClick = (item) => {
    setActiveItem(item); // Update the active item
    if (isSidebarOpen) toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"
      }`}
    >
      <div className="mt-4 overflow-y-auto h-[calc(100vh-6rem)]">
        <ul className="text-gray-800">
          {/* Dashboard */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("dashboard")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-gray-900 group-hover:text-gray-900 transition duration-200"
                />
                <span className="group-hover:text-gray-900 transition duration-200">
                  Home
                </span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.dashboard ? faChevronDown : faChevronRight}
                className="text-gray-900 group-hover:text-gray-900 transition duration-200"
              />
            </div>
            {openDropdowns.dashboard && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to={`/sales/${user?.name}`}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "dashboard"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("dashboard")}
                  >
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Dashboard</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Purchases */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("product")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-gray-900 group-hover:text-gray-900 transition duration-200"
                />
                <span className="group-hover:text-gray-900 transition duration-200">
                  Purchases
                </span>
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
                    to="/sales/products"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "products"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("products")}
                  >
                    <FontAwesomeIcon icon={faBoxOpen} />
                    <span>Inventory</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/vendor"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "vendor"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("vendor")}
                  >
                    <FontAwesomeIcon icon={faTruckLoading} />
                    <span>Vendor</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/expenses"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "expenses"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("expenses")}
                  >
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    <span>Expenses</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/bills"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "bills"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("bills")}
                  >
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>Bills</span>
                  </Link>
                </li> */}
              </ul>
            )}
          </li>

          {/* Sales */}
          <li>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100 rounded-lg transition duration-200"
              onClick={() => toggleDropdown("sales")}
            >
              <div className="flex items-center space-x-2 group">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="text-gray-900 group-hover:text-gray-900 transition duration-200"
                />
                <span className="group-hover:text-gray-900 transition duration-200">
                  Sales
                </span>
              </div>
              <FontAwesomeIcon
                icon={openDropdowns.sales ? faChevronDown : faChevronRight}
                className="text-gray-900 group-hover:text-gray-900 transition duration-200"
              />
            </div>
            {openDropdowns.sales && (
              <ul className="ml-6 mt-2 space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/sales/customers"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "customers"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("customers")}
                  >
                    <FontAwesomeIcon icon={faClipboardList} />
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/leads"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "leads"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("leads")}
                  >
                    <FontAwesomeIcon icon={faClipboardList} />
                    <span>Leads</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/quotes"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "quotes"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("quotes")}
                  >
                    <FontAwesomeIcon icon={faClipboardList} />
                    <span>Quotes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/invoices"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "invoices"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("invoices")}
                  >
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>Invoices</span>
                  </Link> 
                </li>
                <li>
                  <Link
                    to="/sales/calender"
                    className={`flex items-center space-x-2 p-2 rounded-lg transition duration-200 ${
                      activeItem === "calender"
                        ? "bg-blue-500 text-white"
                        : "hover:text-gray-900"
                    }`}
                    onClick={() => handleOptionClick("calender")}
                  >
                    <FontAwesomeIcon icon={faReceipt} />
                    <span>Calender</span>
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

export default SalesSidebar;
