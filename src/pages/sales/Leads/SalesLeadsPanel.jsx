import React, { useState } from "react";

const initialLeads = [
  {
    fullName: "Alice Johnson",
    jobTitle: "Sales Manager",
    email: "alice@example.com",
    companyName: "TechCorp",
    budget: "$50,000",
    leadSource: "Webinar",
  },
  {
    fullName: "Bob Smith",
    jobTitle: "CTO",
    email: "bob@example.com",
    companyName: "Innovate Ltd.",
    budget: "$100,000",
    leadSource: "Email Campaign",
  },
  {
    fullName: "Charlie Brown",
    jobTitle: "Marketing Head",
    email: "charlie@example.com",
    companyName: "CreativeAgency",
    budget: "$70,000",
    leadSource: "Social Media",
  }
];

function SalesPanelQuote() {
  const [leads, setLeads] = useState(initialLeads);
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    budget: "",
    leadSource: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLead = { ...formData };

    setLeads([newLead, ...leads]);

    // Clear the form
    setFormData({
      fullName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      budget: "",
      leadSource: ""
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Lead Generation Form
        </h2>

        {/* Lead Form */}
        <form onSubmit={handleSubmit}>
          {["fullName", "jobTitle", "email", "phoneNumber", "companyName", "budget", "leadSource"].map((field) => (
            <input
              key={field}
              id={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field === "fullName" ? "Full Name" :
                           field === "jobTitle" ? "Job Title" :
                           field === "email" ? "Email" :
                           field === "phoneNumber" ? "Phone Number" :
                           field === "companyName" ? "Company Name" :
                           field === "budget" ? "Budget" : "Lead Source"}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 mt-2 rounded border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-200"
              required={field === "email" || field === "fullName" || field === "companyName"}
            />
          ))}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Submit Lead
          </button>
        </form>

        {/* Display Leads */}
        <div id="leadsList" className="mt-6">
          <h3 className="font-bold text-gray-700 mb-2">Submitted Leads</h3>
          {leads.map((lead, index) => (
            <div key={index} className="rounded p-4 bg-gray-50 shadow mt-2">
              <p><strong>Full Name:</strong> {lead.fullName}</p>
              <p><strong>Job Title:</strong> {lead.jobTitle}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Company Name:</strong> {lead.companyName}</p>
              <p><strong>Budget:</strong> {lead.budget}</p>
              <p><strong>Lead Source:</strong> {lead.leadSource}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesPanelQuote;
