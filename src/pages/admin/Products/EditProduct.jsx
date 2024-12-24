import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_Name: "",
    product_CostPrice: "",
    product_SellingPrice: "",
    product_StockQuantity: "",
    product_Category: "",
    product_Description: "",
    product_DateOfPurchase: "",
    product_DamagedPieces: "",
    product_StockLocation: "",
    product_Vendor: {
      vendor_Name: "",
      vendor_Email: "",
      vendor_Contact: "",
      vendor_Address: "",
    },
    product_Image: null,
    previewUrl: null,
  });

  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  useEffect(() => {
    if (!jwtLoginToken) {
      alert("Authentication token is missing. Please log in.");
      navigate("/login");
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_ADMIN_URL}/product/get-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );
        const product = response.data?.information;

        if (product) {
          setFormData({
            product_Name: product.product_Name || "",
            product_CostPrice: product.product_CostPrice || "",
            product_SellingPrice: product.product_SellingPrice || "",
            product_StockQuantity: product.product_StockQuantity || "",
            product_Category: product.product_Category || "",
            product_Description: product.product_Description || "",
            product_DateOfPurchase: product.product_DateOfPurchase
              ? new Date(product.product_DateOfPurchase)
                  .toISOString()
                  .slice(0, 10)
              : "",
            product_DamagedPieces: product.product_DamagedPieces || "",
            product_StockLocation: product.product_StockLocation || "",
            product_Vendor: {
              vendor_Name: product.product_Vendor?.vendor_Name || "",
              vendor_Email: product.product_Vendor?.vendor_Email || "",
              vendor_Contact: product.product_Vendor?.vendor_Contact || "",
              vendor_Address: product.product_Vendor?.vendor_Address || "",
            },
            product_Image: null, // We don't handle image directly here.
            previewUrl: product.product_Image?.filePath
              ? `${API_URL}${product.product_Image.filePath}`
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to load product details.");
      }
    };

    fetchProductDetails();
  }, [productId, jwtLoginToken, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("vendor_")) {
      setFormData((prevData) => ({
        ...prevData,
        product_Vendor: {
          ...prevData.product_Vendor,
          [name.replace("vendor_", "")]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        product_Image: file,
        previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation (optional)
    if (
      !formData.product_Name ||
      !formData.product_CostPrice ||
      !formData.product_SellingPrice
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("product_NewName", formData.product_Name);
    formDataToSend.append("product_NewCostPrice", formData.product_CostPrice);
    formDataToSend.append(
      "product_NewSellingPrice",
      formData.product_SellingPrice
    );
    formDataToSend.append(
      "product_NewStockQuantity",
      formData.product_StockQuantity
    );
    formDataToSend.append("product_NewCategory", formData.product_Category);
    formDataToSend.append(
      "product_NewDescription",
      formData.product_Description
    );
    formDataToSend.append(
      "product_NewDateOfPurchase",
      formData.product_DateOfPurchase
    );
    formDataToSend.append(
      "product_NewDamagedPieces",
      formData.product_DamagedPieces
    );
    formDataToSend.append(
      "product_NewStockLocation",
      formData.product_StockLocation
    );
    formDataToSend.append(
      "product_NewVendor",
      JSON.stringify(formData.product_Vendor)
    );

    if (formData.product_Image) {
      formDataToSend.append("image", formData.product_Image);
    }

    try {
      const response = await axios.patch(
        `${API_ADMIN_URL}/product/update-product/${productId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating product:", error.response || error.message);
      alert(error.response?.data?.message || "Failed to update product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <div className="mb-4">
            {formData.previewUrl ? (
              <img
                src={formData.previewUrl}
                alt="Product Preview"
                className="w-32 h-32 object-cover mb-2"
              />
            ) : (
              <span className="block text-gray-500 mb-2">No Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
        </div>

        {[
          { name: "product_Name", label: "Product Name" },
          { name: "product_CostPrice", label: "Cost Price", type: "number" },
          {
            name: "product_SellingPrice",
            label: "Selling Price",
            type: "number",
          },
          {
            name: "product_StockQuantity",
            label: "Stock Quantity",
            type: "number",
          },
          { name: "product_Category", label: "Category" },
          { name: "product_Description", label: "Description" },
          {
            name: "product_DateOfPurchase",
            label: "Date of Purchase",
            type: "date",
          },
          {
            name: "product_DamagedPieces",
            label: "Damaged Pieces",
            type: "number",
          },
          { name: "product_StockLocation", label: "Stock Location" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}

        <h3 className="text-xl font-semibold mt-8 mb-4">Vendor Information</h3>
        {[
          { name: "vendor_Name", label: "Vendor Name" },
          { name: "vendor_Email", label: "Vendor Email" },
          { name: "vendor_Contact", label: "Vendor Contact" },
          { name: "vendor_Address", label: "Vendor Address" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              name={`vendor_${field.name}`}
              value={formData.product_Vendor[field.name]}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
