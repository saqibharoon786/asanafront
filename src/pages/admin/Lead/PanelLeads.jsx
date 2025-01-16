import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faEnvelope, faAddressBook, faPhone, faBuilding,
  faTag, faGlobe, faSlidersH, faTimes, faMapMarkerAlt,
  faFire
} from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL;

const PanelLeads = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "", clientEmail: "", clientAddress: "",
    clientContact: "", organization: "", leadScope: "",
    title: "", source: ""
  });

  const [leads, setLeads] = useState([]);
  const [salesEmployees, setSalesEmployees] = useState([]);
  const [showLeadTransferPopup, setShowLeadTransferPopup] = useState(false);
  const [transferUserId, setTransferUserId] = useState("");
  const [leadId, setLeadId] = useState("");

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const navigate = useNavigate();

  /** Fetch Sales Employees */
  const fetchSalesEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/department/get-sales-employees`, {
        headers: { Authorization: `Bearer ${jwtLoginToken}` },
      });
      if (response.data.success && response.data.information?.users) {
        setSalesEmployees(response.data.information.users);
      }
    } catch (err) {
      console.error("Error fetching sales employees:", err);
    }
  };

  /** Fetch Leads */
  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_URL}/lead/all-leads`, {
        headers: { Authorization: `Bearer ${jwtLoginToken}` },
      });
      setLeads(response.data.information.allLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []); // Fetch only once on component mount

  useEffect(() => {
    if (showLeadTransferPopup) {
      fetchSalesEmployees();
    }
  }, [showLeadTransferPopup]);

  /** Handle Lead Transfer */
  const handleLeadTransfer = async () => {
    if (!transferUserId) {
      alert("Please select a user.");
      return;
    }

    try {
      await axios.patch(
        `${API_URL}/lead/transfer-lead/${leadId}`,
        { receivedById: transferUserId },
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      alert("Lead successfully transferred!");
      setShowLeadTransferPopup(false);
      setTransferUserId("");
      fetchLeads(); // Refresh leads after transfer
    } catch (err) {
      console.error("Error during lead transfer:", err);
      alert(err.response?.data?.message || "Error transferring lead.");
    }
  };

  /** Handle Input Change */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /** Handle Form Submission */
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
      lead_Scope: formData.leadScope,
      lead_Title: formData.title,
      lead_Source: formData.source,
    };

    try {
      await axios.post(`${API_URL}/lead/create-lead`, data, {
        headers: { Authorization: `Bearer ${jwtLoginToken}` },
      });
      setShowForm(false);
      fetchLeads(); // Refresh leads after creation
    } catch (error) {
      alert(error.response?.data || "Error submitting form.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg">
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
              <th className="p-3">Created at</th>
              <th className="p-3">Lead Creator</th>
              <th className="p-3">Title</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Label</th>
              <th className="p-3">Transferred By</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="p-3">{lead.lead_CreaterName}</td>
                <td className="p-3">{lead.lead_Title}</td>
                <td className="p-3">{lead.lead_Organization}</td>
                <td className="p-3 flex items-center space-x-2">
                  {lead.lead_Label === "Hot" ? (
                    <FontAwesomeIcon icon={faFire} className="text-red-500 text-lg" />
                  ) : (
                    lead.lead_Label
                  )}
                </td>
                <td className="p-3">
                  {lead.lead_TransferredByUserName}
                </td>
                <td className="p-3">
                  {lead.lead_AssignedToUserName}
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    onClick={() => navigate(`/optional-data-lead/${lead._id}`)}
                  >
                    Add Optional Data
                  </button>
                  <button
                    className="px-2 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                    onClick={() => {
                      setShowLeadTransferPopup(true);
                      setLeadId(lead._id);
                    }}
                  >
                    Transfer Lead
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    View Details
                  </button>
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
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Input fields with icons */}
              {/* Client Name */}
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} />
                <input
                  id="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Name"
                />
              </div>
              {/* Client Email */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Email"
                />
              </div>
              {/* Client Address */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faAddressBook} />
                <input
                  id="clientAddress"
                  type="text"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Address"
                />
              </div>
              {/* Client Contact */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContact"
                  type="text"
                  value={formData.clientContact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Number"
                />
              </div>
              {/* Organization */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faBuilding} />
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Organization"
                />
              </div>
              {/* Lead Scope */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <input
                  id="leadScope"
                  type="text"
                  value={formData.leadScope}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Lead Scope"
                />
              </div>
              {/* Title */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faTag} />
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Title"
                />
              </div>
              {/* Source Selection */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faGlobe} />
                <select
                  id="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="Emails">Emails</option>
                  <option value="Calls">Calls</option>
                  <option value="Website Forms">Website Forms</option>
                  <option value="References">References</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-4">
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

      {/* Lead Transfer Popup */}
      {showLeadTransferPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-700">Transfer Lead</h3>
            <select
              className="w-full p-2 border rounded-md mt-4"
              value={transferUserId}
              onChange={(e) => setTransferUserId(e.target.value)}
            >
              <option value="">Select Sales Employee</option>
              {salesEmployees.map((employee) => (
                <option key={employee._id} value={employee.userId}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleLeadTransfer}>
              Transfer
            </button>
            <button className="mt-4 mx-5 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setShowLeadTransferPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelLeads;
