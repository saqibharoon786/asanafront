import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PanelLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalLeads, setTotalLeads] = useState(0);

  const navigate = useNavigate();

  // Navigate to Add New Lead Page
  const handleNewLead = () => {
    navigate("/addNewLead");
  };

  // Fetch Leads from Backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const jwtLoginToken = localStorage.getItem("jwtLoginToken");
        const response = await axios.get("http://localhost:3000/lead/all-leads", {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          const leadData = response.data.information.allLeads || [];
          setLeads(leadData);
          setTotalLeads(leadData.length);
        } else {
          setError("Failed to load leads. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to load leads. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter Leads Based on Search Input
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) =>
      lead.lead_Name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, leads]);

  // Navigate to View Lead Page
  const handleViewLead = (leadId) => {
    navigate(`/view-lead/${leadId}`); // Ensure route `/view-lead/:id` exists
  };

  // Loading State
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Fetching leads... Please wait.
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-800 tracking-wide drop-shadow-md">
            Leads Dashboard
          </h1>
          <button
            onClick={handleNewLead}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Lead
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700">Total Leads</h2>
            <p className="text-5xl font-extrabold text-blue-600 mt-3">{totalLeads}</p>
          </div>
        </div>

        {/* No Leads Message */}
        {totalLeads === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-xl font-semibold text-red-500 text-center">
              No leads added yet.
            </p>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search for leads..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lead List */}
        {totalLeads > 0 && filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-2xl rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105"
              >
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  Lead Name: {lead.lead_Name || "Unknown"}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Created By: {lead.lead_Creater?.name || "N/A"}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Client Name: {lead.lead_Client?.client_Name || "Unknown"}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Scope: {lead.lead_Scope || "Not Specified"}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Problem: {lead.lead_ProblemDefinition || "Not Specified"}
                </p>
                <button
                  onClick={() => handleViewLead(lead._id)}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">No leads found.</p>
        )}
      </div>
    </div>
  );
};

export default PanelLeads;
