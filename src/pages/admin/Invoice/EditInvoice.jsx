import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import companyLogo from "../../../assets/images/CompanyLogo.jpg";

const API_URL = process.env.REACT_APP_API_URL;

const EditInvoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoice/${invoiceId}`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          setInvoice(response.data.information.invoice);
        } else {
          setError("Failed to load invoice details.");
        }
      } catch (err) {
        console.error("Error fetching invoice details:", err);
        setError(
          "Failed to load invoice details. Please check your connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  const handleSaveInvoice = () => {
    navigate(`/edit-invoice/${invoiceId}`);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Fetching invoice details... Please wait.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          {/* Logo and Company Information */}
          <div className="flex flex-col items-start">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-36 h-36 mb-4"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                Alpha Capital Security Systems LLC
              </h2>
              <p className="text-lg text-gray-600">Company ID: 1051764</p>
              <p className="text-lg text-gray-600">5th St - Dubai - UAE</p>
              <p className="text-lg text-gray-600">TRN: 104016385700003</p>
              <p className="text-lg text-gray-600">0554084213</p>
              <p className="text-lg text-gray-600">amjad@acssllc.ae</p>
              <p className="text-lg text-gray-600">www.acssllc.ae</p>
            </div>
          </div>

          {/* Invoice Heading */}
          <div className="text-right">
            <h1 className="text-5xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-xl text-gray-600 mt-2">
              {invoice.invoice_Identifier || "N/A"}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mb-6"></div>

        {/* Invoice Details */}
        <div className="flex justify-end items-center mb-4">
          <p className="text-xl text-gray-600">
            <strong>Invoice Date:</strong>{" "}
            {new Date(
              invoice.invoice_Details?.dateCreated
            ).toLocaleDateString() || "N/A"}
          </p>
        </div>

        {/* Billing Information */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Bill To</h2>
          <p className="text-xl text-gray-600">
            <strong>Name:</strong>{" "}
            {invoice.invoice_Client?.client_Name || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Email:</strong>{" "}
            {invoice.invoice_Client?.client_Email || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Contact:</strong>{" "}
            {invoice.invoice_Client?.client_Contact || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Address:</strong>{" "}
            {invoice.invoice_Client?.client_Address || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>TRN:</strong> {invoice.invoice_Client?.trn || "N/A"}
          </p>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Items</h2>

          <table className="w-full border-collapse border border-gray-300 mt-4 text-xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Item
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Qty
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Rate
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  VAT
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Discount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {invoice.invoice_Products?.map((product, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {product.product}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      AED {product.product_Price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.product_Tax}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.product_Discount}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      AED {product.product_FinalAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">
                  Subtotal (VAT)
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED{" "}
                  {invoice.invoice_Products?.reduce(
                    (totalTax, product) => totalTax + product.product_Tax,
                    0
                  )}
                </td>
              </tr>

              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">
                  Subtotal (Amount)
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED{" "}
                  {invoice.invoice_Products?.reduce(
                    (sum, product) => sum + product.product_FinalAmount,
                    0
                  )}
                </td>
              </tr>

              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED {invoice.invoice_TotalPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">VAT Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-xl">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">VAT Details</th>
                  <th className="py-2 px-4 text-left">Tax Amount (AED)</th>
                  <th className="py-2 px-4 text-left">VAT Amount (AED)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-4">Standard Rate (5%)</td>
                  <td className="py-2 px-4">
                    {invoice.invoice_TotalPrice || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {invoice.invoice_Products?.reduce(
                      (totalTax, product) => totalTax + product.product_Tax,
                      0
                    )}
                  </td>
                </tr>
                <tr className="border-t font-bold">
                  <td className="py-2 px-4">Total</td>
                  <td className="py-2 px-4">
                    AED {invoice.invoice_TotalPrice || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    AED{" "}
                    {invoice.invoice_Products?.reduce(
                      (totalTax, product) => totalTax + product.product_Tax,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mt-6"></div>

        {/* Notes and Terms & Conditions */}
        <div className="mt-6 pl-7">
          {/* Notes Section */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Notes</h2>
            <p className="text-xl text-gray-600">
              Supply, Installation, Testing, Commission, Training. Looking
              forward to your business.
            </p>
          </div>

          {/* Terms & Conditions Section */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Terms & Conditions
            </h2>
            <ol className="list-decimal list-inside text-xl text-gray-600 space-y-2">
              <li>Invoice Validity: 07 days</li>
              <li>
                Payment Terms: 50% Advance, 25% on delivery, 25% after
                Installation
              </li>
              <li>Delivery/Installation Time: 1 to 2 weeks / As per actual</li>
              <li>
                We will provide one year warranty & free services against
                manufacturing faults.
              </li>
            </ol>
            <p className="mt-6 text-xl text-gray-600">
              <strong>Authorized Signature:</strong>
            </p>
            <div className="w-64 h-16 border-dashed border-2 border-gray-400 mt-4"></div>
          </div>
        </div>

        {/* Buttons for Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSaveInvoice}
            className="bg-green-500 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
