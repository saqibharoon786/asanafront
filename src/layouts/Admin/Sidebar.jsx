import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,   // Dashboard icon
  FaUsers,           // HR icon
  FaBuilding,        // Department icon
  FaProjectDiagram,  // Project icon
  FaBullhorn,        // Sales icon
  FaUserFriends,     // Staff icon
  FaFileInvoice,     // Invoice icon
  FaBox,             // Product icon
} from "react-icons/fa";
import companyLogo from "../../assets/images/CompanyLogo.jpg";  // Ensure the path is correct

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);  // Start with Dashboard closed
  const [isHROpen, setIsHROpen] = useState(false);  // Separate state for HR
  const [isSalesOpen, setIsSalesOpen] = useState(false);  // Separate state for Sales
  const [isProductOpen, setIsProductOpen] = useState(false);  // State for Product

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle logic for opening only the clicked section
  const toggleDropdown = (section) => {
    if (section === "dashboard") {
      setIsDashboardOpen(!isDashboardOpen);
      setIsHROpen(false);  // Close HR section if it's open
      setIsSalesOpen(false);  // Close Sales section if it's open
      setIsProductOpen(false);  // Close Product section if it's open
    }
    if (section === "HR") {
      setIsHROpen(!isHROpen);  // Open/close HR section
      setIsDashboardOpen(false);  // Close Dashboard section if it's open
      setIsSalesOpen(false);  // Close Sales section if it's open
      setIsProductOpen(false);  // Close Product section if it's open
    }
    if (section === "product") {
      setIsProductOpen(!isProductOpen);  // Open/close Product section
      setIsDashboardOpen(false);  // Close Dashboard section if it's open
      setIsHROpen(false);  // Close HR section if it's open
      setIsSalesOpen(false);  // Close Sales section if it's open
    }
    if (section === "sales") {
      setIsSalesOpen(!isSalesOpen);  // Open/close Sales section
      setIsDashboardOpen(false);  // Close Dashboard section if it's open
      setIsHROpen(false);  // Close HR section if it's open
      setIsProductOpen(false);  // Close Product section if it's open
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside>
        <div className="p-6 border-b rounded-t-lg flex items-center gap-4">
          {/* Company Logo */}
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Company Name */}
          <h1 className="text-s font-bold text-black">Alpha Capital Security Systems LLC</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2">
          {/* Dashboard Module */}
          <div>
            <button
              onClick={() => toggleDropdown("dashboard")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaTachometerAlt className="mr-2 transform transition-transform hover:scale-110" />
              <span>Dashboard</span>
              <span>{isDashboardOpen ? "▲" : "▼"}</span>
            </button>
            {isDashboardOpen && (
              <ul className="pl-8 mt-2">
                <li>
                  <Link
                    to={`/admin/${user?.name}`}
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📈 Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🔍 Insights
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* HR Section */}
          <div>
            <button
              onClick={() => toggleDropdown("HR")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaUsers className="mr-2 text-blue-500 transform transition-transform hover:scale-110" />
              <span>HR</span>
              <span>{isHROpen ? "▲" : "▼"}</span>
            </button>

            {isHROpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/departments"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaBuilding className="mr-2 transform transition-transform hover:scale-110 text-green-500" />
                    Departments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaUserFriends className="mr-2 transform transition-transform hover:scale-110 text-yellow-500" />
                    Staff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaProjectDiagram className="mr-2 transform transition-transform hover:scale-110 text-purple-500" />
                    Projects
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Product Section */}
          <div>
            <button
              onClick={() => toggleDropdown("product")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaBox className="mr-2 text-orange-500 transform transition-transform hover:scale-110" />
              <span>Product</span>
              <span>{isProductOpen ? "▲" : "▼"}</span>
            </button>

            {isProductOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/products"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaBox className="mr-2 transform transition-transform hover:scale-110 text-green-500" />
                    Product List
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Sales Module */}
          <div>
            <button
              onClick={() => toggleDropdown("sales")}
              className="w-full px-4 py-2 flex justify-between items-center text-black hover:bg-gray-200 rounded-md transition"
            >
              <FaBullhorn className="mr-2 transform transition-transform hover:scale-110 text-orange-500" />
              <span>Sales</span>
              <span>{isSalesOpen ? "▲" : "▼"}</span>
            </button>

            {isSalesOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/customers"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaUsers className="mr-2 transform transition-transform hover:scale-110 text-red-500" />
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-leads"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaBullhorn className="mr-2 transform transition-transform hover:scale-110 text-yellow-500" />
                    Leads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-Quote-Panel"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-blue-500" />
                    Quotes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/retainer-invoices"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-gray-500" />
                    Retainer Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-orders"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaBullhorn className="mr-2 transform transition-transform hover:scale-110 text-indigo-500" />
                    Sales Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/delivery-challans"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-teal-500" />
                    Delivery Challans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quotePanel"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-purple-500" />
                    Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/payment-received"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-pink-500" />
                    Payments Received
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recurring-invoices"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-yellow-500" />
                    Recurring Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/credit-notes"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-blue-600" />
                    Credit Notes
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </aside>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
