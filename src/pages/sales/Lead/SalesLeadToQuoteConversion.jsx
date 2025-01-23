import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

const API_URL = process.env.REACT_APP_API_URL;
const TAX_RATE = 0.05; // Define tax rate here

const SalesLeadToQuoteConversion = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { leadId } = useParams(); // Get the lead ID from the URL
  const [grandTotal, setGrandTotal] = useState(0);
  const [beforeTaxTotal, setBeforeTaxTotal] = useState(0);
  const [afterTaxTotal, setAfterTaxTotal] = useState(0);
  const [quoteInitialPayment, setQuoteInitialPayment] = useState(0);
  const [leadDetails, setLeadDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [client, setClient] = useState({
    client_Name: "",
    client_Email: "",
    client_Address: "",
    client_Contact: "",
  });

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    product: "",
    product_SellingPrice: 0,
    quantity: 1,
    product_Discount: 0,
    product_Tax: TAX_RATE * 100, // Default tax rate
    totalPrice: 0,
  });

  const [productOptions, setProductOptions] = useState([]);
  const [clientError, setClientError] = useState({
    client_Name: "",
    client_Email: "",
    client_Address: "",
    client_Contact: "",
  });
  const [productError, setProductError] = useState("");

  const fetchProducts = async () => {
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

  const fetchLeadDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/lead/${leadId}`, {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`,
        },
      });
      if (response.data.success) {
        const leadData = response.data.information.lead;
        setLeadDetails(leadData);
        setClient({
          client_Name: leadData.lead_Client.client_Name,
          client_Email: leadData.lead_Client.client_Email,
          client_Address: leadData.lead_Client.client_Address,
          client_Contact:
            leadData.lead_ClientContactPerson.client_ClientContactPersonContact,
        });
      } else {
        throw new Error("Failed to fetch lead details");
      }
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jwtLoginToken && leadId) {
      fetchProducts();
      fetchLeadDetails();
    }
  }, [jwtLoginToken, leadId]);

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
      const selectedProduct = productOptions.find(
        (prod) => prod.name === value
      );
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

  const calculateProductTotal = () => {
    const price = Number(currentProduct.product_SellingPrice); // Price per unit
    const quantity = Number(currentProduct.quantity); // Quantity of products
    const discountPercentage = Number(currentProduct.product_Discount); // Discount percentage entered (e.g., 10)

    const product_BeforeTax = price * quantity;
    const product_Tax = product_BeforeTax * TAX_RATE; // 5% tax
    const product_AfterTax = product_BeforeTax + product_Tax;
    const product_Discount = (product_AfterTax * discountPercentage) / 100; // Discount in currency
    const product_AfterDiscount = product_AfterTax - product_Discount;

    return {
      product_BeforeTax,
      product_Tax,
      product_AfterTax,
      product_Discount, // Actual discount value (currency)
      product_DiscountPercentage: discountPercentage, // Discount percentage
      product_AfterDiscount,
    };
  };

  const validateProduct = () => {
    if (
      !currentProduct.product ||
      currentProduct.product_SellingPrice <= 0 ||
      currentProduct.quantity <= 0
    ) {
      setProductError("Please provide valid product details.");
      return false;
    }
    setProductError("");
    return true;
  };

  const handleAddProduct = () => {
    if (!validateProduct()) return;

    const {
      product_BeforeTax,
      product_Tax,
      product_AfterTax,
      product_Discount,
      product_DiscountPercentage,
      product_AfterDiscount,
    } = calculateProductTotal();

    const newProduct = {
      ...currentProduct,
      product_BeforeTaxPrice: product_BeforeTax.toFixed(2),
      product_Tax: product_Tax.toFixed(2),
      product_AfterTaxPrice: product_AfterTax.toFixed(2),
      product_Discount: product_Discount.toFixed(2), // Calculated discount value
      product_DiscountPercentage: product_DiscountPercentage.toFixed(2), // Entered percentage
      product_AfterDiscountPrice: product_AfterDiscount.toFixed(2),
      totalPrice: product_AfterDiscount.toFixed(2),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);

    setCurrentProduct({
      product: "",
      product_SellingPrice: 0,
      quantity: 1,
      product_Discount: 0,
      totalPrice: 0,
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    updateGrandTotal(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClient()) return;
    if (products.length === 0) {
      alert("Please add at least one product!");
      return;
    }

    const quote_BeforeTaxPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_BeforeTaxPrice);
    }, 0);

    const quote_AfterTaxPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_AfterTaxPrice);
    }, 0);

    const quote_AfterDiscountPrice = products.reduce((total, product) => {
      return total + parseFloat(product.product_AfterDiscountPrice);
    }, 0);

    const payload = {
      quote_Client: client,
      quote_Products: products.map((prod) => ({
        product: prod.product,
        quantity: prod.quantity,
        product_SellingPrice: prod.product_SellingPrice,
        product_Tax: prod.product_Tax,
        product_DiscountPercentage: prod.product_DiscountPercentage,
        product_Discount: prod.product_Discount,
        product_BeforeTaxPrice: prod.product_BeforeTaxPrice,
        product_AfterTaxPrice: prod.product_AfterTaxPrice,
        product_AfterDiscountPrice: prod.product_AfterDiscountPrice,
      })),
      quote_BeforeTaxPrice: quote_BeforeTaxPrice.toFixed(2),
      quote_AfterTaxPrice: quote_AfterTaxPrice.toFixed(2),
      quote_AfterDiscountPrice: quote_AfterDiscountPrice.toFixed(2),
      quote_InitialPayment: quoteInitialPayment, // Include initial payment
      quote_Details: { status: "Pending" },
    };

    try {
      const response = await axios.post(
        `${API_URL}/quote/create-quote`,
        payload,
        { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Quote Created");
        navigate("/sales/quotes");
        setProducts([]);
        setClient({
          client_Name: "",
          client_Email: "",
          client_Address: "",
        });
      } else {
        alert("Failed to create quote. Please try again.");
      }
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to create quote. Please try again.");
    }
  };

  const updateGrandTotal = (updatedProducts) => {
    const beforeTaxTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_BeforeTaxPrice),
      0
    );
    const afterTaxTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_AfterTaxPrice),
      0
    );
    const afterDiscountTotal = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.product_AfterDiscountPrice),
      0
    );

    setBeforeTaxTotal(beforeTaxTotal.toFixed(2));
    setAfterTaxTotal(afterTaxTotal.toFixed(2));
    setGrandTotal(afterDiscountTotal.toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Convert Lead to Quote
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          {leadDetails ? (
            <div className="p-6">
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Client Name:</strong>{" "}
                <span className="text-gray-900">{leadDetails.lead_Client.client_Name}</span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Client Email:</strong>{" "}
                <span className="text-gray-900">{leadDetails.lead_Client.client_Email}</span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Client Address:</strong>{" "}
                <span className="text-gray-900">{leadDetails.lead_Client.client_Address}</span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Contact Person Name:</strong>{" "}
                <span className="text-gray-900">
                  {leadDetails.lead_ClientContactPerson.client_ClientContactPersonName}
                </span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Contact Person Email:</strong>{" "}
                <span className="text-gray-900">
                  {leadDetails.lead_ClientContactPerson.client_ClientContactPersonEmail}
                </span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Contact Person Phone:</strong>{" "}
                <span className="text-gray-900">
                  {leadDetails.lead_ClientContactPerson.client_ClientContactPersonContact}
                </span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Lead Title:</strong>{" "}
                <span className="text-gray-900">{leadDetails.lead_Title}</span>
              </p>
              <p className="text-lg">
                <strong className="font-semibold text-gray-700">Lead Scope:</strong>{" "}
                <span className="text-gray-900">{leadDetails.lead_Scope}</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading client details...</p>
          )}

        </section>

        <div className="mt-6">
          <label
            htmlFor="initialPayment"
            className="text-sm font-medium text-gray-600"
          >
            Initial Payment %
          </label>
          <input
            type="number"
            id="initialPayment"
            name="initialPayment"
            value={quoteInitialPayment}
            onChange={(e) => setQuoteInitialPayment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <section className="p-6 border border-gray-300 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product"
                className="text-sm font-medium text-gray-600"
              >
                Product
              </label>
              <select
                id="product"
                name="product"
                value={currentProduct.product}
                onChange={handleCurrentProductChange}
                className="w-full p-2 border border-gray-300 rounded-md"
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
            {["product_SellingPrice", "quantity", "product_Discount"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-600"
                  >
                    {field.replace("product_", "").replace("_", " ")}
                  </label>
                  <input
                    type="number"
                    id={field}
                    name={field}
                    value={currentProduct[field]}
                    onChange={handleCurrentProductChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="mt-4 px-4 py-2 bg-btnPrimaryClr hover:bg-btnHoverClr text-white rounded-md"
          >
            Add Product
          </button>

          {productError && <p className="text-red-500 mt-2">{productError}</p>}

          {products.length > 0 && (
            <table className="w-full mt-4 border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Discount Amount</th>
                  <th className="border px-4 py-2">Total (AED)</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              
              <tbody>
  {products.map((prod, index) => (
    <tr key={index}>
      <td className="border px-4 py-2">
        <input
          type="text"
          className="w-full border border-gray-300 p-1"
          value={prod.product}
          onChange={(e) => {
            const updatedProducts = [...products];
            updatedProducts[index].product = e.target.value;
            setProducts(updatedProducts);
          }}
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          className="w-full border border-gray-300 p-1"
          value={prod.product_SellingPrice}
          onChange={(e) => {
            const updatedProducts = [...products];
            updatedProducts[index].product_SellingPrice =
              parseFloat(e.target.value) || 0;
            setProducts(updatedProducts);
            updateGrandTotal(updatedProducts);
          }}
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          className="w-full border border-gray-300 p-1"
          value={prod.quantity}
          onChange={(e) => {
            const updatedProducts = [...products];
            updatedProducts[index].quantity = parseInt(e.target.value) || 0;
            setProducts(updatedProducts);
            updateGrandTotal(updatedProducts);
          }}
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          className="w-full border border-gray-300 p-1"
          value={prod.product_Discount}
          onChange={(e) => {
            const updatedProducts = [...products];
            updatedProducts[index].product_Discount =
              parseFloat(e.target.value) || 0;
            setProducts(updatedProducts);
            updateGrandTotal(updatedProducts);
          }}
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="number"
          className="w-full border border-gray-300 p-1"
          value={prod.totalPrice}
          readOnly // Total price is calculated automatically
        />
      </td>
      <td className="border px-4 py-2 text-center">
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
          )}
          {products.length > 0 && (
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Before Tax Total:{" "}
                <span className="text-indigo-600">{beforeTaxTotal} AED</span>
              </p>
              <p className="text-lg font-semibold">
                After Tax Total:{" "}
                <span className="text-indigo-600">{afterTaxTotal} AED</span>
              </p>
              <p className="text-lg font-semibold">
                Grand Total (After Discount):{" "}
                <span className="text-indigo-600">{grandTotal} AED</span>
              </p>
            </div>
          )}
        </section>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-btnPrimaryClr hover:bg-btnHoverClr text-white rounded-md"
        >
          Submit Quote
        </button>
      </form>
    </div>
  );
};

export default SalesLeadToQuoteConversion;
