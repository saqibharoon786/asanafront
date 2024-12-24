import React, { useState, useEffect } from "react";
import axios from "axios";

const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const PanelCustomer = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_ADMIN_URL}/quote/get-all-clients`);
        
        if (response.data.success) {
          setClients(response.data.clients);
        } else {
          setError("Failed to load client details. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load client details. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Clients Dashboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-gray-600 text-lg">Loading clients...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-red-500 text-center font-medium">No clients available.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{client.client_Name || "N/A"}</td>
                    <td className="py-2 px-4">{client.client_Email || "N/A"}</td>
                    <td className="py-2 px-4">{client.client_Contact || "N/A"}</td>
                    <td className="py-2 px-4">{client.client_Address || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No clients found.
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

export default PanelCustomer;
