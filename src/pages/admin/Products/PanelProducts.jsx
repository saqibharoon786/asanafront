import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaUser } from "react-icons/fa"; // Import icons

const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const PanelProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product in modal
  const [deletingProductId, setDeletingProductId] = useState(null); // Added deleting product name state
  const navigate = useNavigate();

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_ADMIN_URL}/product/get-products`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`, // Corrected template literal syntax
            },
          }
        );
        if (response.data.success) {
          const productsData = Array.isArray(response.data.information.products)
            ? response.data.information.products
            : [];
          setProducts(productsData);
          setFilteredProducts(productsData);
        } else {
          setError("No products found.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [products]);

  // Extract unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.product_Category))
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = products.filter(
      (product) =>
        product.product_Name.toLowerCase().includes(query) ||
        product.product_Category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleNavigateAddProductPage = () => {
    navigate("/add-product");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.product_Category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Handle image click to show large version
  const handleImageClick = (imagePath, product) => {
    setSelectedImage(imagePath);
    setSelectedProduct(product); // Set the selected product for modal actions
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProduct(null);
  };

  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setDeletingProductId(productId);

        // Send delete request to the backend
        const response = await axios.delete(
          `${API_ADMIN_URL}/product/delete-product/${productId}`,
          {
            // data: { _id: productId }, // Send the product name in the request body
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`, // Add the JWT token for authentication
            },
          }
        );

        if (response.status === 200) {
          // Update the state to remove the deleted product from the list
          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => product._id !== productId
            )
          );
          alert("Product deleted successfully.");
        } else {
          throw new Error(
            response.data.message || "Failed to delete the product."
          );
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again later.";
        alert(errorMessage);
      } finally {
        setDeletingProductId(null); // Reset deleting state
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Sales Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "In-Store Sales",
            value: "$5,345",
            orders: "5k orders",
            change: "+5.7%",
            color: "text-green-500",
          },
          {
            title: "Website Sales",
            value: "$74,347",
            orders: "21k orders",
            change: "+12.4%",
            color: "text-green-500",
          },
          {
            title: "Discount",
            value: "$14,235",
            orders: "6k orders",
            change: "",
            color: "text-gray-500",
          },
          {
            title: "Affiliate",
            value: "$8,345",
            orders: "150 orders",
            change: "-3.5%",
            color: "text-red-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="text-gray-500 font-medium">{item.title}</div>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">{item.orders}</span>
              <span className={`${item.color} text-sm`}>{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex gap-4 mb-4 flex-wrap">
          <select className="border rounded-lg px-4 py-2 w-full sm:w-1/4 md:w-1/4">
            <option>Select Status</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2 w-full sm:w-1/4 md:w-1/4"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select className="border rounded-lg px-4 py-2 w-full sm:w-1/4 md:w-1/4">
            <option>Stock</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="border rounded-lg px-4 py-2 flex-1"
          />
        </div>

        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleNavigateAddProductPage}
          >
            + Add Product
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-lg">Export</button>
        </div>

        {/* Product Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
            <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Stock</th>
              <th className="py-2 px-4 border">Selling Price</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products available.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index} className="border-t">
                        <td className="py-2 px-4">
                    {product.product_Image && product.product_Image.filePath ? (
                      <img
                        src={`http://localhost:3000${product.product_Image.filePath}`}
                        alt={product.product_Name}
                        className="w-16 h-16 object-cover rounded cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:3000${product.product_Image.filePath}`,
                            product
                          )
                        }
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{product.product_Name}</td>
                  <td className="py-2 px-4">{product.product_Category}</td>
                  <td className="py-2 px-4">{product.product_StockQuantity}</td>
                  <td className="py-2 px-4">{product.product_SellingPrice}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-lg ${
                        product.product_StockQuantity > 0
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {product.product_StockQuantity > 0
                        ? "Available"
                        : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="text-blue-500 flex items-center gap-1"
                      onClick={() => handleUpdate(product._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 flex items-center gap-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
            
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for showing the larger image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-96"
            />
            <div className="py-2 px-4 flex gap-2"></div>
            <button className="text-gray-500" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelProduct;
