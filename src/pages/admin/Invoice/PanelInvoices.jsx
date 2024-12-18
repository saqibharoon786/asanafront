import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PanelInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalInvoices, setTotalInvoices] = useState(0);

  const navigate = useNavigate();

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Navigate to Add New Invoice Page
  const handleNewInvoice = () => {
    navigate("/addNewInvoice");
  };

  // Fetch Invoices from Backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoice/get-invoices", {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });
        console.log("response is ", response);
        
        if (response.data?.success) {
          // Ensure the correct access to invoices from response
          const invoiceData = response.data?.information?.Invoice || [];
          setInvoices(invoiceData);
          setTotalInvoices(invoiceData.length);
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
  }, [jwtLoginToken]);

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteInvoice = async (invoice_Id) => {
    try {
      await axios.delete(
        `http://localhost:3000/invoice/delete/${invoice_Id}`,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      console.log("Invoice soft-deleted successfully.");
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== invoice_Id)
      );
      setTotalInvoices((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error soft-deleting invoice:", error);
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.deleted !== true &&
        invoice.invoice_Client?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, invoices]);

  const handleViewReport = (invoiceId) => {
    navigate(`/view-invoice/${invoiceId}`);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Fetching invoices... Please wait.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-800 tracking-wide drop-shadow-md">
            Invoices Dashboard
          </h1>
          <button
            onClick={handleNewInvoice}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700">Total Invoices</h2>
            <p className="text-5xl font-extrabold text-blue-600 mt-3">{totalInvoices}</p>
          </div>
        </div>

        {totalInvoices === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-xl font-semibold text-red-500 text-center">
              No invoices added yet.
            </p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search for invoices..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {totalInvoices > 0 && filteredInvoices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice) => (
              <div key={invoice._id} className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      Client: {invoice.invoice_Client?.name || "Unknown"}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      Status: {invoice.invoice_Details?.status || "Pending"}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      Original Amount: ${invoice.invoice_TotalPrice ?? "N/A"}
                    </p>
                    {/* Displaying Discounted Amount if present */}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteInvoice(invoice._id)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700 shadow-lg rounded-full transition-all transform hover:scale-110"
                  >
                    🗑️
                  </button>
                </div>

                <button
                  onClick={() => handleViewReport(invoice._id)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Report
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default PanelInvoices;
