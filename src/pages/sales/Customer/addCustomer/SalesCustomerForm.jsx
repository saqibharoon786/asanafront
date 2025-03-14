import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  faUser,
  faBuilding,
  faIdBadge,
  faEnvelope,
  faPhone,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  createGeneralDetails,
  resetCustomer
} from "../../../../features/customerSlice";
import OtherDetails from "./SalesOtherDetails";
import Address from "./SalesAddress";
import Remarks from "./SalesRemarks";
import ContactPersons from "./SalesContactPersons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const jwtLoginToken = localStorage.getItem("jwtLoginToken");

const SalesCustomerForm = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("OtherDetails");
  const customerData = useSelector((state) => state.customer);
const navigate=useNavigate();
  const handleCustomerGeneralDetails = (e) => {
    dispatch(
      createGeneralDetails({ field: e.target.name, value: e.target.value })
    );
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    dispatch(resetCustomer());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event bubbling

    try {
      const response = await axios.post(
        `${API_URL}/customer/add-customer`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigate('/sales/customers')
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
    <div className="mx-auto">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">New Customer</h1>
        <h2 className="text-lg font-semibold mb-2">Customer Type</h2>
        <div className="flex  gap-4 mb-4">
          <label className="  flex items-center">
            <input
              type="radio"
              name="customer_Type"
              value="Business"
              onChange={handleCustomerGeneralDetails}
            />
            <span className="ml-2">Business</span>
          </label>
          <label className="  flex items-center">
            <input
              type="radio"
              name="customer_Type"
              value="Individual"
              onChange={handleCustomerGeneralDetails}
            />
            <span className="ml-2">Individual</span>
          </label>
        </div>

        {/* Added new input fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Contact */}

          <div className=" w-1/2">
            <label className="flex font-medium mb-1">Salutation:</label>
            <select
              name="salutation"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            >
              <option value="">Select</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="flex items-center   w-1/2">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>
          <div className="flex items-center   w-1/2">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>

          {/* Company Name */}
          <div className="flex items-center   w-1/2">
            <i className="fas fa-building text-gray-400 mr-2"></i>
            <input
              type="text"
              name="customer_CompanyName"
              placeholder="Company Name"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>

          {/* Display Name */}
          <div className="flex items-center   w-1/2">
            <i className="fas fa-id-badge text-gray-400 mr-2"></i>
            <input
              type="text"
              name="customer_DisplayName"
              placeholder="Display Name"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>

          {/* Email Address */}
          <div className="flex items-center   w-1/2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              type="email"
              name="customer_Email"
              placeholder="Email Address"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>

          {/* Phone */}

          <div className="flex items-center   w-1/2">
            <i className="fas fa-phone text-gray-400 mr-2"></i>
            <input
              type="text"
              name="workPhone"
              placeholder="Work Phone"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>
          <div className="flex items-center   w-1/2">
            <i className="fas fa-mobile-alt text-gray-400 mr-2"></i>
            <input
              type="text"
              name="mobilePhone"
              placeholder="Mobile Phone"
              onChange={handleCustomerGeneralDetails}
              className="w-full border-gray-300 rounded-md shadow-sm py-2"
            />
          </div>
        </div>
        {/* End of new input fields */}
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => handleSectionChange("OtherDetails")}
            className={`px-4 py-2 rounded-md shadow ${
              activeSection === "OtherDetails"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Other Details
          </button>
          <button
            type="button"
            onClick={() => handleSectionChange("Address")}
            className={`px-4 py-2 rounded-md shadow ${
              activeSection === "Address"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Address
          </button>
          <button
            type="button"
            onClick={() => handleSectionChange("Remarks")}
            className={`px-4 py-2 rounded-md shadow ${
              activeSection === "Remarks"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Remarks
          </button>
          <button
            type="button"
            onClick={() => handleSectionChange("ContactPersons")}
            className={`px-4 py-2 rounded-md shadow ${
              activeSection === "ContactPersons"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Contact Persons
          </button>
        </div>

        {activeSection === "OtherDetails" && <OtherDetails />}
        {activeSection === "Address" && <Address />}
        {activeSection === "Remarks" && <Remarks />}
        {activeSection === "ContactPersons" && <ContactPersons />}
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

export default SalesCustomerForm;
