import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaDollarSign, FaTrashAlt } from "react-icons/fa";

const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const PanelInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [timeFilter, setTimeFilter] = useState("All"); // New state for time filter

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Define the handleNewInvoice function
  const handleNewInvoice = () => {
    navigate('/add-invoice'); // Adjust the path as needed
  };

  // Handle Time Filter Change
  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  // Fetch Invoices from Backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_ADMIN_URL}/invoice/get-invoices`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          let filteredInvoices = response.data.information.Invoices;

          // Apply time filter logic
          if (timeFilter !== "All") {
            const now = new Date();
            filteredInvoices = filteredInvoices.filter((invoice) => {
              const invoiceDate = new Date(invoice.createdAt);
              const timeDifference = now - invoiceDate;
              switch (timeFilter) {
                case "Day":
                  return timeDifference <= 24 * 60 * 60 * 1000; // 1 day
                case "Week":
                  return timeDifference <= 7 * 24 * 60 * 60 * 1000; // 1 week
                case "Month":
                  return timeDifference <= 30 * 24 * 60 * 60 * 1000; // 1 month
                default:
                  return true; // No filter
              }
            });
          }

          setInvoices(filteredInvoices);
          setTotalInvoices(filteredInvoices.length);
        } else {
          setError("Failed to load invoices. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError("Failed to load invoices. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [timeFilter, jwtLoginToken]); // Re-fetch invoices when time filter changes

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await axios.delete(
          `${API_ADMIN_URL}/invoice/delete/${invoiceId}`, // URL
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
            data: { invoice_Identifier: invoiceId }, // Move data into the second argument
          }
        );
  
        if (response.status === 200) {
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice._id !== invoiceId)
          );
          alert("Invoice deleted successfully.");
        } else {
          throw new Error(response.data.message || "Failed to delete the invoice.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again later.";
        console.error("Delete Invoice Error:", error); // Log the error for debugging
        alert(errorMessage);
      }
    }
  };
  

  const handlePaidInvoice = async (invoiceId) => {
    if (window.confirm("Are you sure you want to mark this invoice as paid?")) {
      try {
        const response = await axios.patch(
          `${API_ADMIN_URL}/invoice/set-paid/${invoiceId}`,
          {}, // No request body needed here
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice._id !== invoiceId)
          );
          alert(`Invoice marked as paid successfully.`);
        } else {
          throw new Error(response.data.message || "Failed to mark invoice as paid.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred. Please try again later.";
        alert(`Error: ${errorMessage}`);
      }
    }
  };
  
  // Navigate to View Invoice Page
  const handleViewInvoice = (invoiceId) => {
    navigate(`/view-invoice/${invoiceId}`);
  };

  // Determine the background color based on the invoice's status
  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100";
      case "Unpaid":
        return "bg-red-100";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Invoices Dashboard</h1>
        <button
          onClick={handleNewInvoice}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add New Invoice
        </button>
      </div>

      <div className="mb-6">
        <select
          value={timeFilter}
          onChange={handleTimeFilterChange}
          className="bg-white border border-gray-300 rounded-lg p-2"
        >
          <option value="All">All</option>
          <option value="Day">Last 24 Hours</option>
          <option value="Week">Last Week</option>
          <option value="Month">Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Total Invoices</div>
          <div className="text-2xl font-bold text-blue-600">{totalInvoices}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="Search for invoices..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-gray-600 text-lg">Loading invoices...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : totalInvoices === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-red-500 text-center font-medium">No invoices available.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Invoice Identifier</th>
                <th className="py-2 px-4 border">Created By</th>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Total Price</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className={`border-t ${getStatusClass(invoice.invoice_Details?.status)}`}
                  >
                    <td className="py-2 px-4">{invoice.invoice_Identifier || "Unknown"}</td>
                    <td className="py-2 px-4">{invoice.invoice_Creater?.name || "N/A"}</td>
                    <td className="py-2 px-4">{invoice.invoice_Client?.client_Name || "Unknown"}</td>
                    <td className="py-2 px-4">{invoice.invoice_TotalPrice || "N/A"}</td>
                    <td className="py-2 px-4">{invoice.invoice_Details?.status || "N/A"}</td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 flex items-center gap-1"
                        onClick={() => handlePaidInvoice(invoice._id)}
                      >
                        <FaDollarSign /> Paid
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-red-500 flex items-center gap-1"
                        onClick={() => handleDeleteInvoice(invoice._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 flex items-center gap-1"
                        onClick={() => handleViewInvoice(invoice._id)}
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No invoices found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PanelInvoices;
