import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCheck, FaTrashAlt } from "react-icons/fa";

const API_SALES_URL = process.env.REACT_APP_API_SALES_URL;

const SalesPanelQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalQuotes, setTotalQuotes] = useState(0);

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Navigate to Add New Quote Page
  const handleNewQuote = () => {
    navigate("/sales/add-quote");
  };

  // Fetch Quotes from Backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`${API_SALES_URL}/quote/get-quotes`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          setQuotes(response.data.information.quotes); // Show all quotes
          setTotalQuotes(response.data.information.quotes.length);
        } else {
          setError("Failed to load quotes. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setError("Failed to load quotes. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [quotes]); // Empty dependency array ensures this runs only once when the component mounts

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteQuote = async (quoteId) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      try {
        const response = await axios.delete(
          `${API_SALES_URL}/quote/delete/${quoteId}`,
          {
            data: { quote_Identifier: quoteId },
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        if (response.status === 200) {
          setQuotes((prevQuotes) =>
            prevQuotes.filter((quote) => quote._id !== quoteId)
          );
          alert("Quote deleted successfully.");
        } else {
          throw new Error(response.data.message || "Failed to delete the quote.");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again later.";
        alert(errorMessage);
      }
    }
  };

  const handleApproveQuote = async (quoteId) => {
    if (window.confirm("Are you sure you want to approve this quote?")) {
      try {
        const response = await axios.patch(
          `${API_SALES_URL}/quote/approve/${quoteId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );        

        if (response.status === 200) {
          setQuotes((prevQuotes) =>
            prevQuotes.filter((quote) => quote._id !== quoteId)
          );
          alert("Quote Approved successfully.");
        } else {
          throw new Error(response.data.message || "Failed to approve the quote.");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again later.";
        alert(errorMessage);
      }
    }
  };

  // Navigate to View Quote Page
  const handleViewQuote = (quoteId) => {
    console.log(quoteId);
    navigate(`/sales/view-quote/${quoteId}`);
  };

  // Determine the background color based on the quote's status
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-white";
      case "Approved":
        return "bg-green-100"; 
      case "Rejected":
        return "bg-red-100"; 
      default:
        return "bg-white";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Quotes Dashboard</h1>
        <button
          onClick={handleNewQuote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add New Quote
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Total Quotes</div>
          <div className="text-2xl font-bold text-blue-600">{totalQuotes}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="Search for quotes..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-gray-600 text-lg">Loading quotes...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : totalQuotes === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-red-500 text-center font-medium">No quotes available.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Quote Identifier</th>
                <th className="py-2 px-4 border">Created By</th>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Total Price</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length > 0 ? (
                quotes.map((quote) => (
                  <tr
                    key={quote._id}
                    className={`border-t ${getStatusClass(quote.quote_Details?.status)}`}
                  >
                    <td className="py-2 px-4">{quote.quote_Identifier || "Unknown"}</td>
                    <td className="py-2 px-4">{quote.quote_Creater?.name || "N/A"}</td>
                    <td className="py-2 px-4">{quote.quote_Client?.client_Name|| "Unknown"}</td>
                    <td className="py-2 px-4">{quote.quote_TotalPrice || "N/A"}</td>
                    <td className="py-2 px-4">{quote.quote_Details?.status || "N/A"}</td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 flex items-center gap-1"
                        onClick={() => handleApproveQuote(quote._id)}
                      >
                        <FaCheck /> Approve
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-red-500 flex items-center gap-1"
                        onClick={() => handleDeleteQuote(quote._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 flex items-center gap-1"
                        onClick={() => handleViewQuote(quote._id)}
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No quotes found matching your search.
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

export default SalesPanelQuotes;
