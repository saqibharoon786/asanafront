import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faAddressBook, faPhone, faBuilding, faTag, faGlobe, faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons';

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
        console.error("Error fetching leads:", error.response ? error.response.data : error.message);
        alert("Error fetching leads: " + (error.response ? error.response.data : error.message));
      }
    };

    fetchLeads();
  }, [leads]);

  const handleAddOptionalData = (leadId) => {
    navigate(`/sales/optional-data-lead/${leadId}`);
  };

  const handleViewLeadDetails = (leadId) => {
    navigate(`/sales/lead-detail/${leadId}`);
  };

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
      const response = await axios.post(`${API_URL}/lead/create-lead`, data, {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`,
        },
      });

      console.log(response);
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
            <button className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700" onClick={() => setShowForm(true)}>+ Lead</button>
            <button className="p-2 border rounded-md text-gray-700 hover:bg-gray-200">
              <FontAwesomeIcon icon={faSlidersH} className="h-5 w-5" />
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
                  <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600" onClick={() => handleAddOptionalData(lead._id)}>Add Optional Data</button>
                  <button className="px-2 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600" onClick={() => handleViewLeadDetails(lead._id)}>View Details</button>
                </td>
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
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Input fields with icons */}
              {/* Client Name */}
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} />
                <input id="clientName" type="text" value={formData.clientName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Client Name" />
              </div>
              {/* Client Email */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faEnvelope} />
                <input id="clientEmail" type="email" value={formData.clientEmail} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Client Email" />
              </div>
              {/* Client Address */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faAddressBook} />
                <input id="clientAddress" type="text" value={formData.clientAddress} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Client Address" />
              </div>
              {/* Client Contact */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input id="clientContact" type="text" value={formData.clientContact} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Client Contact Number" />
              </div>
              {/* Organization */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faBuilding} />
                <input id="organization" type="text" value={formData.organization} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Organization" />
              </div>
              {/* Title */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faTag} />
                <input id="title" type="text" value={formData.title} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required placeholder="Title" />
              </div>
              {/* Source Selection */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faGlobe} />
                <select id="source" value={formData.source} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500" required>
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
   
              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPanelLeads;
