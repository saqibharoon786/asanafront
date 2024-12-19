import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const EditProduct = () => {
  const { productId } = useParams(); // Getting productId from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_Name: "",
    product_CostPrice: "",
    product_SellingPrice: "",
    product_StockQuantity: "",
    product_Category: "",
    product_Description: "",
    product_Vendor: {
      vendor_Name: "",
      vendor_Email: "",
      vendor_Contact: "",
      vendor_Address: "",
    },
    product_Image: null,
    previewUrl: null,
  });

  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [productImageUrl, setProductImageUrl] = useState("");
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Fetch categories and vendors for dropdown selections
  useEffect(() => {
    const fetchCategoriesAndVendors = async () => {
      try {
        const [categoryResponse, vendorResponse] = await Promise.all([
          axios.get(`${API_ADMIN_URL}/category/get-categories`, {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }),
          axios.get(`${API_ADMIN_URL}/vendor/get-vendors`, {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }),
        ]);

        const categoryData = categoryResponse.data?.information?.categories || [];
        const vendorData = vendorResponse.data?.information?.vendors || [];

        setCategories(categoryData);
        setVendors(vendorData);
      } catch (err) {
        console.error("Failed to fetch categories or vendors:", err);
        setCategories([]);
        setVendors([]);
      }
    };

    fetchCategoriesAndVendors();
  }, [jwtLoginToken]);

  // Fetch existing product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${API_ADMIN_URL}/product/get-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        const product = response.data?.information?.product;
        if (product) {
          setFormData({
            product_Name: product.product_Name,
            product_CostPrice: product.product_CostPrice,
            product_SellingPrice: product.product_SellingPrice,
            product_StockQuantity: product.product_StockQuantity,
            product_Category: product.product_Category,
            product_Description: product.product_Description,
            product_Vendor: product.product_Vendor || {
              vendor_Name: "",
              vendor_Email: "",
              vendor_Contact: "",
              vendor_Address: "",
            },
            product_Image: null,
            previewUrl: null,
          });

          // Construct the URL for the product's image
          if (product.product_Image?.filePath) {
            setProductImageUrl(`${API_URL}${product.product_Image.filePath}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product data", error);
        alert("Failed to load product data.");
      }
    };

    fetchProductData();
  }, [productId, jwtLoginToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
        previewUrl,
      }));
    }
  };

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      product_Vendor: {
        ...prevData.product_Vendor,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("product_NewName", formData.product_Name);
    formDataToSend.append("product_NewCostPrice", formData.product_CostPrice);
    formDataToSend.append("product_NewSellingPrice", formData.product_SellingPrice);
    formDataToSend.append("product_NewStockQuantity", formData.product_StockQuantity);
    formDataToSend.append("product_NewCategory", formData.product_Category);
    formDataToSend.append("product_NewDescription", formData.product_Description);
    formDataToSend.append("product_NewVendor", JSON.stringify(formData.product_Vendor));

    if (formData.product_Image) {
      formDataToSend.append("product_Image", formData.product_Image);
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
        alert("Product information updated successfully!");
        navigate("/admin/products");
      } else {
        alert(`Failed to update product: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update product information.");
    }
  };

  return (
    <div>
      <h1>Edit Product Information</h1>

      <form onSubmit={handleSubmit}>
        {/* Product Image */}
        <div>
          <label>Product Image</label>
          {formData.previewUrl ? (
            <img src={formData.previewUrl} alt="Product Preview" width="150" />
          ) : productImageUrl ? (
            <img src={productImageUrl} alt="Product" width="150" />
          ) : (
            <span>No Image</span>
          )}
          <input
            type="file"
            name="product_Image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Category Dropdown */}
        <label>Category</label>
        <select
          id="product_Category"
          name="product_Category"
          value={formData.product_Category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_Name}
            </option>
          ))}
        </select>

        {/* Vendor Information */}
        <div>
          <label>Vendor Name</label>
          <input
            type="text"
            name="vendor_Name"
            value={formData.product_Vendor.vendor_Name}
            onChange={handleVendorChange}
          />
        </div>

        <div>
          <label>Vendor Email</label>
          <input
            type="email"
            name="vendor_Email"
            value={formData.product_Vendor.vendor_Email}
            onChange={handleVendorChange}
          />
        </div>

        <div>
          <label>Vendor Contact</label>
          <input
            type="tel"
            name="vendor_Contact"
            value={formData.product_Vendor.vendor_Contact}
            onChange={handleVendorChange}
          />
        </div>

        <div>
          <label>Vendor Address</label>
          <input
            type="text"
            name="vendor_Address"
            value={formData.product_Vendor.vendor_Address}
            onChange={handleVendorChange}
          />
        </div>

        {/* Product Fields */}
        <div>
          <input
            name="product_Name"
            type="text"
            placeholder="Product Name"
            value={formData.product_Name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            name="product_CostPrice"
            type="number"
            placeholder="Cost Price"
            value={formData.product_CostPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            name="product_SellingPrice"
            type="number"
            placeholder="Selling Price"
            value={formData.product_SellingPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <input
            name="product_StockQuantity"
            type="number"
            placeholder="Stock Quantity"
            value={formData.product_StockQuantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <textarea
            name="product_Description"
            placeholder="Product Description"
            value={formData.product_Description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
