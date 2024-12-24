import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const AddProduct = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const [productData, setProductData] = useState({
    product_Name: "",
    product_CostPrice: "",
    product_SellingPrice: "",
    product_StockQuantity: "",
    product_Category: "",
    product_Description: "",
    product_DateOfPurchase: "",
    product_DamagedPieces: "",
    product_StockLocation: "",
    product_Image: null,
  });

  const [vendorData, setVendorData] = useState({
    vendor_Name: "",
    vendor_Email: "",
    vendor_Address: "",
    vendor_Contact: "",
  });

  const navigate = useNavigate();  // Initialize navigate function

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, product_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_Name", productData.product_Name);
    formData.append("product_CostPrice", productData.product_CostPrice);
    formData.append("product_SellingPrice", productData.product_SellingPrice);
    formData.append("product_StockQuantity", productData.product_StockQuantity);
    formData.append("product_Category", productData.product_Category);
    formData.append("product_Description", productData.product_Description);
    formData.append(
      "product_DateOfPurchase",
      productData.product_DateOfPurchase
    );
    formData.append("product_DamagedPieces", productData.product_DamagedPieces);
    formData.append("product_StockLocation", productData.product_StockLocation);
    formData.append("product_Image", productData.product_Image);
    formData.append("product_Vendor", JSON.stringify(vendorData));

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/product/add-product",
        formData,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );
      alert(response.data.message); // Show success message

      // Reset form
      setProductData({
        product_Name: "",
        product_CostPrice: "",
        product_SellingPrice: "",
        product_StockQuantity: "",
        product_Category: "",
        product_Description: "",
        product_DateOfPurchase: "",
        product_DamagedPieces: "",
        product_StockLocation: "",
        product_Image: null,
      });
      setVendorData({
        vendor_Name: "",
        vendor_Email: "",
        vendor_Address: "",
        vendor_Contact: "",
      });

      // Navigate to the product panel after success
      navigate("/products"); // Adjust this route as per your actual product panel route
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Image */}
          <div className="form-group">
            <label className="block text-lg text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_Name"
                  value={productData.product_Name}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Cost Price
                </label>
                <input
                  type="number"
                  name="product_CostPrice"
                  value={productData.product_CostPrice}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Selling Price
                </label>
                <input
                  type="number"
                  name="product_SellingPrice"
                  value={productData.product_SellingPrice}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="product_StockQuantity"
                  value={productData.product_StockQuantity}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">Category</label>
                <input
                  type="text"
                  name="product_Category"
                  value={productData.product_Category}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Description
                </label>
                <textarea
                  name="product_Description"
                  value={productData.product_Description}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Date of Purchase
                </label>
                <input
                  type="date"
                  name="product_DateOfPurchase"
                  value={productData.product_DateOfPurchase}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Damaged Pieces
                </label>
                <input
                  type="number"
                  name="product_DamagedPieces"
                  value={productData.product_DamagedPieces}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Stock Location
                </label>
                <input
                  type="text"
                  name="product_StockLocation"
                  value={productData.product_StockLocation}
                  onChange={handleProductChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Vendor Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-700">
                Vendor Information
              </h3>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendor_Name"
                  value={vendorData.vendor_Name}
                  onChange={handleVendorChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Vendor Email
                </label>
                <input
                  type="email"
                  name="vendor_Email"
                  value={vendorData.vendor_Email}
                  onChange={handleVendorChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Vendor Address
                </label>
                <input
                  type="text"
                  name="vendor_Address"
                  value={vendorData.vendor_Address}
                  onChange={handleVendorChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-lg text-gray-700">
                  Vendor Contact
                </label>
                <input
                  type="text"
                  name="vendor_Contact"
                  value={vendorData.vendor_Contact}
                  onChange={handleVendorChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
