import React, { useState } from "react";
import axios from "axios";

const API_SALES_URL = process.env.REACT_APP_API_SALES_URL;
const SalesAddLead = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  const [client, setClient] = useState({
    client_Name: "",
    client_Email: "",
    client_Address: "",
    client_Contact: "",
  });

  const [leadPayload, setLeadPayload] = useState({
    lead_Name: "",
    lead_Scope: "",
    lead_InstallationTime: "",
    lead_ProblemDefinition: "",
    lead_BankTransfer: "",
    lead_DateMentioned: "",
    lead_Reviews: [],
  });

  const handleClientChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleLeadPayloadChange = (e) => {
    setLeadPayload({ ...leadPayload, [e.target.name]: e.target.value });
  };

  const handleAddReview = (review) => {
    if (review.trim()) {
      setLeadPayload((prevPayload) => ({
        ...prevPayload,
        lead_Reviews: [...prevPayload.lead_Reviews, review.trim()],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for client details
    if (
      !client.client_Name ||
      !client.client_Email ||
      !client.client_Address ||
      !client.client_Contact
    ) {
      alert("All client details are required!");
      return;
    }

    // Validation for lead details
    if (
      !leadPayload.lead_Name ||
      !leadPayload.lead_Scope ||
      !leadPayload.lead_ProblemDefinition ||
      !leadPayload.lead_InstallationTime ||
      !leadPayload.lead_BankTransfer ||
      !leadPayload.lead_DateMentioned
    ) {
      alert("All lead details are required!");
      return;
    }

    const payload = {
      lead_Name: leadPayload.lead_Name,
      lead_Scope: leadPayload.lead_Scope,
      lead_InstallationTime: leadPayload.lead_InstallationTime,
      lead_ProblemDefinition: leadPayload.lead_ProblemDefinition,
      lead_BankTransfer: leadPayload.lead_BankTransfer,
      lead_DateMentioned: leadPayload.lead_DateMentioned,
      lead_Reviews: leadPayload.lead_Reviews,
      lead_Client: {
        client_Name: client.client_Name,
        client_Email: client.client_Email,
        client_Address: client.client_Address,
        client_Contact:client.client_Contact
      },
    };

    try {
      console.log(payload);
      const response = await axios.post(
        `${API_SALES_URL}/lead/create-lead`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      alert("Lead created successfully!");
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-xl">
      <h2 className="text-5xl font-extrabold text-center text-blue-600 mb-12">
        Create a New Lead
      </h2>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Client Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Client Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="client_Name" className="block text-lg font-medium text-gray-600">Client Name</label>
              <input
                type="text"
                name="client_Name"
                id="client_Name"
                placeholder="Client's Full Name"
                value={client.client_Name}
                onChange={handleClientChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="client_Email" className="block text-lg font-medium text-gray-600">Client Email</label>
              <input
                type="email"
                name="client_Email"
                id="client_Email"
                placeholder="Client's Email Address"
                value={client.client_Email}
                onChange={handleClientChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="client_Contact" className="block text-lg font-medium text-gray-600">Client Contact</label>
              <input
                type="text"
                name="client_Contact"
                id="client_Contact"
                placeholder="Client's Contact Number"
                value={client.client_Contact}
                onChange={handleClientChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="client_Address" className="block text-lg font-medium text-gray-600">Client Address</label>
              <input
                type="text"
                name="client_Address"
                id="client_Address"
                placeholder="Client's Address"
                value={client.client_Address}
                onChange={handleClientChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Lead Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lead_Name" className="block text-lg font-medium text-gray-600">Lead Name</label>
              <input
                type="text"
                name="lead_Name"
                id="lead_Name"
                placeholder="Lead Name"
                value={leadPayload.lead_Name}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lead_Scope" className="block text-lg font-medium text-gray-600">Lead Scope</label>
              <input
                type="text"
                name="lead_Scope"
                id="lead_Scope"
                placeholder="Lead Scope"
                value={leadPayload.lead_Scope}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lead_InstallationTime" className="block text-lg font-medium text-gray-600">Installation Time</label>
              <input
                type="datetime-local"
                name="lead_InstallationTime"
                id="lead_InstallationTime"
                value={leadPayload.lead_InstallationTime}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lead_BankTransfer" className="block text-lg font-medium text-gray-600">Bank Transfer Time</label>
              <input
                type="datetime-local"
                name="lead_BankTransfer"
                id="lead_BankTransfer"
                value={leadPayload.lead_BankTransfer}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lead_DateMentioned" className="block text-lg font-medium text-gray-600">Date Mentioned</label>
              <input
                type="date"
                name="lead_DateMentioned"
                id="lead_DateMentioned"
                value={leadPayload.lead_DateMentioned}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lead_ProblemDefinition" className="block text-lg font-medium text-gray-600">Problem Definition</label>
              <textarea
                name="lead_ProblemDefinition"
                id="lead_ProblemDefinition"
                placeholder="Problem Definition"
                value={leadPayload.lead_ProblemDefinition}
                onChange={handleLeadPayloadChange}
                className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Reviews</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Add a review"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddReview(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {leadPayload.lead_Reviews.length > 0 && (
            <ul className="mt-4 space-y-2">
              {leadPayload.lead_Reviews.map((review, index) => (
                <li key={index} className="text-gray-800">
                  {review}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 text-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default SalesAddLead;
