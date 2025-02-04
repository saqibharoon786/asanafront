import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import CustomerForm from "../Customer/addCustomer/CustomerForm";
import {
  FaUser,
  FaHashtag,
  FaUserTie,
  FaCalendarAlt,
  FaPercentage,
  FaFileAlt,
} from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL;
const jwtLoginToken = localStorage.getItem("jwtLoginToken");
const TAX = 0.05;

const AddInvoice = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [productRows, setProductRows] = useState([
    {
      product: "",
      quantity: 0,
      product_SellingPrice: 0,
      product_BeforeTaxPrice: 0,
      product_Tax: 0,
      product_AfterTaxPrice: 0,
      product_DiscountPercentage: 0,
      product_Discount: 0,
      product_AfterDiscountPrice: 0,
    },
  ]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [salesEmployees, setSalesEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoicePayload, setInvoicePayload] = useState({
    invoice_Customer: "",
    invoice_Products: [],
    invoice_SalesPerson: "",
    invoice_InitialPayment: "",
    invoice_BeforeTaxPrice: 0,
    invoice_TotalTax: 0,
    invoice_AfterDiscountPrice: 0,
    invoice_Subject: "",
    invoice_Image: null,
    previewUrl: null,
    invoice_Project: "",
    invoice_Date: "",
    invoice_DueDate: "",
    invoice_ReferenceNumber: "",
  });



  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/get-products`, {
        headers: { Authorization: `Bearer ${jwtLoginToken}` },
      });

      if (response.data.success) {
        setFetchedProducts(response.data.information.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSalesEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/department/get-sales-employees`,
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );
      if (response.data.success && response.data.information?.users) {
        setSalesEmployees(response.data.information.users);
      }
    } catch (err) {
      console.error("Error fetching sales employees:", err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/customer/get-all-customers`,
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );
      if (response.data.success && response.data.information?.customers) {
        setCustomers(response.data.information.customers);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSalesEmployees();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [showCustomerForm]);

  useEffect(() => {
    updateInvoiceSummary();
  }, [productRows, showCustomerForm]);

  const calculateRowValues = (row) => {
    const product_BeforeTaxPrice = row.quantity * row.product_SellingPrice;
    const product_Tax = product_BeforeTaxPrice * TAX; // 5% Tax
    const product_AfterTaxPrice = product_BeforeTaxPrice + product_Tax;
    const product_Discount =
      (product_AfterTaxPrice * row.product_DiscountPercentage) / 100;
    const product_AfterDiscountPrice = product_AfterTaxPrice - product_Discount;

    return {
      ...row,
      product_BeforeTaxPrice,
      product_Tax,
      product_AfterTaxPrice,
      product_Discount,
      product_AfterDiscountPrice,
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInvoicePayload((prevPayload) => ({
      ...prevPayload,
      invoice_Image: file,
    }));
  };

  const handleProductChange = (index, productName) => {
    const product = fetchedProducts.find(
      (prod) => prod.product_Name === productName
    );
    const newRows = [...productRows];
    newRows[index] = calculateRowValues({
      ...newRows[index],
      product: productName,
      product_SellingPrice: product ? product.product_SellingPrice : 0,
    });
    setProductRows(newRows);
  };

  const handleRateChange = (index, rate) => {
    const newRows = [...productRows];
    newRows[index].product_SellingPrice =
      isNaN(rate) || rate === "" ? 0 : Number(rate); // Allow empty input temporarily
    newRows[index] = calculateRowValues({
      ...newRows[index],
      product_SellingPrice: newRows[index].product_SellingPrice,
    });
    setProductRows(newRows);
  };

  const handleQuantityChange = (index, quantity) => {
    const newRows = [...productRows];
    newRows[index].quantity =
      isNaN(quantity) || quantity === "" ? 0 : Number(quantity); // Allow empty input temporarily
    newRows[index] = calculateRowValues({
      ...newRows[index],
      quantity: newRows[index].quantity,
    });
    setProductRows(newRows);
  };

  const handleDiscountChange = (index, discountPercentage) => {
    const newRows = [...productRows];
    newRows[index].product_DiscountPercentage =
      isNaN(discountPercentage) || discountPercentage === ""
        ? 0
        : Number(discountPercentage); // Allow empty input temporarily
    newRows[index] = calculateRowValues({
      ...newRows[index],
      product_DiscountPercentage: newRows[index].product_DiscountPercentage,
    });
    setProductRows(newRows);
  };

  const addRow = () => {
    setProductRows([
      ...productRows,
      {
        product: "",
        quantity: 0,
        product_SellingPrice: 0,
        product_BeforeTaxPrice: 0,
        product_Tax: 0,
        product_AfterTaxPrice: 0,
        product_DiscountPercentage: 0,
        product_Discount: 0,
        product_AfterDiscountPrice: 0,
      },
    ]);
  };

  const deleteRow = (index) => {
    const newRows = productRows.filter((_, i) => i !== index);
    setProductRows(newRows);
  };

  const updateInvoiceSummary = () => {
    const totalBeforeTax = productRows.reduce(
      (sum, row) => sum + row.product_BeforeTaxPrice,
      0
    );
    const totalTax = productRows.reduce((sum, row) => sum + row.product_Tax, 0);
    const totalAfterDiscount = productRows.reduce(
      (sum, row) => sum + row.product_AfterDiscountPrice,
      0
    );

    setInvoicePayload((prevPayload) => ({
      ...prevPayload,
      invoice_BeforeTaxPrice: totalBeforeTax,
      invoice_TotalTax: totalTax,
      invoice_AfterDiscountPrice: totalAfterDiscount,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("invoice_Customer", invoicePayload.invoice_Customer);
    formData.append("invoice_Products", JSON.stringify(productRows)); // Correctly converting to JSON string
    formData.append("invoice_SalesPerson", invoicePayload.invoice_SalesPerson);
    formData.append("invoice_InitialPayment", invoicePayload.invoice_InitialPayment.toString());
    formData.append("invoice_BeforeTaxPrice", invoicePayload.invoice_BeforeTaxPrice.toString());
    formData.append("invoice_TotalTax", invoicePayload.invoice_TotalTax.toString());
    formData.append("invoice_AfterDiscountPrice", invoicePayload.invoice_AfterDiscountPrice.toString());
    formData.append("invoice_Subject", invoicePayload.invoice_Subject);
    if (invoicePayload.invoice_Image) {
      formData.append("invoice_Image", invoicePayload.invoice_Image);
    }
    formData.append("invoice_Project", invoicePayload.invoice_Project);
    formData.append("invoice_Date", invoicePayload.invoice_Date);
    formData.append("invoice_DueDate", invoicePayload.invoice_DueDate);
    formData.append("invoice_ReferenceNumber", invoicePayload.invoice_ReferenceNumber);
  
    // Debugging formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await axios.post(
        `${API_URL}/invoice/create-invoice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
  
      if (response.data.success) {
        // Reset invoicePayload and productRows to their default states
        setInvoicePayload({
          invoice_Customer: "",
          invoice_Products: [], // This will be reset in the form
          invoice_SalesPerson: "",
          invoice_InitialPayment: "",
          invoice_BeforeTaxPrice: 0,
          invoice_TotalTax: 0,
          invoice_AfterDiscountPrice: 0,
          invoice_Subject: "",
          invoice_Project: "",
          invoice_Image: null,
          previewUrl: null,
          invoice_Date: "",
          invoice_DueDate: "",
          invoice_ReferenceNumber: "",
        });
  
        setProductRows([
          {
            product: "",
            quantity: 0,
            product_SellingPrice: 0,
            product_BeforeTaxPrice: 0,
            product_Tax: 0,
            product_AfterTaxPrice: 0,
            product_DiscountPercentage: 0,
            product_Discount: 0,
            product_AfterDiscountPrice: 0,
          },
        ]);
  
        alert("Invoice Created");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };;


return (
  <form onSubmit={handleSubmit} className="p-4">
    {/* Customer Name */}
    <div className="mb-6 w-1/4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="customerName"
      >
        <FaUser className="inline-block mr-2" /> Customer Name
      </label>
      <div className="flex items-center space-x-2">
        <Select
          id="customerName"
          options={customers.map((customer) => ({
            value: customer._id,
            label: customer.customer_GeneralDetails.customer_DisplayName,
          }))}
          value={{
            value: invoicePayload.invoice_Customer,
            label:
              customers.find((c) => c._id === invoicePayload.invoice_Customer)
                ?.customer_GeneralDetails.customer_DisplayName || "",
          }}
          onChange={(selectedOption) =>
            setInvoicePayload((prevPayload) => ({
              ...prevPayload,
              invoice_Customer: selectedOption ? selectedOption.value : "",
            }))
          }
          placeholder="Select Customer"
          className="mt-1 block w-full"
        />
        <button
          type="button"
          onClick={() => setShowCustomerForm(true)}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>
    </div>

    {showCustomerForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[90%] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Customer</h2>
            <button
              onClick={() => setShowCustomerForm(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <CustomerForm
              onClose={() => setShowCustomerForm(false)} // Close the modal after adding
              onCustomerAdded={(newCustomer) => {
                setCustomers((prev) => [...prev, newCustomer]); // Add the new customer locally
                setInvoicePayload((prevPayload) => ({
                  ...prevPayload,
                  invoice_Customer: newCustomer._id, // Set the newly added customer
                }));
                setShowCustomerForm(false); // Close the modal
              }}
            />
          </div>
        </div>
      </div>
    )}

    {/* Reference Number */}
    <div className="mb-6 w-1/4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="referenceNumber"
      >
        <FaHashtag className="inline-block mr-2" /> Reference Number
      </label>
      <input
        type="text"
        id="referenceNumber"
        value={invoicePayload.invoice_ReferenceNumber}
        onChange={(e) =>
          setInvoicePayload((prevPayload) => ({
            ...prevPayload,
            invoice_ReferenceNumber: e.target.value,
          }))
        }
        placeholder="Enter reference number"
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>

    {/* Sales Person */}
    <div className="mb-6 w-1/4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="salesPerson"
      >
        <FaUserTie className="inline-block mr-2" /> Salesperson
      </label>
      <select
        id="salesPerson"
        value={invoicePayload.invoice_SalesPerson}
        onChange={(e) =>
          setInvoicePayload((prevPayload) => ({
            ...prevPayload,
            invoice_SalesPerson: e.target.value,
          }))
        }
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select Salesperson</option>
        {salesEmployees.map((employee) => (
          <option key={employee.userId} value={employee.userId}>
            {employee.name}
          </option>
        ))}
      </select>
    </div>

    {/* Invoice Dates */}
    <div className="flex space-x-4 mb-6 w-1/4">
      <div className="flex-1">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="invoiceDate"
        >
          <FaCalendarAlt className="inline-block mr-2" /> Invoice Date
        </label>
        <input
          type="date"
          id="invoiceDate"
          value={invoicePayload.invoice_Date}
          onChange={(e) =>
            setInvoicePayload((prevPayload) => ({
              ...prevPayload,
              invoice_Date: e.target.value,
            }))
          }
          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex-1">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="dueDate"
        >
          <FaCalendarAlt className="inline-block mr-2" /> Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={invoicePayload.invoice_DueDate}
          onChange={(e) =>
            setInvoicePayload((prevPayload) => ({
              ...prevPayload,
              invoice_DueDate: e.target.value,
            }))
          }
          className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>

    {/* Initial Payment */}
    <div className="mb-6 w-1/4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="initialPayment"
      >
        <FaPercentage className="inline-block mr-2" /> Initial Payment (%)
      </label>
      <input
        type="text"
        id="initialPayment"
        value={invoicePayload.invoice_InitialPayment}
        onChange={(e) =>
          setInvoicePayload((prevPayload) => ({
            ...prevPayload,
            invoice_InitialPayment: e.target.value,
          }))
        }
        placeholder="Enter Initial Payment"
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>

    {/* Subject */}
    <div className="mb-6 w-1/4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="subject"
      >
        <FaFileAlt className="inline-block mr-2" /> Subject
      </label>
      <input
        type="text"
        id="subject"
        value={invoicePayload.invoice_Subject}
        onChange={(e) =>
          setInvoicePayload((prevPayload) => ({
            ...prevPayload,
            invoice_Subject: e.target.value,
          }))
        }
        placeholder="Enter subject"
        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>

      {/* Item Table */}
      <h1 className="text-xl font-bold mb-4">Item Table</h1>
    <table className="w-full table-auto border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border border-gray-300 px-4 py-2">Item Description</th>
          <th className="border border-gray-300 px-4 py-2">Qty</th>
          <th className="border border-gray-300 px-4 py-2">Rate</th>
          <th className="border border-gray-300 px-4 py-2">Discount (%)</th>
          <th className="border border-gray-300 px-4 py-2">Tax</th>
          <th className="border border-gray-300 px-4 py-2">Amount</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {productRows.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 flex items-center">
              <input
                type="text"
                value={row.product}
                onChange={e => handleProductChange(index, e.target.value)}
                placeholder="Type or select a product"
                className="w-full border border-gray-300 rounded-md px-2 py-1 mr-2"
              />
              <select
                value={row.product}
                onChange={e => handleProductChange(index, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="">Select Item</option>
                {fetchedProducts.map(product => (
                  <option key={product.id} value={product.product_Name}>
                    {product.product_Name}
                  </option>
                ))}
              </select>
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                value={row.quantity === 0 ? "" : row.quantity}
                onChange={e => handleQuantityChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                value={row.product_SellingPrice === 0 ? "" : row.product_SellingPrice}
                onChange={e => handleRateChange(index, Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                value={row.product_DiscountPercentage === 0 ? "" : row.product_DiscountPercentage}
                onChange={e => handleDiscountChange(index, Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">5%</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {row.product_AfterDiscountPrice.toFixed(2)}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={() => deleteRow(index)}
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      type="button"
      onClick={addRow}
      className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
    >
      Add Row
    </button>

    {/* Totals Section */}
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 text-lg font-semibold text-right">
      <h2 className="text-gray-700 flex justify-between">
        Subtotal:
        <span className="text-gray-900 font-medium">
          AED {invoicePayload.invoice_BeforeTaxPrice.toFixed(2)}
        </span>
      </h2>
      <h2 className="text-gray-700 flex justify-between">
        Total Tax:
        <span className="text-gray-900 font-medium">
          AED {invoicePayload.invoice_TotalTax.toFixed(2)}
        </span>
      </h2>
      <h2 className="text-gray-700 flex justify-between border-t pt-4">
        Grand Total:
        <span className="text-gray-900 font-bold text-xl">
          AED {invoicePayload.invoice_AfterDiscountPrice.toFixed(2)}
        </span>
      </h2>
    </div>

    {/* Submit Button and File Input */}
    <div className="flex justify-end">
      <input
        type="file"
        onChange={handleFileChange}
        className="mt-4 w-full p-2 border rounded-lg bg-gray-50"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500"
      >
        Submit
      </button>
    </div>
  </form>
);
 
};

export default AddInvoice;
