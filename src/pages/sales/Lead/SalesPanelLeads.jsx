import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SalesPanelLeads = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${API_URL}/lead/all-leads`, {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        });
        setLeads(response.data.information.allLeads);
      } catch (error) {
        console.error(
          "Error fetching leads:",
          error.response ? error.response.data : error.message
        );
        alert(
          "Error fetching leads: " +
            (error.response ? error.response.data : error.message)
        );
      }
    };

    fetchLeads();
  }, [leads]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
      lead_Client: {
        client_Name: formData.clientName,
        client_Email: formData.clientEmail,
        client_Address: formData.clientAddress,
        client_Contact: parseInt(formData.clientContact),
      },
      lead_Organization: formData.organization,
      lead_Title: formData.title,
      lead_Source: formData.source,
    };

    try {
      await axios.post(`${API_URL}/lead/create-lead`, data, {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`,
        },
      });

      alert("Form submitted successfully");
      setShowForm(false);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error submitting form: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
          <button
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            + Lead
          </button>
        </div>

        {/* Leads Table */}
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="p-3">Lead Creator</th>
              <th className="p-3">Title</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Label</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr className="border-b hover:bg-gray-100" key={lead._id}>
                <td className="p-3">{lead.lead_CreaterName}</td>
                <td className="p-3">{lead.lead_Title}</td>
                <td className="p-3">{lead.lead_Organization}</td>
                <td className="p-3">{lead.lead_Label}</td>
                <td className="p-3 flex space-x-2">
                  <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                    Add Optional Data
                  </button>
                  <button className="px-2 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            className="bg-white shadow-lg rounded-md w-full max-w-md p-4"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Lead</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
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
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {[
                {
                  id: "clientName",
                  label: "Client Name",
                  icon: "fa-user",
                  type: "text",
                },
                {
                  id: "clientEmail",
                  label: "Client Email",
                  icon: "fa-envelope",
                  type: "email",
                },
                {
                  id: "clientAddress",
                  label: "Client Address",
                  icon: "fa-map-marker-alt",
                  type: "text",
                },
                {
                  id: "clientContact",
                  label: "Client Contact",
                  icon: "fa-phone",
                  type: "text",
                },
                {
                  id: "organization",
                  label: "Organization",
                  icon: "fa-building",
                  type: "text",
                },
                {
                  id: "title",
                  label: "Title",
                  icon: "fa-briefcase",
                  type: "text",
                },
              ].map(({ id, label, icon, type }) => (
                <div key={id} className="relative">
                  <label
                    htmlFor={id}
                    className="block text-sm text-gray-700 font-medium mb-1"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <i
                      className={`fas ${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}
                    ></i>
                    <input
                      id={id}
                      type={type}
                      value={formData[id]}
                      onChange={handleInputChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              ))}
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm text-gray-700 font-medium mb-1"
                >
                  Source
                </label>
                <select
                  id="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-sm text-white rounded-md hover:bg-green-700"
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

export default SalesPanelLeads;
