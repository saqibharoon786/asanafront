import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_SALES_URL = process.env.REACT_APP_API_SALES_URL;

const SalesViewProduct = () => {
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
          `${API_SALES_URL}/product/get-product/${productId}`,
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
            product_Image: product.product_Image || null,
            previewUrl: product.product_Image?.filePath
              ? `${API_SALES_URL}${product.product_Image.filePath}`
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

  // Handle image click to show the image in a larger view (optional)
  const handleImageClick = (imageUrl, product) => {
    // Add your logic for the image click, for example, open in a modal.
    console.log("Image clicked", imageUrl, product);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-6">View Product Details</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          {formData.product_Image && formData.product_Image.filePath ? (
            <td className="py-2 px-4">
              <img
                src={`http://localhost:3000${formData.product_Image.filePath}`}
                alt={formData.product_Name}
                className="w-16 h-16 object-cover rounded cursor-pointer"
                onClick={() =>
                  handleImageClick(
                    `http://localhost:3000${formData.product_Image.filePath}`,
                    formData
                  )
                }
              />
            </td>
          ) : (
            <p>No image available</p>
          )}
        </div>

        {[{
          name: "product_Name", label: "Product Name"
        }, {
          name: "product_CostPrice", label: "Cost Price"
        }, {
          name: "product_SellingPrice", label: "Selling Price"
        }, {
          name: "product_StockQuantity", label: "Stock Quantity"
        }, {
          name: "product_Category", label: "Category"
        }, {
          name: "product_Description", label: "Description"
        }, {
          name: "product_DateOfPurchase", label: "Date of Purchase", type: "date"
        }, {
          name: "product_DamagedPieces", label: "Damaged Pieces"
        }, {
          name: "product_StockLocation", label: "Stock Location"
        }].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}

        <h3 className="text-xl font-semibold mt-8 mb-4">Vendor Information</h3>
        {[{
          name: "vendor_Name", label: "Vendor Name"
        }, {
          name: "vendor_Email", label: "Vendor Email"
        }, {
          name: "vendor_Contact", label: "Vendor Contact"
        }, {
          name: "vendor_Address", label: "Vendor Address"
        }].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              name={`vendor_${field.name}`}
              value={formData.product_Vendor[field.name]}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default SalesViewProduct;
