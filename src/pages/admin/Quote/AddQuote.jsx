import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const AddQuote = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { user } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Error states for each section
  const [clientError, setClientError] = useState({
    client_Name: "",
    client_Email: "",
    client_Contact: "",
    client_Address: "",
  });
  const [productError, setProductError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      if (!jwtLoginToken) return;

      try {
        const response = await axios.get(`${API_ADMIN_URL}/product/get-products`, {
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

  // Handle client input change
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  // Validate client fields
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

  // Handle product input change
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

  // Validate product details
  const validateProduct = () => {
    if (!currentProduct.product || currentProduct.product_SellingPrice <= 0 || currentProduct.quantity <= 0) {
      setProductError("Please provide valid product details.");
      return false;
    }
    setProductError("");
    return true;
  };

  // Add product to the quote
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

  // Remove product from the quote
  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  // Submit the quote to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClient()) return; // Validate client details
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
        `${API_ADMIN_URL}/quote/create-quote`,
        payload,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );

      if (response.data.success) {
        alert("Quote created successfully!");

        // Redirect to the quote panel after success
        navigate("/quotes"); // Navigate to the quote panel page

        // Clear the form after success
        setProducts([]);
        setClient({
          client_Name: "", client_Email: "", client_Contact: "", client_Address: "",
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
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
        Create a New Quote
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Client Details */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Client Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["client_Name", "client_Email", "client_Contact", "client_Address"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-semibold text-gray-700">
                  {field.replace("client_", "").replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field === "client_Email" ? "email" : "text"}
                  name={field}
                  id={field}
                  placeholder={`Client's ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={client[field]}
                  onChange={handleClientChange}
                  className="p-3 border rounded-lg w-full"
                />
                {clientError[field] && <p className="text-red-500 text-sm">{clientError[field]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Products</h3>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="product" className="block text-sm font-semibold text-gray-700">Select Product</label>
            <select
              name="product"
              id="product"
              value={currentProduct.product}
              onChange={handleCurrentProductChange}
              className="p-2 border rounded-lg w-full sm:w-1/4"
            >
              <option value="" disabled>Select Product</option>
              {productOptions.length > 0 ? (
                productOptions.map((prod) => (
                  <option key={prod.id} value={prod.name}>{prod.name}</option>
                ))
              ) : (
                <option value="">No products available</option>
              )}
            </select>

            {["product_SellingPrice", "product_Discount", "quantity"].map((field) => (
              <div key={field} className="w-full sm:w-1/4">
                <label htmlFor={field} className="block text-sm font-semibold text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type="number"
                  name={field}
                  id={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={currentProduct[field]}
                  onChange={handleCurrentProductChange}
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>

          {productError && <p className="text-red-500 text-sm mt-2">{productError}</p>}

          {products.length > 0 && (
            <div className="mt-4">
              {products.map((prod, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded-lg my-2 flex justify-between items-center"
                >
                  <span>
                    {prod.product} | Unit Price: ADE {prod.product_Price} | Qty: {prod.quantity} | Discount: {prod.product_Discount}%

                  </span>

                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="bg-red-500 text-white px-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow hover:bg-blue-600"
        >
          Create Quote
        </button>
      </form>
    </div>
  );
};

export default AddQuote;
