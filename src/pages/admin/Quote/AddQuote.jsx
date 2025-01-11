import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const AddQuote = () => {
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
      alert("Please add at least one product!");
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
        alert("Quote created successfully!");
        navigate("/quotes");
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
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Client Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "client_Name", label: "Client Name" },
              { name: "client_Email", label: "Client Email" },
              { name: "client_Contact", label: "Client Contact" },
              { name: "client_Address", label: "Client Address" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
                <input
                  type={name === "client_Email" ? "email" : "text"}
                  name={name}
                  id={name}
                  value={client[name]}
                  onChange={handleClientChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {clientError[name] && <p className="text-red-500 text-xs mt-1">{clientError[name]}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-600">Product</label>
              <select
                id="product"
                name="product"
                value={currentProduct.product}
                onChange={handleCurrentProductChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="" disabled>Select a product</option>
                {productOptions.map(({ id, name }) => (
                  <option key={id} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {["product_SellingPrice", "product_Discount", "quantity"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-600">
                  {field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                <input
                  type="number"
                  name={field}
                  id={field}
                  value={currentProduct[field]}
                  onChange={handleCurrentProductChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-400 text-white font-medium rounded hover:bg-blue-600 focus:outline-none"
            >
              Add Product
            </button>
          </div>

          {productError && <p className="text-red-500 text-xs mt-2">{productError}</p>}

          {products.length > 0 && (
            <div className="mt-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2">Product</th>
                    <th className="text-left px-4 py-2">Price</th>
                    <th className="text-left px-4 py-2">Quantity</th>
                    <th className="text-left px-4 py-2">Discount</th>
                    <th className="text-left px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-t border-gray-300">{prod.product}</td>
                      <td className="px-4 py-2 border-t border-gray-300">{prod.product_Price}</td>
                      <td className="px-4 py-2 border-t border-gray-300">{prod.quantity}</td>
                      <td className="px-4 py-2 border-t border-gray-300">{prod.product_Discount}%</td>
                      <td className="px-4 py-2 border-t border-gray-300">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-500 hover:underline"
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

        <button
          type="submit"
          className="w-auto px-6 py-2 bg-blue-400 text-white font-medium rounded hover:bg-blue-500 focus:outline-none mx-auto block"
        >
          Submit Quote
        </button>
      </form>
    </div>
  );
};

export default AddQuote;
