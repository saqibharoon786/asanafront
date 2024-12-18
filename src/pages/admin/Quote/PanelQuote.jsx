import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PanelQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalQuotes, setTotalQuotes] = useState(0);

  const navigate = useNavigate();

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Navigate to Add New Quote Page
  const handleNewQuote = () => {
    navigate("/addNewQuote");
  };

  // Fetch Quotes from Backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quote/get-quotes", {
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
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAcceptQuote = async (quote_Id) => {
    try {
      await axios.patch(
        `http://localhost:3000/quote/accept/${quote_Id}`,
        {}, 
        { headers: { Authorization: `Bearer ${jwtLoginToken}` }}
      );
      console.log("Quote accepted successfully.");
    } catch (error) {
      console.error("Error accepting quote:", error);
    }
  };

  const handleDeleteQuote = async (quote_Id) => {
    try {
      await axios.delete(
        `http://localhost:3000/quote/delete/${quote_Id}`,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` }}
      );

      console.log("Quote soft-deleted successfully.");
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
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-800 tracking-wide drop-shadow-md">
            Quotes Dashboard
          </h1>
          <button
            onClick={handleNewQuote}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Quote
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700">Total Quotes</h2>
            <p className="text-5xl font-extrabold text-blue-600 mt-3">{totalQuotes}</p>
          </div>
        </div>

        {totalQuotes === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-xl font-semibold text-red-500 text-center">
              No quotes added yet.
            </p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search for quotes..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {totalQuotes > 0 && filteredQuotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote) => (
              <div key={quote._id} className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      Client: {quote.quote_Client?.name || "Unknown"}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      Status: {quote.quote_Details?.status || "Pending"}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      Original Amount: ${quote.quote_TotalPrice ?? "N/A"}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteQuote(quote._id)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700 shadow-lg rounded-full transition-all transform hover:scale-110"
                  >
                    🗑️
                  </button>
                </div>

                <button
                  onClick={() => handleViewReport(quote._id)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Report
                </button>

                <button
                  onClick={() => handleAcceptQuote(quote._id)}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">No quotes found.</p>
        )}
      </div>
    </div>
  );
};

export default PanelQuote;
