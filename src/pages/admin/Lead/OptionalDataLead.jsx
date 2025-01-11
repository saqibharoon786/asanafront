import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OptionalDataLead = () => {
  const { leadId } = useParams(); // Extract leadId from params
  const [formData, setFormData] = useState({
    lead_Demography: {
      company_Size: "",
      industry_Match: "",
      location: "",
      job_Title: "",
      misaligned_Demographics: false,
    },
    lead_Behaviour: {
      visited_Pricing_Page: "",
      downloaded_White_Paper: "",
      repeated_Website_Visits: "",
      ignore_Email_or_Unsubscribed: "",
    },
    lead_Action: {
      requested_Demo_or_Quote: false,
      attended_Sales_Call: false,
      opted_for_Trial_Services: false,
    },
    lead_AttributesOrAction: {
      invalid_Email_or_ContactInfo: false,
      competitor: false,
      budget_Below_Threshold: false,
    },
  });

  const handleChange = (event, field, subField) => {
    if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    }
  };

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/lead/update/${leadId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderInputField = (field, subField, value, type) => (
    <div className="flex flex-col mb-6">
      <label className="text-gray-700 text-sm font-medium mb-2 capitalize">
        {subField.replace(/_/g, " ")}:
      </label>
      <input
        type={type}
        value={type === "checkbox" ? undefined : value}
        onChange={(e) => handleChange(e, field, subField)}
        checked={type === "checkbox" ? value : undefined}
        className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg space-y-8"
    >
      <h2 className="text-2xl font-bold text-gray-800">Update Lead Details</h2>
      {Object.entries(formData).map(([section, fields]) => (
        <div key={section} className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-600 capitalize">
            {section.replace(/_/g, " ")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(fields).map(([key, value]) =>
              renderInputField(
                section,
                key,
                value,
                typeof value === "boolean" ? "checkbox" : "text"
              )
            )}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default OptionalDataLead;
