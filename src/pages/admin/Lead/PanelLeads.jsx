import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const PanelLeads = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientContact: "",
    organization: "",
    title: "",
    source: "",
  });
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Check if the JWT token exists
  if (!jwtLoginToken) {
    alert("Unauthorized, please log in.");
    return null; // Optionally, redirect user to login page here
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
      lead_Client: {
        client_Name: formData.clientName,
        client_Email: formData.clientEmail,
        client_Address: formData.clientAddress,
        client_Contact: formData.clientContact,
      },
      lead_Organization: formData.organization,
      lead_Title: formData.title,
      lead_Source: formData.source,
    };

    try {
      // Log the token to debug
      console.log("JWT Token: ", jwtLoginToken);

      const response = await axios.post(
        "http://localhost:3000/lead/create-lead",
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );

      console.log(response);
      alert("Form submitted successfully");
      setShowForm(false);
    } catch (error) {
      // Log the error details for debugging
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error submitting form: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Leads</h2>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              + Lead
            </button>
            <button className="p-2 border rounded-md text-gray-700 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Next Activity</th>
              <th className="p-3">Labels</th>
              <th className="p-3">Source Origin</th>
              <th className="p-3">Lead Created</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">
                <div className="flex items-center text-yellow-500 space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M21 12c0 4.418-3.582 8-8 8S5 16.418 5 12s3.582-8 8-8 8 3.582 8 8z"
                    />
                  </svg>
                  <span>No activity</span>
                </div>
              </td>
              <td className="p-3">-</td>
              <td className="p-3">Manually created</td>
              <td className="p-3">Jan 7, 2025, 2:01 AM</td>
              <td className="p-3">Umer Khayam</td>
              <td className="p-3 text-right">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded-md w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Lead</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block font-medium text-gray-700">
                    Client Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="clientName"
                      placeholder="&#128100; Enter client's name"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="clientEmail" className="block font-medium text-gray-700">
                    Client Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="clientEmail"
                      placeholder="&#128231; Enter client's email"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="clientAddress" className="block font-medium text-gray-700">
                    Client Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="clientAddress"
                      placeholder="&#127968; Enter client's address"
                      value={formData.clientAddress}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="clientContact" className="block font-medium text-gray-700">
                    Client Contact
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="clientContact"
                      placeholder="&#128222; Enter client's contact"
                      value={formData.clientContact}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="organization" className="block font-medium text-gray-700">
                    Organization
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="organization"
                      placeholder="&#128188; Enter organization name"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className="block font-medium text-gray-700">
                    Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      placeholder="&#128221; Enter title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="source" className="block font-medium text-gray-700">
                    Source
                  </label>
                  <select
                    id="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Source</option>
                    <option value="Prospector">Prospector</option>
                    <option value="Lead Suggestions">Lead Suggestions</option>
                    <option value="Web Forms">Web Forms</option>
                    <option value="Chatbot">Chatbot</option>
                    <option value="Live Chat">Live Chat</option>
                    <option value="Web Visitors">Web Visitors</option>
                    <option value="Campaigns">Campaigns</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="Messaging Inbox">Messaging Inbox</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md hover:bg-gray-200"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelLeads;
