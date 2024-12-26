import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SalesViewLead = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_SALES_URL = process.env.REACT_APP_API_SALES_URL;


  // Get the creator's details from the Redux store
  const { user } = useSelector((state) => state.auth) || {};

  const creator = {
    name: user?.name || "N/A",
    email: user?.email || "N/A",
    phone: user?.contact || "N/A",
  };

  useEffect(() => {
    const fetchLeadDetails = async () => {
      const jwtLoginToken = localStorage.getItem("jwtLoginToken");

      if (!jwtLoginToken) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_SALES_URL}/lead/${leadId}`,
          {
            headers: { Authorization: `Bearer ${jwtLoginToken}` },
          }
        );

        if (response.data.success) {
          setLead(response.data.information.lead);
        } else {
          setError("Failed to fetch lead details.");
        }
      } catch (err) {
        console.error("Error fetching lead details:", err);
        setError("Error fetching lead details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [leadId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-blue-500 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
        <p className="text-red-600 font-semibold text-center text-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg mt-8 mb-8">
      {lead ? (
        <>
          {/* Lead Name */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
            Lead: {lead.lead_Name || "N/A"}
          </h1>

          {/* Creator Details Section - fetched from Redux store */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 mt-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Creator Details
            </h2>
            <p><strong className="text-gray-700 text-lg">Name:</strong> {creator.name}</p>
            <p><strong className="text-gray-700 text-lg">Email:</strong> {creator.email}</p>
            <p><strong className="text-gray-700 text-lg">Contact:</strong> {creator.phone}</p>
          </div>

          {/* Client Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Client Details
              </h2>
              <p><strong className="text-gray-700 text-lg">Name:</strong> {lead.lead_Client?.client_Name || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Email:</strong> {lead.lead_Client?.client_Email || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Contact:</strong> {lead.lead_Client?.client_Contact || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Address:</strong> {lead.lead_Client?.client_Address || "N/A"}</p>
            </div>

            {/* Lead Information Section */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Lead Information
              </h2>
              <p><strong className="text-gray-700 text-lg">Scope:</strong> {lead.lead_Scope || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Installation Time:</strong> {lead.lead_InstallationTime || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Bank Transfer:</strong> {lead.lead_BankTransfer || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Date Mentioned:</strong> {lead.lead_DateMentioned || "N/A"}</p>
              <p><strong className="text-gray-700 text-lg">Problem Definition:</strong> {lead.lead_ProblemDefinition || "N/A"}</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Reviews</h2>
            {lead.lead_Reviews && lead.lead_Reviews.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700 text-lg">
                {lead.lead_Reviews.map((review, index) => (
                  <li key={index} className="mt-2">
                    {review}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2 text-lg">No reviews available.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center mt-6 text-2xl">
          No lead data available.
        </p>
      )}
    </div>
  );
};

export default SalesViewLead;
