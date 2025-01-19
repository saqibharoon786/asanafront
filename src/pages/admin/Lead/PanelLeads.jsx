import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LeadFunnel } from "./components/LeadComponents";
import {
  faUser,
  faEnvelope,
  faAddressBook,
  faPhone,
  faBuilding,
  faTag,
  faGlobe,
  faTimes,
  faMapMarkerAlt,
  faFire,
  faSun,
  faSnowflake,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL;

const PanelLeads = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientContactPersonName: "",
    clientContactPersonEmail: "",
    clientContactPersonContact: "",
    organization: "",
    leadScope: "",
    contactPerson: "",
    title: "",
    source: "",
  });
  const [leads, setLeads] = useState([]);
  const [salesEmployees, setSalesEmployees] = useState([]);
  const [showLeadTransferPopup, setShowLeadTransferPopup] = useState(false);
  const [transferUserId, setTransferUserId] = useState("");
  const [leadId, setLeadId] = useState("");
  const [showActionPopup, setShowActionPopup] = useState(false);

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const navigate = useNavigate();

  /** Fetch Sales Employees */
  const fetchSalesEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/department/get-sales-employees`,
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );
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
    fetchSalesEmployees();
  }, [leads]); // Fetch only once on component mount

  /** Handle Lead Transfer */
  const handleLeadTransfer = async () => {
    try {
      await axios.patch(
        `${API_URL}/lead/transfer-lead/${leadId}`,
        { receivedById: transferUserId },
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      alert("Lead successfully transferred!");
      setShowLeadTransferPopup(false);
      setTransferUserId("");
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
      },
      lead_ClientContactPerson: {
        client_ClientContactPersonName: formData.clientContactPersonName,
        client_ClientContactPersonEmail: formData.clientContactPersonEmail,
        client_ClientContactPersonContact: formData.clientContactPersonContact,
      },
      lead_Organization: formData.organization,
      lead_Scope: formData.leadScope,
      lead_Title: formData.title,
      lead_ContactPerson: formData.contactPerson,
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
      <LeadFunnel />
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
              <th className="p-3">Previous Owner</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b hover:bg-gray-200 hover:cursor-pointer"
              >
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_CreaterName}
                </td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_Title}
                </td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_Organization}
                </td>
                <td
                  className="p-3 flex items-center space-x-2"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_Label === "Hot" && (
                    <FontAwesomeIcon
                      icon={faFire}
                      className="text-red-500 text-lg"
                    />
                  )}
                  {lead.lead_Label === "Warm" && (
                    <FontAwesomeIcon
                      icon={faSun}
                      className="text-orange-500 text-lg"
                    />
                  )}
                  {lead.lead_Label === "Cold" && (
                    <FontAwesomeIcon
                      icon={faSnowflake}
                      className="text-blue-500 text-lg"
                    />
                  )}
                </td>

                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_TransferredByUserName}
                </td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_PreviousOwnerName}
                </td>
                <td
                  className="p-3"
                  onClick={() => navigate(`/lead-detail/${lead._id}`)}
                >
                  {lead.lead_AssignedToUserName}
                </td>

                <td className="p-3 relative">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    onClick={() => {
                      setShowActionPopup(lead._id); // Store the lead ID to identify the active popup
                      setLeadId(lead._id); // Store the lead ID to identify the active popup
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretSquareDown} />
                  </button>
                  {showActionPopup === lead._id && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10">
                      <h3 className="text-lg font-semibold mb-2">
                        Choose an Action
                      </h3>
                      <div className="flex flex-col space-y-2">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          onClick={() => {
                            navigate(`/optional-data-lead/${lead._id}`);
                            setShowActionPopup(null);
                          }}
                        >
                          Add Optional Data
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          onClick={() => {
                            setShowLeadTransferPopup(true);
                            setShowActionPopup(null);
                          }}
                        >
                          Transfer Lead
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          onClick={() => {navigate(`/lead-to-quote-conversion/${lead._id}`)}}
                        >
                          Convert to Quote
                        </button>
                        <button
                          className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                          onClick={() => setShowActionPopup(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
              {/* Client Contact Person Details */}
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonName"
                  type="text"
                  value={formData.clientContactPersonName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Name"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonEmail"
                  type="text"
                  value={formData.clientContactPersonEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Email"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonContact"
                  type="text"
                  value={formData.clientContactPersonContact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Contact"
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
                  <option value="Social Media">Social Media</option>
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
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={handleLeadTransfer}
            >
              Transfer
            </button>
            <button
              className="mt-4 mx-5 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => setShowLeadTransferPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelLeads;
