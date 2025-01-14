import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaCheck, FaTrashAlt } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

// Modal Component
const Modal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end mt-4 space-x-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const PanelQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalQuotes, setTotalQuotes] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  const handleNewQuote = () => {
    navigate("/add-quote");
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/quote/get-quotes`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          setQuotes(response.data.information.quotes);
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
  }, [quotes]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteQuote = (quoteId) => {
    setModalTitle("Delete Quote");
    setModalMessage("Are you sure you want to delete this quote?");
    setModalAction(() => async () => {
      setIsModalOpen(false);
      try {
        const response = await axios.delete(
          `${API_URL}/quote/delete/${quoteId}`,
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
        } else {
          throw new Error(
            response.data.message || "Failed to delete the quote."
          );
        }
      } catch (error) {
        console.error("Error deleting quote:", error);
      }
    });
    setIsModalOpen(true);
  };

  const handleApproveQuote = (quoteId) => {
    setModalTitle("Approve Quote");
    setModalMessage("Are you sure you want to approve this quote?");
    setModalAction(() => async () => {
      setIsModalOpen(false);
      try {
        const response = await axios.patch(
          `${API_URL}/quote/approve/${quoteId}`,
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
        } else {
          throw new Error(
            response.data.message || "Failed to approve the quote."
          );
        }
      } catch (error) {
        console.error("Error approving quote:", error);
      }
    });
    setIsModalOpen(true);
  };

  const handleViewQuote = (quoteId) => {
    navigate(`/view-quote/${quoteId}`);
  };

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
        <button
          onClick={handleNewQuote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add New Quote
        </button>
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
          <p className="text-red-500 text-center font-medium">
            No quotes available.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Quote Identifier</th>
                <th className="py-2 px-4 border">Created By</th>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Total Price</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length > 0 ? (
                quotes.map((quote) => (
                  <tr
                    key={quote._id}
                    className={`border-t ${getStatusClass(
                      quote.quote_Details?.status
                    )}`}
                  >
                    <td className="py-2 px-4">
                      {quote.createdAt
                        ? new Date(quote.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="py-2 px-4">
                      {quote.quote_Identifier || "Unknown"}
                    </td>
                    <td className="py-2 px-4">
                      {quote.quote_Creater?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {quote.quote_Client?.client_Name || "Unknown"}
                    </td>
                    <td className="py-2 px-4">
                      {quote.quote_TotalPrice || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {quote.quote_Details?.status || "N/A"}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="text-blue-500 flex items-center gap-1"
                        onClick={() => handleApproveQuote(quote._id)}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="text-red-500 flex items-center gap-1"
                        onClick={() => handleDeleteQuote(quote._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
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
                  <td colSpan="7" className="text-center py-4">
                    No quotes found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction}
      />
    </div>
  );
};

export default PanelQuote;
