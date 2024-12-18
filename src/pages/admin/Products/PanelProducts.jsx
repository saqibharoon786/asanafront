import React, { useState, useEffect } from "react";
import axios from "axios";

const PanelProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_Name: "",
    product_Price: "",
    product_Description: "",
    product_StockQuantity: "",
    product_Category: "",
    product_DateOfPurchase: "",
    product_DamagedPieces: 0,
    product_StockLocation: "",
    product_Vendor: {
      vendor_Name: "",
      vendor_Email: "",
      vendor_Address: "",
      vendor_Contact: "",
    },
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        var jwtLoginToken = localStorage.getItem("jwtLoginToken");
        var response = await axios.get("http://localhost:3000/product/get-products", {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`, // Corrected template literal syntax
          },
        });
        const fetchedProducts = response.data?.information?.products || [];
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = () => {
      setCategories(["Electronics", "Fashion", "Home", "Toys"]); // Example categories
    };

    if (showNewProductForm) {
      fetchCategories();
    }
  }, [showNewProductForm]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("vendor_")) {
      setNewProduct((prevState) => ({
        ...prevState,
        product_Vendor: {
          ...prevState.product_Vendor,
          [name]: value, // Preserve the full key name
        },
      }));
    } else {
      setNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();

    const {
      product_Name,
      product_Price,
      product_Description,
      product_StockQuantity,
      product_Category,
      product_DateOfPurchase,
      product_StockLocation,
      product_Vendor,
    } = newProduct;

    if (
      !product_Name ||
      !product_Price ||
      !product_Description ||
      !product_StockQuantity ||
      !product_Category ||
      !product_DateOfPurchase ||
      !product_StockLocation ||
      !product_Vendor.vendor_Name ||
      !product_Vendor.vendor_Email ||
      !product_Vendor.vendor_Address ||
      !product_Vendor.vendor_Contact
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      var jwtLoginToken = localStorage.getItem("jwtLoginToken");
      var response = await axios.post("http://localhost:3000/product/add-product", newProduct, {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`, // Corrected template literal syntax
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data?.information?.newProduct]);

      setNewProduct({
        product_Name: "",
        product_Price: "",
        product_Description: "",
        product_StockQuantity: "",
        product_Category: "",
        product_DateOfPurchase: "",
        product_DamagedPieces: 0,
        product_StockLocation: "",
        product_Vendor: {
          vendor_Name: "",
          vendor_Email: "",
          vendor_Address: "",
          vendor_Contact: "",
        },
      });
      setShowNewProductForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product?.product_Name?.toLowerCase().includes(search.toLowerCase()) ||
    product?.product_Description?.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;
  const inStockProducts = products.filter((product) => product?.product_StockQuantity > 0).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600 font-semibold animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Product Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
          onClick={() => setShowNewProductForm(true)}
        >
          + New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-bold">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-600 font-bold">In Stock</h2>
          <p className="text-3xl font-bold text-green-600">{inStockProducts}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          className="w-full p-3 border rounded-md"
          placeholder="Search for products..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-800">{product.product_Name}</h3>
              <p className="text-gray-600">Category: {product.product_Category}</p>
              <p className="text-gray-600">Price: ${product.product_Price}</p>
              <p className="text-gray-600">Stock: {product.product_StockQuantity}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>

      {showNewProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleNewProductSubmit}>
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="product_Name"
                value={newProduct.product_Name}
                onChange={handleNewProductChange}
                placeholder="Product Name"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="product_Price"
                type="number"
                value={newProduct.product_Price}
                onChange={handleNewProductChange}
                placeholder="Product Price"
              />
              <textarea
                className="w-full mb-4 p-3 border rounded-md"
                name="product_Description"
                value={newProduct.product_Description}
                onChange={handleNewProductChange}
                placeholder="Product Description"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="product_StockQuantity"
                type="number"
                value={newProduct.product_StockQuantity}
                onChange={handleNewProductChange}
                placeholder="Stock Quantity"
              />
              <select
                className="w-full mb-4 p-3 border rounded-md"
                name="product_Category"
                value={newProduct.product_Category}
                onChange={handleNewProductChange}
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="product_DateOfPurchase"
                type="date"
                value={newProduct.product_DateOfPurchase}
                onChange={handleNewProductChange}
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="product_StockLocation"
                value={newProduct.product_StockLocation}
                onChange={handleNewProductChange}
                placeholder="Stock Location"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="vendor_Name"
                value={newProduct.product_Vendor.vendor_Name}
                onChange={handleNewProductChange}
                placeholder="Vendor Name"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="vendor_Email"
                value={newProduct.product_Vendor.vendor_Email}
                onChange={handleNewProductChange}
                placeholder="Vendor Email"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="vendor_Address"
                value={newProduct.product_Vendor.vendor_Address}
                onChange={handleNewProductChange}
                placeholder="Vendor Address"
              />
              <input
                className="w-full mb-4 p-3 border rounded-md"
                name="vendor_Contact"
                value={newProduct.product_Vendor.vendor_Contact}
                onChange={handleNewProductChange}
                placeholder="Vendor Contact"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-4"
              >
                Submit
              </button>
              <button
                type="button"
                className="w-full bg-gray-400 text-white py-3 rounded-md mt-2"
                onClick={() => setShowNewProductForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelProducts;
