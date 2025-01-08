import React, { useState, useEffect } from "react";
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
  const [leads, setLeads] = useState([]);
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Fetch all leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${API_URL}/lead/all-leads`, {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        });
        setLeads(response.data.information.allLeads); // Set leads data
      } catch (error) {
        console.error("Error fetching leads:", error.response ? error.response.data : error.message);
        alert("Error fetching leads: " + (error.response ? error.response.data : error.message));
      }
    };

    fetchLeads();
  }, [jwtLoginToken]); // Only run once on component mount

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
      lead_Client: {
        client_Name: formData.clientName,
        client_Email: formData.clientEmail,
        client_Address: formData.clientAddress,
        client_Contact: parseInt(formData.clientContact), // Ensure clientContact is a number
      },
      lead_Organization: formData.organization,
      lead_Title: formData.title,
      lead_Source: formData.source,
    };

    try {
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
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error submitting form: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
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
              <th className="p-3">Lead Creator</th>
              <th className="p-3">Title</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Label</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr className="border-b hover:bg-gray-100" key={lead._id}>
                <td className="p-3">{lead.lead_CreaterName}</td>
                <td className="p-3">{lead.lead_Title}</td>
                <td className="p-3">{lead.lead_Organization}</td>
                <td className="p-3">{lead.lead_Label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
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
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="clientName" className="block text-gray-700 font-medium">Client Name</label>
                <input
                  id="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="clientEmail" className="block text-gray-700 font-medium">Client Email</label>
                <input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="clientAddress" className="block text-gray-700 font-medium">Client Address</label>
                <input
                  id="clientAddress"
                  type="text"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="clientContact" className="block text-gray-700 font-medium">Client Contact</label>
                <input
                  id="clientContact"
                  type="text"
                  value={formData.clientContact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-gray-700 font-medium">Organization</label>
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
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
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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
