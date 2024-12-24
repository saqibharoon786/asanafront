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

const SalesSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);  
  const [isHROpen, setIsHROpen] = useState(false); 
  const [isSalesOpen, setIsSalesOpen] = useState(false);  
  const [isProductOpen, setIsProductOpen] = useState(false); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle logic for opening only the clicked section
  const toggleDropdown = (section) => {
    if (section === "dashboard") {
      setIsDashboardOpen(!isDashboardOpen);
      setIsHROpen(false); 
      setIsSalesOpen(false);
      setIsProductOpen(false);
    }
  
    if (section === "product") {
      setIsProductOpen(!isProductOpen);
      setIsDashboardOpen(false); 
      setIsHROpen(false); 
      setIsSalesOpen(false);
    }
    if (section === "sales") {
      setIsSalesOpen(!isSalesOpen);
      setIsDashboardOpen(false); 
      setIsHROpen(false); 
      setIsProductOpen(false);  
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
                    to={`/sales/${user?.name}`}
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    📈 Analytics Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/insights"
                    className="block py-2 text-black hover:text-gray-700"
                  >
                    🔍 Insights
                  </Link>
                </li> */}
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
                    to="/sales/products"
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
                {/* <li>
                  <Link
                    to="/customers"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaUsers className="mr-2 transform transition-transform hover:scale-110 text-red-500" />
                    Customers
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/sales/leads"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaBullhorn className="mr-2 transform transition-transform hover:scale-110 text-yellow-500" />
                    Leads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/quote-panel"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-blue-500" />
                    Quotes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/invoice-panel"
                    className="block py-2 text-black hover:text-gray-700 flex items-center gap-2"
                  >
                    <FaFileInvoice className="mr-2 transform transition-transform hover:scale-110 text-gray-500" />
                     Invoices
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

export default SalesSideBar;
