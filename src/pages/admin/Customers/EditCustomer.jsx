import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisH,
  faFileInvoice,
  faExchangeAlt,
  faEnvelope,
  faPhone,
  faEdit,
  faCoins,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EditCustomer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock customer data
  const customers = [
    {
      name: "TTECh",
      details: "AED0.00",
      contact: "03091005929",
      email: "sohaibmushtaq5@gmail.com",
      type: "Business",
      language: "English",
      portalStatus: "Disabled",
    },
    {
      name: "Customer 2",
      details: "AED1,200.00",
      contact: "03214567890",
      email: "customer2@example.com",
      type: "Individual",
      language: "Arabic",
      portalStatus: "Enabled",
    },
    {
      name: "Customer 3",
      details: "AED3,000.00",
      contact: "03312345678",
      email: "customer3@example.com",
      type: "Business",
      language: "English",
      portalStatus: "Disabled",
    },
  ];

  const navigate = useNavigate();

  // Navigate to Add Customer page
  const handleAddCustomerClick = () => {
    navigate("/add-customers");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r shadow-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Customers</h2>
          <div className="flex gap-2">
            {/* Add Button */}
            <button
              onClick={handleAddCustomerClick}
              className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center text-xs hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} /> {/* "+" Icon */}
            </button>
            {/* Options Button */}
            <button className="bg-gray-100 border border-gray-400 text-black px-3 py-2 rounded-md flex items-center text-xs hover:bg-gray-200">
              <FontAwesomeIcon icon={faEllipsisH} /> {/* "..." Icon */}
            </button>
          </div>
        </div>

        {/* Customer List */}
        <div className="overflow-y-auto h-full">
          {customers.map((customer, index) => (
            <div
              key={index}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedCustomer?.name === customer.name ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <h3 className="font-bold">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {selectedCustomer ? (
          <div>
            {/* Customer Overview */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h1 className="text-2xl font-semibold">{selectedCustomer.name}</h1>
              <div className="space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
                  <FontAwesomeIcon icon={faFileInvoice} className="mr-2" /> New Invoice
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 flex items-center">
                  <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" /> New Transaction
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-3 gap-6">
              {/* Contact Details */}
              <div className="col-span-1 border p-4 rounded bg-white shadow-sm">
                <h2 className="font-semibold mb-2">Contact Details</h2>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {selectedCustomer.email}
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {selectedCustomer.contact}
                </p>
                <button className="mt-4 text-blue-500 hover:underline flex items-center">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                </button>
              </div>

              {/* Receivables */}
              <div className="col-span-2 border p-4 rounded bg-white shadow-sm">
                <h2 className="font-semibold mb-2">Receivables</h2>
                <div className="flex justify-between">
                  <p>Outstanding Receivables</p>
                  <p className="font-bold">{selectedCustomer.details}</p>
                </div>
                <button className="mt-4 text-blue-500 hover:underline flex items-center">
                  <FontAwesomeIcon icon={faCoins} className="mr-1" /> Enter Opening Balance
                </button>
              </div>
            </div>

            {/* Income Graph */}
            <div className="mt-6 border p-4 rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2">Income</h2>
              <p className="text-sm text-gray-500">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                This chart is displayed in the organization's base currency.
              </p>
              <div className="h-32 bg-gray-200 mt-4 flex items-center justify-center">
                <p>Graph Placeholder</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a customer to view details.</p>
        )}
      </div>
    </div>
  );
};

export default EditCustomer;
