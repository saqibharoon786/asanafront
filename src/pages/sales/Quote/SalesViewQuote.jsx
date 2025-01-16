import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { utils, writeFile } from "xlsx";
import companyLogo from "../../../assets/images/CompanyLogo.jpg";

const API_URL = process.env.REACT_APP_API_URL;

const SalesViewQuote = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  useEffect(() => {
    const fetchQuoteDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/quote/${quoteId}`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });

        if (response.data.success) {
          setQuote(response.data.information.quote);
        } else {
          setError("Failed to load quote details.");
        }
      } catch (err) {
        console.error("Error fetching quote details:", err);
        setError(
          "Failed to load quote details. Please check your connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteDetails();
  }, [quoteId]);

  const downloadPDF = async () => {
    try {
      // Create a new jsPDF document with A4 size
      const pdfDoc = new jsPDF("p", "mm", "a4");

      // Select the element that contains the content for the PDF
      const element = document.querySelector(".pdf-content");

      if (!element) {
        console.error("PDF content element not found!");
        return; // Exit if the element is not found
      }

      // Temporarily hide the button section if it exists to prevent it from appearing in the PDF
      const buttonSection = document.querySelector(".button-section");
      if (buttonSection) buttonSection.style.display = "none";

      // Capture the content of the element as a low-quality canvas (to reduce file size)
      const canvas = await html2canvas(element, {
        scale: 1, // Reduce scale for lower resolution and smaller file size
        useCORS: true, // Handle cross-origin images
        allowTaint: true, // Allow tainted images (images from different origins)
      });

      // Revert the button section visibility after canvas capture
      if (buttonSection) buttonSection.style.display = "";

      // Convert the canvas to a JPEG image with much lower quality (to reduce file size)
      const imgData = canvas.toDataURL("image/jpeg", 0.2); // Reduced quality to 20%

      // Calculate the dimensions for the A4 page
      const pageHeight = 297; // Height of A4 paper in mm
      const pageWidth = 210; // Width of A4 paper in mm
      const imgHeight = (canvas.height * pageWidth) / canvas.width; // Adjust image height based on width

      // Track the current position on the PDF page (starting at the top)
      let position = 0;
      let pageNum = 1; // Page number tracker

      // Loop through the image and add it to the PDF, splitting it into pages if necessary
      while (position < imgHeight) {
        // Add the image to the current page, with adjusted position
        pdfDoc.addImage(imgData, "JPEG", 0, -position, pageWidth, imgHeight);

        // Add page number at the footer
        const footerText = `Page ${pageNum}`;
        pdfDoc.setFontSize(10); // Adjust font size for footer text
        pdfDoc.text(footerText, pageWidth - 20, pageHeight - 10); // Position of footer text

        // Move to the next page position
        position += pageHeight;

        // If content exceeds the current page, add a new page
        if (position < imgHeight) {
          pdfDoc.addPage();
          pageNum++; // Increment page number
        }
      }

      // Save the PDF with a dynamic filename based on the quote identifier
      const fileName = `Quote${quote.quote_Identifier || "N/A"}.pdf`;
      pdfDoc.save(fileName);
    } catch (error) {
      // Log any errors that occur during the PDF generation process
      console.error("Error generating PDF:", error);
    }
  };

  const downloadExcel = () => {
    try {
      const data =
        quote.quote_Products?.map((product) => ({
          Item: product.product || "N/A",
          Quantity: product.quantity || 0,
          Rate: `AED ${product.rate || "N/A"}`,
          Tax: `${product.tax || 0}%`,
          Amount: `AED ${product.amount || 0}`,
        })) || [];

      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Quote Items");

      writeFile(
        workbook,
        `Quote_${quote.quote_Identifier || "N/A"}.xlsx`
      );
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };

  const handleNavigateToEditQuote = () => {
    navigate(`/sales/edit-quote/${quoteId}`);
  };
  const hasDiscount = quote?.quote_Products?.some(
    (product) => product.product_DiscountPercentage > 0
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Fetching quote details... Please wait.
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

          {/* Quote Heading */}
          <div className="text-right">
            <h1 className="text-5xl font-bold text-gray-800">QUOTE</h1>
            <p className="text-xl text-gray-600 mt-2">
              {quote.quote_Identifier || "N/A"}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mb-6"></div>

        {/* Quote Details */}
        <div className="flex justify-end items-center mb-4">
          <p className="text-xl text-gray-600">
            <strong>Quote Date:</strong>{" "}
            {new Date(
              quote.quote_Details?.dateCreated
            ).toLocaleDateString() || "N/A"}
          </p>
        </div>

        {/* Billing Information */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Bill To</h2>
          <p className="text-xl text-gray-600">
            <strong>Name:</strong>{" "}
            {quote.quote_Client?.client_Name || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Email:</strong>{" "}
            {quote.quote_Client?.client_Email || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Contact:</strong>{" "}
            {quote.quote_Client?.client_Contact || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Address:</strong>{" "}
            {quote.quote_Client?.client_Address || "N/A"}
          </p>
          <p className="text-xl text-gray-600">
            <strong>TRN:</strong> {quote.quote_Client?.trn || "N/A"}
          </p>
        </div>

        {/* Initial Payment Information */}
        <p className="text-xl text-gray-600">
          <strong>Initial Payment</strong>{" "}
          {quote.quote_InitialPayment || "N/A"}%
        </p>

        {/* Items Table */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Items</h2>

          <table className="w-full border-collapse border border-gray-300 mt-4 text-xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  S#
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Item
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Qty
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Rate (AED)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Tax
                </th>
                {quote.quote_Products.some(
                  (product) => product.product_DiscountPercentage > 0
                ) && (
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Discount %
                  </th>
                )}
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Amount (AED)
                </th>
              </tr>
            </thead>

            <tbody>
              {quote.quote_Products?.map((product, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.product}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {product.product_BeforeTaxPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {product.product_Tax}
                  </td>
                  {quote.quote_Products.some(
                    (prod) => prod.product_DiscountPercentage > 0
                  ) && (
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {product.product_DiscountPercentage}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {product.product_AfterDiscountPrice}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td
                  colSpan={
                    quote.quote_Products.some(
                      (product) => product.product_DiscountPercentage > 0
                    )
                      ? 6
                      : 5
                  }
                  className="text-right font-bold px-4 py-2"
                >
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold text-right">
                  AED {quote.quote_BeforeTaxPrice}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={
                    quote.quote_Products.some(
                      (product) => product.product_DiscountPercentage > 0
                    )
                      ? 6
                      : 5
                  }
                  className="text-right font-bold px-4 py-2"
                >
                  VAT Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold text-right">
                  AED{" "}
                  {quote?.quote_Products?.reduce(
                    (totalTax, product) =>
                      totalTax + (product.product_Tax || 0),
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={
                    quote.quote_Products.some(
                      (product) => product.product_DiscountPercentage > 0
                    )
                      ? 6
                      : 5
                  }
                  className="text-right font-bold px-4 py-2"
                >
                  Grand Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold text-right">
                  AED {quote.quote_AfterDiscountPrice}
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
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Standard Rate (5%)
                  </td>
                  <td className="py-2 px-4 text-right">
                    {quote.quote_BeforeTaxPrice || "0"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {quote?.quote_Products?.reduce(
                      (totalTax, product) =>
                        totalTax + (product.product_Tax || 0),
                      0
                    )}{" "}
                  </td>
                </tr>
                <tr className="border-t font-bold text-right">
                  <td className="py-2 px-4">Total</td>
                  <td className="py-2 px-4">
                    AED {quote.quote_BeforeTaxPrice || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    AED{" "}
                    {quote?.quote_Products?.reduce(
                      (totalTax, product) =>
                        totalTax + (product.product_Tax || 0),
                      0
                    )}{" "}
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
              <li>Quote Validity: 07 days</li>
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
          </div>
        </div>

        {/* Buttons for Download */}
        <div className="button-section flex justify-between mt-6">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Download as PDF
          </button>
          <button
            onClick={downloadExcel}
            className="bg-green-500 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Download as Excel
          </button>

          <button
            onClick={handleNavigateToEditQuote}
            className="bg-green-500 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesViewQuote;
