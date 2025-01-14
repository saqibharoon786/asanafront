import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaDollarSign, FaTrashAlt } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;

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

const PanelInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [timeFilter, setTimeFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  const handleNewInvoice = () => {
    navigate('/add-invoice');
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoice/get-invoices`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          let filteredInvoices = response.data.information.Invoices;

          if (timeFilter !== "All") {
            const now = new Date();
            filteredInvoices = filteredInvoices.filter((invoice) => {
              const invoiceDate = new Date(invoice.createdAt);
              const timeDifference = now - invoiceDate;
              switch (timeFilter) {
                case "Day":
                  return timeDifference <= 24 * 60 * 60 * 1000;
                case "Week":
                  return timeDifference <= 7 * 24 * 60 * 60 * 1000;
                case "Month":
                  return timeDifference <= 30 * 24 * 60 * 60 * 1000;
                default:
                  return true;
              }
            });
          }

          setInvoices(filteredInvoices);
          setTotalInvoices(filteredInvoices.length);
        } else {
          setError("No Invoices Available.");
        }
      } catch (err) {
        setError("No Invoices Available.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [invoices]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteInvoice = (invoiceId) => {
    setModalTitle("Delete Invoice");
    setModalMessage("Are you sure you want to delete this invoice?");
    setModalAction(() => async () => {
      setIsModalOpen(false);
      try {
        const response = await axios.delete(
          `${API_URL}/invoice/delete/${invoiceId}`,
          {
            headers: { Authorization: `Bearer ${jwtLoginToken}` },
            data: { invoice_Identifier: invoiceId },
          }
        );

        if (response.status === 200) {
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice._id !== invoiceId)
          );

        }
      } catch (error) {
        setModalMessage("Failed to delete the invoice. Please try again.");
        setModalAction(null);
        setIsModalOpen(true);
      }
    });
    setIsModalOpen(true);
  };

  const handlePaidInvoice = (invoiceId) => {
    setModalTitle("Mark as Paid");
    setModalMessage("Are you sure you want to mark this invoice as paid?");
    setModalAction(() => async () => {
      setIsModalOpen(false);
      try {
        const response = await axios.patch(
          `${API_URL}/invoice/set-paid/${invoiceId}`,
          {},
          { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
        );

        if (response.status === 200) {
          setInvoices((prevInvoices) =>
            prevInvoices.filter((invoice) => invoice._id !== invoiceId)
          );

        }
      } catch (error) {
        setModalMessage("Failed to mark the invoice as paid. Please try again.");
        setModalAction(null);
        setIsModalOpen(true);
      }
    });
    setIsModalOpen(true);
  };

  const handleViewInvoice = (invoiceId) => {
    navigate(`/view-invoice/${invoiceId}`);
  };

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
              <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Invoice Identifier</th>
                <th className="py-2 px-4 border">Created By</th>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Total Price</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className={`border-t ${getStatusClass(invoice.invoice_Details?.status)}`}
                >
                  <td className="py-2 px-4">
                      {invoice.createdAt
                        ? new Date(invoice.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                  <td className="py-2 px-4">{invoice.invoice_Identifier || "Unknown"}</td>
                  <td className="py-2 px-4">{invoice.invoice_Creater?.name || "N/A"}</td>
                  <td className="py-2 px-4">{invoice.invoice_Client?.client_Name || "Unknown"}</td>
                  <td className="py-2 px-4">{invoice.invoice_TotalPrice || "N/A"}</td>
                  <td className="py-2 px-4">{invoice.invoice_Details?.status || "N/A"}</td>
                  <td className="py-2 px-4 space-x-2">
                  <div className="flex items-center space-x-4">
  <button
    className="text-blue-500 flex items-center gap-1"
    onClick={() => handlePaidInvoice(invoice._id)}
  >
    <FaDollarSign /> Paid
  </button>
  <button
    className="text-red-500 flex items-center gap-1"
    onClick={() => handleDeleteInvoice(invoice._id)}
  >
    <FaTrashAlt /> Delete
  </button>
  <button
    className="text-blue-500 flex items-center gap-1"
    onClick={() => handleViewInvoice(invoice._id)}
  >
    <FaEye /> View
  </button>
</div>
                  </td>
                </tr>
              ))}
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

export default PanelInvoices;
