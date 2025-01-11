import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // You can use icons like these for email and phone

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    customerType: "business",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    phone: "",
    phoneType: "work",
    address: "",
    remarks: "",
  });

  const [activeTab, setActiveTab] = useState("otherDetails");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">New Customer</h2>
        <form className="space-y-6 mt-6">
          {/* Customer Type */}
          <div className="flex items-center mb-6">
            <label className="mr-4">Customer Type:</label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="customerType"
                value="business"
                checked={customer.customerType === "business"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Business</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="customerType"
                value="individual"
                checked={customer.customerType === "individual"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Individual</span>
            </label>
          </div>

          {/* Primary Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salutation
              </label>
              <select
                name="salutation"
                value={customer.salutation}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              >
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Miss.</option>
                <option>Dr.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={customer.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={customer.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={customer.companyName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name*
              </label>
              <input
                type="text"
                name="displayName"
                value={customer.displayName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                placeholder="Display Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex items-center border rounded-md shadow-sm">
                <FaEnvelope className="ml-2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border-none rounded-md shadow-sm"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="flex items-center border rounded-md shadow-sm">
                <FaPhoneAlt className="ml-2 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border-none rounded-md shadow-sm"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <ul className="flex space-x-6 border-b-2 border-gray-300 pb-3 mb-6">
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "otherDetails"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("otherDetails")}
              >
                Other Details
              </div>
            </li>
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "address"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("address")}
              >
                Address
              </div>
            </li>
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "contactPersons"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("contactPersons")}
              >
                Contact Persons
              </div>
            </li>
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "customFields"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("customFields")}
              >
                Custom Fields
              </div>
            </li>
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "reportingTags"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("reportingTags")}
              >
                Reporting Tags
              </div>
            </li>
            <li className="nav-item">
              <div
                role="tab"
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === "remarks"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => handleTabClick("remarks")}
              >
                Remarks
              </div>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content mb-7">
            {/* Other Details Tab */}
            {/* Other Details Tab */}
            {activeTab === "otherDetails" && (
              <div className="tab-pane active">
                <div className="space-y-6">
                  {/* Company ID */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Company ID
                    </label>
                    <input
                      className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600"
                      type="text"
                    />
                  </div>

                  {/* Currency */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Currency
                    </label>
                    <input
                      className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600"
                      type="text"
                      value="AED - UAE Dirham"
                      disabled
                    />
                  </div>

                  {/* Tax Rate */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Tax Rate
                    </label>
                    <select className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600">
                      <option>Select a Tax</option>
                      {/* Other options */}
                    </select>
                  </div>

                  {/* Opening Balance */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Opening Balance
                    </label>
                    <input
                      className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600"
                      type="text"
                      value="AED"
                      disabled
                    />
                  </div>

                  {/* Payment Terms */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Payment Terms
                    </label>
                    <select className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600">
                      <option>Due On Receipt</option>
                      {/* Other options */}
                    </select>
                  </div>

                  {/* Enable Portal */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Enable Portal?
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="enablePortal"
                        checked={customer.enablePortal}
                        onChange={handleChange}
                        className="form-checkbox text-blue-600"
                      />
                      <span className="text-sm text-gray-600">
                        Allow portal access for this customer
                      </span>
                    </div>
                  </div>

                  {/* Portal Language */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Portal Language
                    </label>
                    <select
                      className="mt-1 p-2 border rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-600"
                      name="portalLanguage"
                      value={customer.portalLanguage}
                      onChange={handleChange}
                    >
                      <option>English</option>
                      {/* Add more language options */}
                    </select>
                  </div>

                  {/* Documents */}
                  <div className="form-group flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">
                      Documents
                    </label>
                    <div className="flex flex-col items-center space-y-2">
                      {/* File Upload Button */}
                      <label
                        htmlFor="file-upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none"
                      >
                        Upload File
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/gif,image/jpeg,image/png,image/bmp,application/pdf,application/doc,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/xml,text/csv,.xml,text/xml"
                      />
                      {/* File Upload Instructions */}
                      <p className="text-gray-500 text-sm mt-1">
                        You can upload a maximum of 10 files, 10MB each
                      </p>
                    </div>
                  </div>

                  {/* Customer Owner */}
                  <div className="form-group mt-6">
                    <div className="text-sm text-gray-600">
                      <strong>Customer Owner:</strong> Assign a user as the
                      customer owner to provide access only to the data of this
                      customer.
                      <a href="#" className="text-blue-600 hover:underline">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div className="tab-pane">
                <div className="space-y-6">
                  {/* Billing Address */}
                  <div className="flex justify-between space-x-6">
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Billing Address
                      </h3>

                      {/* Attention */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Attention
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="billingAttention"
                          value={customer.billingAttention}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Country / Region */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Country / Region
                        </label>
                        <select
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="billingCountry"
                          value={customer.billingCountry}
                          onChange={handleChange}
                        >
                          <option>Select or type to add</option>
                          {/* Add other options here */}
                        </select>
                      </div>

                      {/* Address */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Address
                        </label>
                        <textarea
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="billingAddress"
                          value={customer.billingAddress}
                          onChange={handleChange}
                          placeholder="Street 1"
                        ></textarea>
                      </div>

                      {/* City */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          City
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="billingCity"
                          value={customer.billingCity}
                          onChange={handleChange}
                        />
                      </div>

                      {/* State */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          State
                        </label>
                        <select
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="billingState"
                          value={customer.billingState}
                          onChange={handleChange}
                        >
                          <option>Select or type to add</option>
                          {/* Add other options here */}
                        </select>
                      </div>

                      {/* Zip Code */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Zip Code
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="billingZipCode"
                          value={customer.billingZipCode}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Phone
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="billingPhone"
                          value={customer.billingPhone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Fax Number */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Fax Number
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="billingFax"
                          value={customer.billingFax}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Shipping Address
                      </h3>

                      {/* Attention */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Attention
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="shippingAttention"
                          value={customer.shippingAttention}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Country / Region */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Country / Region
                        </label>
                        <select
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="shippingCountry"
                          value={customer.shippingCountry}
                          onChange={handleChange}
                        >
                          <option>Select or type to add</option>
                          {/* Add other options here */}
                        </select>
                      </div>

                      {/* Address */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Address
                        </label>
                        <textarea
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="shippingAddress"
                          value={customer.shippingAddress}
                          onChange={handleChange}
                          placeholder="Street 1"
                        ></textarea>
                      </div>

                      {/* City */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          City
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="shippingCity"
                          value={customer.shippingCity}
                          onChange={handleChange}
                        />
                      </div>

                      {/* State */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          State
                        </label>
                        <select
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          name="shippingState"
                          value={customer.shippingState}
                          onChange={handleChange}
                        >
                          <option>Select or type to add</option>
                          {/* Add other options here */}
                        </select>
                      </div>

                      {/* Zip Code */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Zip Code
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="shippingZipCode"
                          value={customer.shippingZipCode}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Phone
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="shippingPhone"
                          value={customer.shippingPhone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Fax Number */}
                      <div className="form-group">
                        <label className="text-sm font-semibold text-gray-600">
                          Fax Number
                        </label>
                        <input
                          className="mt-1 p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-600"
                          type="text"
                          name="shippingFax"
                          value={customer.shippingFax}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="flex items-center">
                      <span className="font-semibold text-orange-500">
                        Note:
                      </span>
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>
                        You can add and manage additional addresses from
                        Customers and Vendors details section.
                      </li>
                      <li>
                        View and edit the address format of your transactions
                        under Settings &gt; Preferences &gt; Customers and
                        Vendors.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Person Tab */}
            {activeTab === "contactPersons" && (
              <div className="tab-pane">
                {/* Table with contact person information */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          SALUTATION
                        </th>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          FIRST NAME
                        </th>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          LAST NAME
                        </th>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          EMAIL ADDRESS
                        </th>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          WORK PHONE
                        </th>
                        <th className="px-4 py-2 border-b text-left text-sm text-gray-700">
                          MOBILE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add your contact persons here */}
                      {/* Placeholder row when no data is available */}
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-4 text-center text-gray-600"
                        >
                          No contact persons available.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Add Contact Person Button */}
                <div className="flex justify-start mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add Contact Person
                  </button>
                </div>
              </div>
            )}

            {activeTab === "customFields" && (
              <div className="tab-pane">
                {/* Content when no custom fields have been created */}
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    Start adding custom fields for your Customers and Vendors by
                    going to{" "}
                    <span className="text-blue-500 font-semibold cursor-pointer">
                      Settings{" "}
                      <span className="inline-block transform ">⇒</span>{" "}
                      Preferences{" "}
                      <span className="inline-block transform ">⇒</span>{" "}
                      Customers
                    </span>
                  </p>
                  <p className="text-gray-500 mt-2">
                    You can also refine the address format of your Customers and
                    Vendors from there.
                  </p>
                </div>
              </div>
            )}

            {/* Reporting Tab */}
            {activeTab === "reportingTags" && (
              <div className="tab-pane">
                {/* Content when no reporting tags have been created */}
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    You&apos;ve not created any Reporting Tags.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Start creating reporting tags by going to{" "}
                    <span className="text-blue-500 font-semibold cursor-pointer">
                      More Settings{" "}
                      <span className="inline-block transform ">⇒</span>
                    </span>{" "}
                    Reporting Tags
                  </p>
                </div>
              </div>
            )}

            {/* Remarks Tab */}
            {activeTab === "remarks" && (
              <div className="tab-pane">
                <div className="form-group">
                  <label
                    htmlFor="remarks"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Remarks (For Internal Use)
                  </label>
                  <textarea
                    id="remarks"
                    rows="3"
                    className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm w-full sm:w-2/3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="remarks"
                    value={customer.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks here"
                    aria-describedby="remarks-help"
                  ></textarea>
                  <small
                    id="remarks-help"
                    className="text-xs text-gray-500"
                  ></small>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
