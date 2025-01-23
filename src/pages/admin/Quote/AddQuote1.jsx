import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faUser,
  faHashtag,
  faCalendarAlt,
  faProjectDiagram,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL;

const AddQuote1 = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    client_Name: "",
  });

  const [rows, setRows] = useState([
    {
      itemDetails: "20mm Holesaw Cutter SS Techno",
      description: "",
      quantity: 100,
      rate: 28.0,
      discount: 0,
      tax: "Standard Rate",
      amount: 28.0,
    },
  ]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [terms, setTerms] = useState(
    "Quotation Validity: 07 days\nPayment Terms: 50% Advance, 25% on delivery, 25% after installation\nDelivery/Installation Time: 1 to 2 weeks / As per actual.\nWe will provide one year warranty & free services against manufacturing faults."
  );

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        itemDetails: "",
        description: "",
        quantity: 0,
        rate: 0.0,
        discount: 0,
        tax: "Standard Rate",
        amount: 0.0,
      },
    ]);
  };

  const deleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const calculateTotals = () => {
    const subTotal = rows.reduce(
      (acc, row) => acc + row.quantity * row.rate - row.discount,
      0
    );
    const tax = subTotal * 0.05; // Assuming 5% tax rate
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const { subTotal, tax, total } = calculateTotals();

  const handleSaveDraft = () => {
    alert("Quote saved as draft!");
    navigate("/dashboard");
  };

  const handleSaveAndSend = () => {
    alert("Quote saved and sent!");
    navigate("/confirmation");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/dashboard");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">New Quote</h1>

      {/* Customer Details Section */}
      <div className="bg-white p-4 mb-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Customer Name */}
          <div className="relative">
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Customer Name
  </label>
  <div className="relative">
    <FontAwesomeIcon
      icon={faUser}
      className="absolute left-2 top-2 text-gray-500"
    />
    <input
      type="text"
      placeholder="Add customer"
      className="w-full max-w-sm pl-8 p-2 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>

          {/* Quote Number */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Quote #
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faHashtag}
                className="absolute left-2 top-2 text-gray-500"
              />
              <input
                type="text"
                value="Q1-000115"
                className="w-full max-w-sm pl-8 p-2 border text-sm bg-gray-100 rounded"
                readOnly
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Reference #
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faHashtag}
                className="absolute left-2 top-2 text-gray-500"
              />
              <input
                type="text"
                value=""
                className="w-full max-w-sm pl-8 p-2 border text-sm bg-gray-100 rounded"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Quote Date and Expiry Date in the same line */}
            <div className="flex gap-4">
              {/* Quote Date */}
              <div className="flex-1 relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Quote Date
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="absolute left-2 top-2 text-gray-500"
                  />
                  <input
                    type="date"
                    value="2025-01-21"
                    className="w-full max-w-sm pl-8 p-2 border text-sm bg-gray-100 rounded"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="flex-1 relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="absolute left-2 top-2 text-gray-500"
                  />
                  <input
                    type="date"
                    value="2025-01-21"
                    className="w-full max-w-sm pl-8 p-2 border text-sm bg-gray-100 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Salesperson */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Salesperson
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-2 top-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Enter salesperson name"
                className="w-full max-w-sm pl-8 p-2 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Project Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Project Name
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faProjectDiagram}
                className="absolute left-2 top-2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Enter project name"
                className="w-full max-w-sm pl-8 p-2 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Item Table Section */}
      <div className="bg-white p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Item Table</h2>
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="border p-1 text-left">Item Details</th>
              <th className="border p-1 text-center">Qty</th>
              <th className="border p-1 text-center">Rate</th>
              <th className="border p-1 text-center">Disc.</th>
              <th className="border p-1 text-center">Tax</th>
              <th className="border p-1 text-center">Amt</th>
              <th className="border p-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 text-sm">
                <td className="border p-1">
                  <input
                    type="text"
                    value={row.itemDetails}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index
                            ? { ...r, itemDetails: e.target.value }
                            : r
                        )
                      )
                    }
                    placeholder="Enter details"
                    className="w-auto p-1 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="border p-1 text-center">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index ? { ...r, quantity: +e.target.value } : r
                        )
                      )
                    }
                    className="w-auto p-1 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="border p-1 text-center">
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index ? { ...r, rate: +e.target.value } : r
                        )
                      )
                    }
                    className="w-auto p-1 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="border p-1 text-center">
                  <input
                    type="number"
                    value={row.discount}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index ? { ...r, discount: +e.target.value } : r
                        )
                      )
                    }
                    className="w-auto p-1 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="border p-1 text-center">
                  <select
                    value={row.tax}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index ? { ...r, tax: e.target.value } : r
                        )
                      )
                    }
                    className="w-auto p-1 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Standard Rate">Standard Rate</option>
                    <option value="Reduced Rate">Reduced Rate</option>
                    <option value="Zero Rate">Zero Rate</option>
                  </select>
                </td>
                <td className="border p-1 text-center">
                  <span className="text-gray-800 font-semibold">
                    {(row.quantity * row.rate - row.discount).toFixed(2)}
                  </span>
                </td>
                <td className="border p-1 text-center">
                  <button
                    onClick={() => deleteRow(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-start">
          <button
            onClick={addNewRow}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Row
          </button>
        </div>
      </div>

      {/* Subtotal Section */}
      <div className="bg-gray p-4 mb-6">
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between border-b py-1">
              <span className="text-gray-700 font-medium">Sub Total</span>
              <span className="text-gray-800 font-semibold">
                {subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span className="text-gray-700 font-medium">Standard Rate [5%]</span>
              <span className="text-gray-800 font-semibold">{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-700 font-medium text-lg">Total (AED)</span>
              <span className="text-gray-900 font-bold text-lg">
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions and File Upload Section */}
      <div className="flex justify-between gap-4 mb-6">
        {/* Terms & Conditions Section */}
        <div className="bg-gray p-4 w-1/2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Terms & Conditions
          </h2>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            rows="6"
            className="w-full p-2 border text-sm rounded focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* File Upload Section */}
        <div className="bg-gray p-4 w-1/2 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Attach File to Quote
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Upload File
          </button>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          {uploadedFile && (
            <span className="mt-2 text-sm text-gray-700">
              {uploadedFile.name}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleSaveDraft}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition"
        >
          Save Draft
        </button>
        <button
          onClick={handleSaveAndSend}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition"
        >
          Save & Send
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddQuote1;
