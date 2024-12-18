import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SalesAddQuote = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { user } = useSelector((state) => state.auth) || {};

  const creator = {
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
  };

  const [client, setClient] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    product: "",
    product_Price: 0,
    quantity: 1,
    product_Discount: 0,
  });

  const [productOptions, setProductOptions] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState({
    status: "Pending",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      if (!jwtLoginToken) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/product/get-products",
          { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
        );
        const products = response.data?.information?.products || [];
        const formattedProducts = products.map((prod) => ({
          id: prod._id,
          name: prod.product_Name,
          price: prod.product_Price,
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
    console.log("Updated Client State:", { ...client, [name]: value });
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
          product_Price: selectedProduct.price,
        }));
        return;
      }
    }

    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add product to the quote
  const handleAddProduct = () => {
    const { product, product_Price, quantity, product_Discount } = currentProduct;

    if (!product || product_Price <= 0 || quantity <= 0) {
      alert("Please provide valid product details.");
      return;
    }

    const price = Number(product_Price);
    const discount = Number(product_Discount);
    const qty = Number(quantity);


    const newProduct = {
      product,
      quantity: qty,
      product_Price: price,
      product_Discount: discount,

    };

    console.log("Adding Product:", newProduct);

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setCurrentProduct({
      product: "",
      product_Price: 0,
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

    if (!client.name || !client.email || !client.contact || !client.address) {
      alert("All client details are required!");
      return;
    }

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
        "localhost:3000/sales/quote/create-quote",
        payload,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` }}
      );

      console.log(response.data);
      alert("Quote created successfully!");

      setProducts([]);
      setClient({
        name: "", email: "", contact: "", address: "",
      });
    } catch (error) {
      console.error("Failed to create quote:", error.message);
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
          <div className="grid grid-cols-2 gap-4">
            {["name", "email", "contact", "address"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Client's ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={client[field]}
                onChange={handleClientChange}
                className="p-3 border rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">Products</h3>

          <div className="flex items-center gap-4">
            <select
              name="product"
              value={currentProduct.product}
              onChange={handleCurrentProductChange}
              className="p-2 border rounded-lg"
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

            {["product_Price", "product_Discount", "quantity"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                placeholder={field.replace("_", " ").toUpperCase()}
                value={currentProduct[field]}
                onChange={handleCurrentProductChange}
                className="p-2 border rounded-lg"
              />
            ))}

            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>

          {products.length > 0 && (
            <div className="mt-4">
              {products.map((prod, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-100 rounded-lg my-2 flex justify-between items-center"
                >
                  <span>
                    {prod.product} | ${prod.product_Price} | Qty: {prod.quantity} | Discount: {prod.product_Discount}%
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

export default SalesAddQuote
;