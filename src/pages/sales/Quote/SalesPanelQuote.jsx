import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesPanelQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalQuotes, setTotalQuotes] = useState(0);

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  const handleNewQuote = () => {
    navigate("/sales-Add-New-Quote");
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sales/quote/get-quotes", {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data?.success) {
          const quoteData = response.data.information?.quotes || [];
          setQuotes(quoteData);
          setTotalQuotes(quoteData.length);
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
  }, [jwtLoginToken]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAcceptQuote = async (quote_Id) => {
    try {
      await axios.patch(
        `http://localhost:3000/quote/accept/${quote_Id}`,
        {},
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );
    } catch (error) {
      console.error("Error accepting quote:", error);
    }
  };

  const handleDeleteQuote = async (quote_Id) => {
    try {
      await axios.delete(
        `http://localhost:3000/quote/delete/${quote_Id}`,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      setQuotes((prevQuotes) =>
        prevQuotes.filter((quote) => quote._id !== quote_Id)
      );
      setTotalQuotes((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error soft-deleting quote:", error);
    }
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter(
      (quote) =>
        quote.deleted !== true &&
        quote.quote_Client?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, quotes]);

  const handleViewReport = (quoteId) => {
    navigate(`/view-quote/${quoteId}`);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Fetching quotes... Please wait.
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
      <div className="p-4 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-800 tracking-wide drop-shadow-md text-center sm:text-left">
            Quotes Dashboard
          </h1>
          <button
            onClick={handleNewQuote}
            className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Quote
          </button>
        </div>

        {/* Total Quotes Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
              Total Quotes
            </h2>
            <p className="text-4xl sm:text-5xl font-extrabold text-blue-600 mt-3">
              {totalQuotes}
            </p>
          </div>
        </div>

        {totalQuotes === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-lg sm:text-xl font-semibold text-red-500 text-center">
              No quotes added yet.
            </p>
          </div>
        )}

        {/* Search Input */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search for quotes..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quotes Display */}
        {totalQuotes > 0 && filteredQuotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredQuotes.map((quote) => (
              <div
                key={quote._id}
                className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">
                    Client: {quote.quote_Client?.name || "Unknown"}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-600 mb-2">
                    Status: {quote.quote_Details?.status || "Pending"}
                  </p>
                  <p className="text-sm sm:text-lg text-gray-600 mb-2">
                    Original Amount: ADE {quote.quote_TotalPrice ?? "N/A"}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleViewReport(quote._id)}
                    className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Report
                  </button>
                  <button
                    onClick={() => handleAcceptQuote(quote._id)}
                    className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeleteQuote(quote._id)}
                    className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg sm:text-xl text-gray-600 text-center">
            No quotes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesPanelQuote;
