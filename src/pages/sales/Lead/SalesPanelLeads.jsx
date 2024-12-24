import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaCheck, FaTrashAlt } from 'react-icons/fa';

const API_SALES_URL = process.env.REACT_APP_API_SALES_URL;

const SalesPanelLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [totalLeads, setTotalLeads] = useState(0);

  const navigate = useNavigate();
  const jwtLoginToken = localStorage.getItem('jwtLoginToken');

  // Navigate to Add New Lead Page
  const handleNewLead = () => {
    navigate('/sales/add-lead');
  };

  // Fetch Leads from Backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${API_SALES_URL}/lead/all-leads`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });
        if (response.data.success) {
          setLeads(response.data.information.allLeads); // Show all leads
          setTotalLeads(response.data.information.allLeads.length);
        } else {
          setError('Failed to load leads. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('Failed to load leads. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [leads]); // Dependency on jwtLoginToken to reload if token changes

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter leads based on search term
  const filteredLeads = leads.filter((lead) => {
    const searchTerm = search.toLowerCase();
    return (
      lead.lead_Name.toLowerCase().includes(searchTerm) ||
      (lead.lead_Creater?.name?.toLowerCase().includes(searchTerm) || '') ||
      (lead.lead_Client?.client_Name?.toLowerCase().includes(searchTerm) || '') ||
      (lead.lead_Scope?.toLowerCase().includes(searchTerm) || '') ||
      (lead.lead_Details?.status?.toLowerCase().includes(searchTerm) || '')
    );
  });

  // Handle Delete Lead
  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await axios.delete(
          `${API_SALES_URL}/lead/delete/${leadId}`,
          {
            data: { lead_Identifier: leadId },
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        if (response.status === 200) {
          setLeads((prevLeads) =>
            prevLeads.filter((lead) => lead._id !== leadId)
          );
          alert('Lead deleted successfully.');
        } else {
          throw new Error(response.data.message || 'Failed to delete the lead.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
        alert(errorMessage);
      }
    }
  };

  // Handle Approve Lead (if applicable)
  const handleApproveLead = async (leadId) => {
    if (window.confirm('Are you sure you want to approve this lead?')) {
      try {
        const response = await axios.patch(
          `${API_SALES_URL}/lead/approve/${leadId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        if (response.status === 200) {
          setLeads((prevLeads) =>
            prevLeads.filter((lead) => lead._id !== leadId)
          );
          alert('Lead approved successfully.');
        } else {
          throw new Error(response.data.message || 'Failed to approve the lead.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
        alert(errorMessage);
      }
    }
  };

  // Navigate to View Lead Page
  const handleViewLead = (leadId) => {
    navigate(`/sales/view-lead/${leadId}`);
  };

  // Determine the background color based on the lead's status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-100'; // Red for Pending
      case 'Approved':
        return 'bg-green-100'; // Green for Approved
      default:
        return 'bg-white'; // Default if status is not defined
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Leads Dashboard</h1>
        <button
          onClick={handleNewLead}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Total Leads</div>
          <div className="text-2xl font-bold text-blue-600">{totalLeads}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="Search for leads..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-gray-600 text-lg">Loading leads...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-6">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-red-500 text-center font-medium">No leads available.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Lead Name</th>
                <th className="py-2 px-4 border">Created By</th>
                <th className="py-2 px-4 border">Client Name</th>
                <th className="py-2 px-4 border">Scope</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className={`border-t ${getStatusClass(lead.lead_Details?.status)}`}>
                  <td className="py-2 px-4">{lead.lead_Name || 'Unknown'}</td>
                  <td className="py-2 px-4">{lead.lead_Creater?.name || 'N/A'}</td>
                  <td className="py-2 px-4">{lead.lead_Client?.client_Name || 'Unknown'}</td>
                  <td className="py-2 px-4">{lead.lead_Scope || 'N/A'}</td>
                  <td className="py-2 px-4">{lead.lead_Details ? lead.lead_Details.status : 'Pending'}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 flex items-center gap-1"
                      onClick={() => handleApproveLead(lead._id)}
                    >
                      <FaCheck /> Approve
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-500 flex items-center gap-1"
                      onClick={() => handleDeleteLead(lead._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 flex items-center gap-1"
                      onClick={() => handleViewLead(lead._id)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesPanelLeads;
