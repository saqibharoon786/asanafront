import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faIdBadge, faEnvelope, faPhone, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
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
    customer_OtherDetails: Yup.object({
      customer_TRN: Yup.string()
        .matches(/^[A-Za-z0-9]{9,12}$/, "TRN should be alphanumeric and between 9 to 12 characters")
        .required("TRN# is required"),
    }),
  });

  const handleSubmit = async (values) => {
    try {
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
    <div className="mx-auto">
      <div className="bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">New Customer</h1>
        <div className="bg-white p-8 w-1/2">
          <Formik
            initialValues={{
              customer_Type: customerData.customer_GeneralDetails.customer_Type || "",
              customer_PrimaryInfo: customerData.customer_GeneralDetails.customer_PrimaryInfo || {
                salutation: "",
                firstName: "",
                lastName: ""
              },
              customer_CompanyName: customerData.customer_GeneralDetails.customer_CompanyName || "",
              customer_DisplayName: customerData.customer_GeneralDetails.customer_DisplayName || "",
              customer_Email: customerData.customer_GeneralDetails.customer_Email || "",
              customer_Contact: customerData.customer_GeneralDetails.customer_Contact || { workPhone: "", mobilePhone: "" },
              customer_OtherDetails: customerData.customer_OtherDetails || { customer_TRN: "" },
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              {/* Customer Type */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Customer Type*</label>
                <div className="flex-1">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="customer_Type"
                      value="business"
                      className="mr-2"
                    />
                    <span>Business</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <Field
                      type="radio"
                      name="customer_Type"
                      value="individual"
                      className="mr-2"
                    />
                    <span>Individual</span>
                  </label>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Primary Contact*</label>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <Field
                    as="select"
                    name="customer_PrimaryInfo.salutation"
                    className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm p-3"
                  >
                    <option value="">Salutation</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </Field>
                  <Field
                    type="text"
                    name="customer_PrimaryInfo.firstName"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Field
                    type="text"
                    name="customer_PrimaryInfo.lastName"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <ErrorMessage name="customer_PrimaryInfo.firstName" component="div" className="text-red-600" />
                <ErrorMessage name="customer_PrimaryInfo.lastName" component="div" className="text-red-600" />
              </div>

              {/* Company Name */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Company Name*</label>
                <Field
                  type="text"
                  name="customer_CompanyName"
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_CompanyName" component="div" className="text-red-600" />
              </div>

              {/* Display Name */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Display Name*</label>
                <Field
                  type="text"
                  name="customer_DisplayName"
                  placeholder="Display Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_DisplayName" component="div" className="text-red-600" />
              </div>

              {/* Email Address */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                <Field
                  type="email"
                  name="customer_Email"
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_Email" component="div" className="text-red-600" />
              </div>

              {/* Phone Fields */}
              <div className="mb-6 flex items-center space-x-10">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Field
                  type="text"
                  name="customer_Contact.workPhone"
                  placeholder="Work Phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <Field
                  type="text"
                  name="customer_Contact.mobilePhone"
                  placeholder="Mobile Phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="customer_Contact.workPhone" component="div" className="text-red-600" />
                <ErrorMessage name="customer_Contact.mobilePhone" component="div" className="text-red-600" />
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
