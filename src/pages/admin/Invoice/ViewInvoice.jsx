import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { utils, writeFile } from "xlsx";
import companyLogo from "../../../assets/images/CompanyLogo.jpg";

const ViewInvoice = () => {
  const { invoiceId } = useParams(); // Change from quoteId to invoiceId
  const [invoice, setInvoice] = useState(null); // Change quote to invoice
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const jwtLoginToken = localStorage.getItem("jwtLoginToken");
        const response = await axios.get(
          `http://localhost:3000/invoice/${invoiceId}`, // Update API endpoint to /invoice
          {
            headers: { Authorization: `Bearer ${jwtLoginToken}` },
          }
        );

        if (response.data.success) {
          setInvoice(response.data.information.invoice); // Set invoice data
        } else {
          setError("Failed to load invoice details.");
        }
      } catch (err) {
        console.error("Error fetching invoice details:", err);
        setError("Failed to load invoice details. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [invoiceId]);

  const downloadPDF = async () => {
    try {
      const pdfDoc = new jsPDF("p", "mm", "a4");
      const element = document.querySelector(".pdf-content");

      if (!element) {
        console.error("PDF content element not found!");
        return;
      }

      const buttonSection = document.querySelector(".button-section");
      if (buttonSection) buttonSection.style.display = "none";

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      if (buttonSection) buttonSection.style.display = "";

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdfDoc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdfDoc.save(`Invoice_${invoice.invoice_Identifier || "N/A"}.pdf`); // Change filename to Invoice
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const downloadExcel = () => {
    try {
      const data =
        invoice.invoice_Products?.map((product) => ({
          Item: product.product || "N/A",
          Quantity: product.quantity || 0,
          Rate: `AED ${product.rate || "N/A"}`,
          Tax: `${product.tax || 0}%`,
          Amount: `AED ${product.amount || 0}`,
        })) || [];

      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Invoice Items");

      writeFile(workbook, `Invoice_${invoice.invoice_Identifier || "N/A"}.xlsx`); // Change filename to Invoice
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
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
      <div className="p-8 pdf-content">
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
            <p className="text-xl text-gray-600 mt-2">{invoice.invoice_Identifier || "N/A"}</p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mb-6"></div>

        {/* Invoice Details */}
        <div className="flex justify-end items-center mb-4">
          <p className="text-xl text-gray-600">
            <strong>Invoice Date:</strong>{" "}
            {new Date(invoice.invoice_Details?.dateCreated).toLocaleDateString() ||
              "N/A"}
          </p>
        </div>

        {/* Billing Information */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Bill To</h2>
          <p className="text-xl text-gray-600">
            <strong>Name:</strong> {invoice.invoice_Client?.name || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Email:</strong> {invoice.invoice_Client?.email || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Contact:</strong> {invoice.invoice_Client?.contact || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Address:</strong> {invoice.invoice_Client?.address || "N/A"}
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
                <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Qty</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tax</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Discount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoice.invoice_Products?.map((product, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{product.product}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">AED {product.product_Price}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.product_Tax}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.product_Discount}%</td>
                    <td className="border border-gray-300 px-4 py-2">AED {product.product_FinalAmount}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">Subtotal (Tax)</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED {invoice.invoice_Products?.reduce((totalTax, product) => totalTax + product.product_Tax, 0).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">Subtotal  (Amount)</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED {invoice.invoice_Products?.reduce((sum, product) => sum + product.product_FinalAmount, 0).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td colSpan="5" className="text-right font-bold px-4 py-2">Total</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  AED {invoice.invoice_TotalPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Tax Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-xl">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Tax Details</th>
                  <th className="py-2 px-4 text-left">Taxable Amount (AED)</th>
                  <th className="py-2 px-4 text-left">Tax Amount (AED)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-4">Standard Rate (5%)</td>
                  <td className="py-2 px-4">{invoice.invoice_TotalPrice || "N/A"}</td>
                  <td className="py-2 px-4">{invoice.invoice_Products?.reduce((totalTax, product) => totalTax + product.product_Tax, 0).toFixed(2)}</td>
                </tr>
                <tr className="border-t font-bold">
                  <td className="py-2 px-4">Total</td>
                  <td className="py-2 px-4">AED {invoice.invoice_TotalPrice || "N/A"}</td>
                  <td className="py-2 px-4">AED {invoice.invoice_Products?.reduce((totalTax, product) => totalTax + product.product_Tax, 0).toFixed(2)}</td>
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
              Supply, Installation, Testing, Commission, Training. Looking forward to your business.
            </p>
          </div>

          {/* Terms & Conditions Section */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Terms & Conditions</h2>
            <ol className="list-decimal list-inside text-xl text-gray-600 space-y-2">
              <li>Invoice Validity: 07 days</li>
              <li>Payment Terms: 50% Advance, 25% on delivery, 25% after Installation</li>
              <li>Delivery/Installation Time: 1 to 2 weeks / As per actual</li>
              <li>We will provide one year warranty & free services against manufacturing faults.</li>
            </ol>
            <p className="mt-6 text-xl text-gray-600">
              <strong>Note:</strong> For further questions/clarifications, feel free to contact us.
            </p>
          </div>

          {/* Bank Details Section */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Bank A/C Details:</h2>
            <p className="text-xl text-gray-600 space-y-2">
              <strong>Bank:</strong> Mashreq Bank<br />
              <strong>A/C#:</strong> 19101034559<br />
              <strong>IBAN#:</strong> AE730330000019101034559<br />
              <strong>Office Address:</strong> Office # 5, Mezzanine Floor, Ramool Oasis Building, Umm Ramool Dubai<br />
              <strong>Email:</strong> amjad@acssllc.ae
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6 button-section">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default ViewInvoice;
