import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

const API_URL = process.env.REACT_APP_API_URL;
const TAX_RATE = 0.05; // Define tax rate here

const SalesAddInvoice = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { user } = useSelector((state) => state.auth) || {};
  const [grandTotal, setGrandTotal] = useState(0);
  const [beforeTaxTotal, setBeforeTaxTotal] = useState(0);
  const [afterTaxTotal, setAfterTaxTotal] = useState(0);
  const [invoiceInitialPayment, setInvoiceInitialPayment] = useState(0);

  const navigate = useNavigate();

  const [client, setClient] = useState({
    client_Name: "",
    client_Email: "",
    client_Contact: "",
    client_Address: "",
  });

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    product: "",
    product_SellingPrice: 0,
    quantity: 1,
    product_Discount: 0,
    product_Tax: TAX_RATE * 100, // Default tax rate
    totalPrice: 0,
  });

  const [productOptions, setProductOptions] = useState([]);
  const [clientError, setClientError] = useState({
    client_Name: "",
    client_Email: "",
    client_Contact: "",
    client_Address: "",
  });
  const [productError, setProductError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!jwtLoginToken) return;

      try {
        const response = await axios.get(`${API_URL}/product/get-products`, {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        });
        const products = response.data?.information?.products || [];
        const formattedProducts = products.map((prod) => ({
          id: prod._id,
          name: prod.product_Name,
          price: prod.product_SellingPrice,
        }));
        setProductOptions(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductOptions([]);
        alert("Failed to load products. Please check your network connection.");
      }
    };

    fetchProducts();
  }, [jwtLoginToken]);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const validateClient = () => {
    let isValid = true;
    let errors = { ...clientError };

    if (!client.client_Name) {
      errors.client_Name = "Client name is required!";
      isValid = false;
    } else {
      errors.client_Name = "";
    }

    if (!client.client_Email) {
      errors.client_Email = "Client email is required!";
      isValid = false;
    } else {
      errors.client_Email = "";
    }

    if (!client.client_Contact) {
      errors.client_Contact = "Client contact is required!";
      isValid = false;
    } else {
      errors.client_Contact = "";
    }

    if (!client.client_Address) {
      errors.client_Address = "Client address is required!";
      isValid = false;
    } else {
      errors.client_Address = "";
    }

    setClientError(errors);
    return isValid;
  };

  const handleCurrentProductChange = (e) => {
    const { name, value } = e.target;

    if (name === "product") {
      const selectedProduct = productOptions.find(
        (prod) => prod.name === value
      );
      if (selectedProduct) {
        setCurrentProduct((prev) => ({
          ...prev,
          product: selectedProduct.name,
          product_SellingPrice: selectedProduct.price,
        }));
        return;
      }
    }

    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateProductTotal = () => {
    const price = Number(currentProduct.product_SellingPrice); // Price per unit
    const quantity = Number(currentProduct.quantity); // Quantity of products
    const discountPercentage = Number(currentProduct.product_Discount); // Discount percentage entered (e.g., 10)

    // Calculations
    const product_BeforeTax = price * quantity;
    const product_Tax = product_BeforeTax * TAX_RATE; // 5% tax
    const product_AfterTax = product_BeforeTax + product_Tax;
    const product_Discount = (product_AfterTax * discountPercentage) / 100; // Discount in currency
    const product_AfterDiscount = product_AfterTax - product_Discount;

    return {
      product_BeforeTax,
      product_Tax,
      product_AfterTax,
      product_Discount, // Actual discount value (currency)
      product_DiscountPercentage: discountPercentage, // Discount percentage
      product_AfterDiscount,
    };
  };

  const validateProduct = () => {
    if (
      !currentProduct.product ||
      currentProduct.product_SellingPrice <= 0 ||
      currentProduct.quantity <= 0
    ) {
      setProductError("Please provide valid product details.");
      return false;
    }
    setProductError("");
    return true;
  };

  const handleAddProduct = () => {
    if (!validateProduct()) return;

    const {
      product_BeforeTax,
      product_Tax,
      product_AfterTax,
      product_Discount,
      product_DiscountPercentage,
      product_AfterDiscount,
    } = calculateProductTotal();

    const newProduct = {
      ...currentProduct,
      product_BeforeTaxPrice: product_BeforeTax.toFixed(2),
      product_Tax: product_Tax.toFixed(2),
      product_AfterTaxPrice: product_AfterTax.toFixed(2),
      product_Discount: product_Discount.toFixed(2), // Calculated discount value
      product_DiscountPercentage: product_DiscountPercentage.toFixed(2), // Entered percentage
      product_AfterDiscountPrice: product_AfterDiscount.toFixed(2),
      totalPrice: product_AfterDiscount.toFixed(2),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);

    setCurrentProduct({
      product: "",
      product_SellingPrice: 0,
      quantity: 1,
      product_Discount: 0,
      totalPrice: 0,
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClient()) return;
    if (products.length === 0) {
      alert("Please add at least one product!");
      return;
    }

    // Calculate the total price values
    const invoice_BeforeTaxPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_BeforeTaxPrice);
    }, 0);

    const invoice_AfterTaxPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_AfterTaxPrice);
    }, 0);

    const invoice_AfterDiscountPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_AfterDiscountPrice);
    }, 0);

    const payload = {
      invoice_Client: client,
      invoice_Products: products.map((prod) => ({
        product: prod.product,
        quantity: prod.quantity,
        product_SellingPrice: prod.product_SellingPrice,
        product_Tax: prod.product_Tax,
        product_DiscountPercentage: prod.product_DiscountPercentage,
        product_Discount: prod.product_Discount,
        product_BeforeTaxPrice: prod.product_BeforeTaxPrice,
        product_AfterTaxPrice: prod.product_AfterTaxPrice,
        product_AfterDiscountPrice: prod.product_AfterDiscountPrice,
      })),
      invoice_BeforeTaxPrice: invoice_BeforeTaxPrice.toFixed(2),
      invoice_AfterTaxPrice: invoice_AfterTaxPrice.toFixed(2),
      invoice_AfterDiscountPrice: invoice_AfterDiscountPrice.toFixed(2),
      invoice_InitialPayment: invoiceInitialPayment, // Include initial payment
      invoice_Details: { status: "Unpaid" },
    };

    try {
      const response = await axios.post(
        `${API_URL}/invoice/create-invoice`,
        payload,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Invoice Created");
        navigate("/sales/invoices");
        setProducts([]);
        setClient({
          client_Name: "",
          client_Email: "",
          client_Contact: "",
          client_Address: "",
        });
      } else {
        alert("Failed to create invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    }
  };

  const updateGrandTotal = (updatedProducts) => {
    const beforeTaxTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_BeforeTaxPrice),
      0
    );
    const afterTaxTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_AfterTaxPrice),
      0
    );
    const afterDiscountTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_AfterDiscountPrice),
      0
    );

    setBeforeTaxTotal(beforeTaxTotal.toFixed(2));
    setAfterTaxTotal(afterTaxTotal.toFixed(2));
    setGrandTotal(afterDiscountTotal.toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Invoice
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Client Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "client_Name",
              "client_Email",
              "client_Contact",
              "client_Address",
            ].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-600"
                >
                  {field.replace("client_", "").replace("_", " ")}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={client[field]}
                  onChange={handleClientChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {clientError[field] && (
                  <p className="text-xs text-red-500">{clientError[field]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <label
            htmlFor="initialPayment"
            className="text-sm font-medium text-gray-600"
          >
            Initial Payment %
          </label>
          <input
            type="number"
            id="initialPayment"
            name="initialPayment"
            value={invoiceInitialPayment}
            onChange={(e) => setInvoiceInitialPayment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product"
                className="text-sm font-medium text-gray-600"
              >
                Product
              </label>
              <select
                id="product"
                name="product"
                value={currentProduct.product}
                onChange={handleCurrentProductChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select a product
                </option>
                {productOptions.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {["product_SellingPrice", "quantity", "product_Discount"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-600"
                  >
                    {field.replace("product_", "").replace("_", " ")}
                  </label>
                  <input
                    type="number"
                    id={field}
                    name={field}
                    value={currentProduct[field]}
                    onChange={handleCurrentProductChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Add Product
          </button>

          {productError && <p className="text-red-500 mt-2">{productError}</p>}

          {products.length > 0 && (
            <table className="w-full mt-4 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Discount Amount</th>
                  <th className="border px-4 py-2">Total (AED)</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{prod.product}</td>
                    <td className="border px-4 py-2">
                      {prod.product_SellingPrice}
                    </td>
                    <td className="border px-4 py-2">{prod.quantity}</td>
                    <td className="border px-4 py-2">
                      {prod.product_Discount}
                    </td>
                    <td className="border px-4 py-2">{prod.totalPrice}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {products.length > 0 && (
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Before Tax Total:{" "}
                <span className="text-indigo-600">{beforeTaxTotal} AED</span>
              </p>
              <p className="text-lg font-semibold">
                After Tax Total:{" "}
                <span className="text-indigo-600">{afterTaxTotal} AED</span>
              </p>
              <p className="text-lg font-semibold">
                Grand Total (After Discount):{" "}
                <span className="text-indigo-600">{grandTotal} AED</span>
              </p>
            </div>
          )}
        </section>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Submit Invoice
        </button>
      </form>
    </div>
  );
};

export default SalesAddInvoice;
