import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createGeneralDetails,
  resetCustomer
} from "../../../../features/customerSlice";
import OtherDetails from "./OtherDetails";
import Address from "./Address";
import Remarks from "./Remarks";
import ContactPersons from "./ContactPersons";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";  // Import Yup for validation

const API_URL = process.env.REACT_APP_API_URL;
const jwtLoginToken = localStorage.getItem("jwtLoginToken");

const CustomerForm = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("otherDetails");

  const customerData = useSelector((state) => state.customer);

  const handleCustomerGeneralDetails = (e) => {
    dispatch(
      createGeneralDetails({ field: e.target.name, value: e.target.value })
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Combined Yup Validation Schema for both GeneralDetails and OtherDetails
  const validationSchema = Yup.object({
      customer_Type: Yup.string().required("Customer Type is required"),
      customer_PrimaryInfo: Yup.object({
        salutation: Yup.string().required("Salutation is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
      }),
      customer_CompanyName: Yup.string().required("Company Name is required"),
      customer_DisplayName: Yup.string().required("Display Name is required"),
      customer_Email: Yup.string().email("Invalid email address").required("Email Address is required"),
      customer_Contact: Yup.object({
        workPhone: Yup.string().required("Work Phone is required"),
        mobilePhone: Yup.string().required("Mobile Phone is required"),
      }),
    // customer_OtherDetails: Yup.object({
    //   customer_TRN: Yup.string()
    //     .matches(/^[A-Za-z0-9]{9,12}$/, "TRN should be alphanumeric and between 10 to 15 characters")
    //     .required("TRN# is required"),
    // }),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(customerData);
      
      const response = await axios.post(
        `${API_URL}/customer/add-customer`,
        values,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Customer created successfully!");
        dispatch(resetCustomer());
      } else {
        alert("Failed to create customer.");
      }
    } catch (error) {
      console.error("Error submitting customer data:", error);
      alert("Error creating customer. Please try again later.");
    }
  };

  return (
    <div className="">
      <div className="bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">New Customer</h1>
        <div className="bg-white p-8 w-full">
          <Formik
            initialValues={{
                customer_Type: customerData.customer_GeneralDetails.customer_Type || "",
                salutation: "",
                firstName: "",
                lastName: "",
                customer_CompanyName: customerData.customer_GeneralDetails.customer_CompanyName || "",
                customer_DisplayName: customerData.customer_GeneralDetails.customer_DisplayName || "",
                customer_Email: customerData.customer_GeneralDetails.customer_Email || "",
                workPhone: "", mobilePhone: ""
              // customer_OtherDetails: customerData.customer_OtherDetails || { 
              //   customer_TRN: "",
              // },
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {/* Customer Type */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Customer Type*</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the Customer Type.
              </span>
              </span>
                <div className="flex-1">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="customer_Type"
                      value="business"
                      checked={customerData.customer_GeneralDetails.customer_Type === "business"}
                      onChange={handleCustomerGeneralDetails}
                      className="mr-2"
                    />
                    <span>Business</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <Field
                      type="radio"
                      name="customer_Type"
                      value="individual"
                      checked={customerData.customer_GeneralDetails.customer_Type === "individual"}
                      onChange={handleCustomerGeneralDetails}
                      className="mr-2"
                    />
                    <span>Individual</span>
                  </label>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Primary Contact*</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the Customer Primary Contact.
              </span>
            </span>
                <div className="flex gap-4 ">
                  <Field
                    as="select"
                    name="salutation"
                    value={customerData.customer_GeneralDetails.customer_PrimaryInfo.salutation}
                    onChange={handleCustomerGeneralDetails}
                    className="w-1/2 bg-gray-50 border border-gray-300 rounded-md shadow-sm p-3"
                  >
                    <option value="">Salutation</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </Field>
                  <Field
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={customerData.customer_GeneralDetails.customer_PrimaryInfo.firstName}
                    onChange={handleCustomerGeneralDetails}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Field
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={customerData.customer_GeneralDetails.customer_PrimaryInfo.lastName}
                    onChange={handleCustomerGeneralDetails}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <ErrorMessage name="firstName" component="div" className="text-red-600" />
                <ErrorMessage name="lastName" component="div" className="text-red-600" />
              </div>

              {/* Company Name */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Company Name*</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the company Name.
              </span>
            </span>
                <Field
                  type="text"
                  placeholder="Company Name"
                  name="customer_CompanyName"
                  value={customerData.customer_GeneralDetails.customer_CompanyName}
                  onChange={handleCustomerGeneralDetails}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_CompanyName" component="div" className="text-red-600" />
              </div>

              {/* Display Name */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Display Name*</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the Display Name.
              </span>
            </span>
                <Field
                  type="text"
                  placeholder="Display Name"
                  name="customer_DisplayName"
                  value={customerData.customer_GeneralDetails.customer_DisplayName}
                  onChange={handleCustomerGeneralDetails}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_DisplayName" component="div" className="text-red-600" />
              </div>

              {/* Email Address */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the Email Address.
              </span>
            </span>
                <Field
                  type="email"
                  placeholder="Email Address"
                  name="customer_Email"
                  value={customerData.customer_GeneralDetails.customer_Email}
                  onChange={handleCustomerGeneralDetails}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_Email" component="div" className="text-red-600" />
              </div>

              {/* Phone Fields */}
              <div className="mb-6 flex items-center space-x-5">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <span className="ml-2 text-blue-500 relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h1m0-4h-1m0 0v4h1m0 0H12m0 0h1m-1-4h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                Enter the Customer Phone No.
              </span>
            </span>
                <Field
                  type="text"
                  placeholder="Work Phone"
                  name="workPhone"
                  value={customerData.customer_GeneralDetails.customer_Contact.workPhone}
                  onChange={handleCustomerGeneralDetails}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <Field
                  type="text"
                  placeholder="Mobile Phone"
                  name="mobilePhone"
                  value={customerData.customer_GeneralDetails.customer_Contact.mobilePhone}
                  onChange={handleCustomerGeneralDetails}
                  className="w-1/4 px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="workPhone" component="div" className="text-red-600" />
                <ErrorMessage name="mobilePhone" component="div" className="text-red-600" />
              </div>

              {/* Tab Navigation */}
              <ul className="flex space-x-6 border-b-2 border-gray-300 pb-3 mb-6 font-">
                <li className="nav-item">
                  <div
                    role="tab"
                    className={`cursor-pointer text-md font-medium ${activeTab === "otherDetails" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                    onClick={() => handleTabClick("otherDetails")}
                  >
                    Other Details
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    role="tab"
                    className={`cursor-pointer text-md font-medium ${activeTab === "address" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                    onClick={() => handleTabClick("address")}
                  >
                    Address
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    role="tab"
                    className={`cursor-pointer text-md font-medium ${activeTab === "contactPersons" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                    onClick={() => handleTabClick("contactPersons")}
                  >
                    Contact Persons
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    role="tab"
                    className={`cursor-pointer text-md font-medium ${activeTab === "remarks" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                    onClick={() => handleTabClick("remarks")}
                  >
                    Remarks
                  </div>
                </li>
              </ul>

              {activeTab === "otherDetails" && <OtherDetails />}
              {activeTab === "address" && <Address />}
              {activeTab === "remarks" && <Remarks />}
              {activeTab === "contactPersons" && <ContactPersons />}

              <button
                type="submit"
                className="px-6 py-2 ml-4 bg-gray-300 text-blue-600 rounded-md"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
