import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [showMassLeadTransferPopup, setShowMassLeadTransferPopup] =
    useState(false);
  const [transferUserId, setTransferUserId] = useState("");
  const [leadId, setLeadId] = useState("");
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showMassActionsPopup, setShowMassActionsPopup] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  /** Handle Input Change */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /** Handle Checkbox Submission */
  const handleCheckboxChange = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId].map((id) => id.toString().replace(/'/g, '"'))
    );
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLeads([]); // Deselect all
    } else {
      setSelectedLeads(leads.map((lead) => lead._id)); // Select all leads
    }
    setSelectAll(!selectAll);
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

  /** Handle Mass Delete */
  const handleMassDelete = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete the selected leads?"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/lead/mass-delete`, // POST request
        { leadIds: selectedLeads }, // Sending selectedLeads in the request body
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );
    } catch (error) {
      console.error(
        "Error during mass delete:",
        error.response?.data || error.message
      );
      alert("An error occurred while deleting leads. Please try again.");
    }
  };

  /** Handle Mass Delete */
  const handleMassTransfer = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to transfer the selected leads?"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/lead/mass-transfer`, // POST request
        {
          receivedById: transferUserId,
          leadIds: selectedLeads,
        },
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );
    } catch (error) {
      console.error(
        "Error during mass trasnferred:",
        error.response?.data || error.message
      );
      alert("An error occurred while transferring leads. Please try again.");
    }
  };

  return (
    <div className="pt-2 bg-delta min-h-screen">
      <div className="relative">
        <button
          className="px-4 py-2 text-white bg-[#4C585B] hover:bg-blue-700"
          onClick={() => setShowMassActionsPopup(!showMassActionsPopup)}
        >
          Actions
        </button>

        {showMassActionsPopup && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-200">
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-100 hover:text-red-700"
              onClick={handleMassDelete}
            >
              Delete
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              onClick={() => {
                setShowMassLeadTransferPopup(true);
              }}
            >
              Transfer
            </button>
          </div>
        )}
      </div>

      <div className="bg-white">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
          <button
            className="px-4 py-2 text-white bg-pr hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            + Lead
          </button>
        </div>

        {/* Leads Table */}
        <div className="text-left bg-white overflow-hidden">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Created at
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Lead Creator
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Organization
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Label
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Transferred By
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Previous Owner
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Assigned To
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-100 border-b">
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={selectedLeads.includes(lead._id)}
                      onChange={() => handleCheckboxChange(lead._id)}
                    />
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_CreaterName}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_Title}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_Organization}
                  </td>
                  <td
                    className="flex justify-center align-center mt-2"
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
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_TransferredByUserName}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_PreviousOwnerName}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => navigate(`/lead-detail/${lead._id}`)}
                  >
                    {lead.lead_AssignedToUserName}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="relative px-2 py-1 bg-pr text-white text-sm hover:bg-blue-600"
                      onClick={() => {
                        setShowActionPopup(lead._id);
                        setLeadId(lead._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCaretSquareDown} />
                    </button>
                    {showActionPopup === lead._id && (
                      <div className="absolute mt-1 right-0 bg-white border border-gray-300 p-4 z-10">
                        <h3 className="text-lg font-semibold mb-2">
                          Choose an Action
                        </h3>
                        <div className="flex flex-col">
                          <button
                            className="px-4 py-2 bg-pr text-white hover:bg-blue-600"
                            onClick={() => {
                              navigate(`/optional-data-lead/${lead._id}`);
                              setShowActionPopup(null);
                            }}
                          >
                            Add Optional Data
                          </button>
                          <button
                            className="px-4 py-2 bg-pr text-white hover:bg-pr"
                            onClick={() => {
                              navigate(`/lead-to-quote-conversion/${lead._id}`);
                            }}
                          >
                            Convert to Quote
                          </button>
                          <button
                            className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
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
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg p-8">
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
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} />
                <input
                  id="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Name"
                />
              </div>
              {/* Client Email */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Email"
                />
              </div>
              {/* Client Address */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faAddressBook} />
                <input
                  id="clientAddress"
                  type="text"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Address"
                />
              </div>
              {/* Client Contact Person Details */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonName"
                  type="text"
                  value={formData.clientContactPersonName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Name"
                />
              </div>
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonEmail"
                  type="text"
                  value={formData.clientContactPersonEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Email"
                />
              </div>
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faPhone} />
                <input
                  id="clientContactPersonContact"
                  type="text"
                  value={formData.clientContactPersonContact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Client Contact Person Contact"
                />
              </div>
              {/* Organization */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faBuilding} />
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Organization"
                />
              </div>
              {/* Lead Scope */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <input
                  id="leadScope"
                  type="text"
                  value={formData.leadScope}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Lead Scope"
                />
              </div>
              {/* Title */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faTag} />
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                  placeholder="Title"
                />
              </div>
              {/* Source Selection */}
              <div className="flex items-center mt-4">
                <FontAwesomeIcon icon={faGlobe} />
                <select
                  id="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-green-500"
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
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pr text-white hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Transfer Popup */}
      {showMassLeadTransferPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6">
            <h3 className="text-lg font-bold text-gray-700">Transfer Leads</h3>
            <select
              className="w-full p-2 border mt-4"
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
              className="mt-4 px-4 py-2 bg-pr text-white"
              onClick={handleMassTransfer}
            >
              Transfer
            </button>
            <button
              className="mt-4 mx-5 px-4 py-2 bg-red-500 text-white"
              onClick={() => setShowMassLeadTransferPopup(false)}
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
