import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddLead = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { user } = useSelector((state) => state.auth);

  const creator = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.contact || "",
  };

  const [client, setClient] = useState({
    client_Name: "",
    client_Email: "",
    client_Address: "",
    client_Contact: "",
  });

  const [leadDetails, setLeadDetails] = useState({
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

  const handleLeadDetailsChange = (e) => {
    setLeadDetails({ ...leadDetails, [e.target.name]: e.target.value });
  };

  const handleAddReview = (review) => {
    if (review.trim()) {
      setLeadDetails((prevDetails) => ({
        ...prevDetails,
        lead_Reviews: [...prevDetails.lead_Reviews, review.trim()],
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
      !leadDetails.lead_Name ||
      !leadDetails.lead_Scope ||
      !leadDetails.lead_ProblemDefinition ||
      !leadDetails.lead_InstallationTime ||
      !leadDetails.lead_BankTransfer ||
      !leadDetails.lead_DateMentioned
    ) {
      alert("All lead details are required!");
      return;
    }

    const payload = {
      lead_Creater: creator,
      lead_Name: leadDetails.lead_Name,
      lead_Scope: leadDetails.lead_Scope,
      lead_InstallationTime: leadDetails.lead_InstallationTime,
      lead_ProblemDefinition: leadDetails.lead_ProblemDefinition,
      lead_BankTransfer: leadDetails.lead_BankTransfer,
      lead_DateMentioned: leadDetails.lead_DateMentioned,
      lead_Reviews: leadDetails.lead_Reviews,
      lead_Client: {
        client_Name: client.client_Name,
        client_Email: client.client_Email,
        client_Address: client.client_Address,
        client_Contact: parseInt(client.client_Contact, 10),
      },
    };

    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:3000/lead/create-lead",
        payload,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      console.log("Lead created successfully:", response.data);
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
        {/* Creator Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Creator Details
          </h3>
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">
              <strong>Name:</strong> {creator.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {creator.email}
            </p>
            <p className="text-lg">
              <strong>Contact:</strong> {creator.contact}
            </p>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Client Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="client_Name"
              placeholder="Client's Full Name"
              value={client.client_Name}
              onChange={handleClientChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="client_Email"
              placeholder="Client's Email Address"
              value={client.client_Email}
              onChange={handleClientChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="client_Contact"
              placeholder="Client's Contact Number"
              value={client.client_Contact}
              onChange={handleClientChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="client_Address"
              placeholder="Client's Address"
              value={client.client_Address}
              onChange={handleClientChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lead Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Lead Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="lead_Name"
              placeholder="Lead Name"
              value={leadDetails.lead_Name}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lead_Scope"
              placeholder="Lead Scope"
              value={leadDetails.lead_Scope}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              name="lead_InstallationTime"
              value={leadDetails.lead_InstallationTime}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="datetime-local"
              name="lead_BankTransfer"
              value={leadDetails.lead_BankTransfer}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lead_DateMentioned"
              placeholder="Date Mentioned"
              value={leadDetails.lead_DateMentioned}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="lead_ProblemDefinition"
              placeholder="Problem Definition"
              value={leadDetails.lead_ProblemDefinition}
              onChange={handleLeadDetailsChange}
              className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
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
          {leadDetails.lead_Reviews.length > 0 && (
            <ul className="mt-4 space-y-2">
              {leadDetails.lead_Reviews.map((review, index) => (
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

export default AddLead;