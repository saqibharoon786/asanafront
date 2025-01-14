import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserIcon, MailIcon, PhoneIcon, LocationMarkerIcon } from "@heroicons/react/outline";

const API_URL = process.env.REACT_APP_API_URL;

const SalesAddQuote = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { user } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();

  const creator = {
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
  };

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
  });

  const [productOptions, setProductOptions] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState({
    status: "Pending",
  });

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
      const selectedProduct = productOptions.find((prod) => prod.name === value);
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

  const validateProduct = () => {
    if (!currentProduct.product || currentProduct.product_SellingPrice <= 0 || currentProduct.quantity <= 0) {
      setProductError("Please provide valid product details.");
      return false;
    }
    setProductError("");
    return true;
  };

  const handleAddProduct = () => {
    if (!validateProduct()) return;

    const { product, product_SellingPrice, quantity, product_Discount } = currentProduct;

    const price = Number(product_SellingPrice);
    const discount = Number(product_Discount);
    const qty = Number(quantity);

    const newProduct = {
      product,
      quantity: qty,
      product_Price: price,
      product_Discount: discount,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setCurrentProduct({
      product: "",
      product_SellingPrice: 0,
      quantity: 1,
      product_Discount: 0,
    });
  };

  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClient()) return;
    if (products.length === 0) {
      return;
    }

    const payload = {
      quote_Creater: {
        name: creator.name,
        email: creator.email,
        phone: creator.contact,
      },
      quote_Client: client,
      quote_Products: products,
      quote_Details: quoteDetails,
    };

    try {
      const response = await axios.post(
        `${API_URL}/quote/create-quote`,
        payload,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      if (response.data.success) {
        navigate("/sales/quotes");
        setProducts([]);
        setClient({
          client_Name: "",
          client_Email: "",
          client_Contact: "",
          client_Address: "",
        });
        setQuoteDetails({
          status: "Pending",
        });
      } else {
        alert("Failed to create quote. Please try again.");
      }
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to create quote. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Client Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "client_Name", label: "Client Name", icon: <UserIcon className="w-5 h-5 text-gray-500" /> },
              { name: "client_Email", label: "Client Email", icon: <MailIcon className="w-5 h-5 text-gray-500" /> },
              { name: "client_Contact", label: "Client Contact", icon: <PhoneIcon className="w-5 h-5 text-gray-500" /> },
              { name: "client_Address", label: "Client Address", icon: <LocationMarkerIcon className="w-5 h-5 text-gray-500" /> },
            ].map(({ name, label, icon }) => (
              <div key={name} className="flex flex-col gap-1 relative">
                <label htmlFor={name} className="text-sm font-medium text-gray-600">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={name === "client_Email" ? "email" : "text"}
                    name={name}
                    id={name}
                    value={client[name]}
                    onChange={handleClientChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
                </div>
                {clientError[name] && <p className="text-xs text-red-500">{clientError[name]}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Original Product Section - Unchanged */}
        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="product" className="text-sm font-medium text-gray-600">
                Product
              </label>
              <select
                id="product"
                name="product"
                value={currentProduct.product}
                onChange={handleCurrentProductChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none"
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

            {[
              { name: "product_SellingPrice", label: "Selling Price" },
              { name: "product_Discount", label: "Discount (%)" },
              { name: "quantity", label: "Quantity" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col gap-1">
                <label htmlFor={name} className="text-sm font-medium text-gray-600">
                  {label}
                </label>
                <input
                  type="number"
                  name={name}
                  id={name}
                  value={currentProduct[name]}
                  onChange={handleCurrentProductChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            ))}

            <div className="flex justify-end items-center sm:col-span-2">
              <button
                type="button"
                onClick={handleAddProduct}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              >
                Add Product
              </button>
            </div>
          </div>

          {productError && <p className="text-xs text-red-500 mt-2">{productError}</p>}

          {products.length > 0 && (
            <div className="mt-4">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Product</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Discount</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{prod.product}</td>
                      <td className="px-4 py-2 border">{prod.product_Price}</td>
                      <td className="px-4 py-2 border">{prod.quantity}</td>
                      <td className="px-4 py-2 border">{prod.product_Discount}%</td>
                      <td className="px-4 py-2 border text-center">
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
            </div>
          )}
        </section>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
          >
            Submit Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesAddQuote;
