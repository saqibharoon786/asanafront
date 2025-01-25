import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSingularFields, updatePrimaryContact, updatePhone } from "../../../features/customerSlice";
import OtherDetails from "./OtherDetails";
import Address from "./Address";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const jwtLoginToken = localStorage.getItem("jwtLoginToken");

const CustomerForm = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("OtherDetails");
  const customerData = useSelector((state) => state.customer);

  const handleCustomerFormChange = (e) => {
    dispatch(updateSingularFields({ field: e.target.name, value: e.target.value }))
  }

  const handlePrimaryInfoChange = (e) => {
    dispatch(updatePrimaryContact({ field: e.target.name, value: e.target.value}));
  };  

  const handlePhoneChange = (e) => {
    dispatch(updatePhone({ field: e.target.name, value: e.target.value}));
  };  

  const handleSubmit = async () => {
    console.log(customerData);
    try {
      const response = await axios.post(`${API_URL}/customer/add-customer`, customerData, {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("Customer created successfully!");
      } else {
        alert("Failed to create customer.");
      }
    } catch (error) {
      console.error("Error submitting customer data:", error);
      alert("Error creating customer. Please try again later.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">New Customer</h1>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Customer Type</h2>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input type="radio" name="customer_Type" value="Business" onChange={handleCustomerFormChange} />
            <span className="ml-2">Business</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="customer_Type" value="Individual" onChange={handleCustomerFormChange} />
            <span className="ml-2">Individual</span>
          </label>
        </div>

        {/* Added new input fields */}
        <div className="space-y-4">
          {/* Primary Contact */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Salutation:</label>
              <select
                name="salutation"
                onChange={handlePrimaryInfoChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">First Name:</label>
              <input
                type="text"
                name="firstName"
                onChange={handlePrimaryInfoChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Last Name:</label>
              <input
                type="text"
                name="lastName"
                onChange={handlePrimaryInfoChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-medium mb-1">Company Name:</label>
            <input
              type="text"
              name="customer_CompanyName"
              onChange={handleCustomerFormChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block font-medium mb-1">Display Name:</label>
            <input
              type="text"
              name="customer_DisplayName"
              onChange={handleCustomerFormChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block font-medium mb-1">Email Address:</label>
            <input
              type="email"
              name="customer_Email"
              onChange={handleCustomerFormChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Work Phone:</label>
              <input
                type="text"
                name="workPhone"
                onChange={handlePhoneChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Mobile Phone:</label>
              <input
                type="text"
                name="mobilePhone"
                onChange={handlePhoneChange}
                className="w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
        {/* End of new input fields */}

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveSection("OtherDetails")}
            className={`px-4 py-2 rounded-md shadow ${activeSection === "OtherDetails" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            Other Details
          </button>
          <button
            onClick={() => setActiveSection("Address")}
            className={`px-4 py-2 rounded-md shadow ${activeSection === "Address" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            Address
          </button>
        </div>

        {activeSection === "OtherDetails" && <OtherDetails />}
        {activeSection === "Address" && <Address />}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

export default CustomerForm;
