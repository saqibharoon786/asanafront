import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAddress } from "../../../../features/customerSlice";

const Address = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);

  const handleAddress = (addressType, field) => (e) => {
    dispatch(
      createAddress({
        addressType,
        field,
        value: e.target.value,
      })
    );
  };

  return (
    <>
      <div className="tab-pane w-2/3">
        <div className="space-y-6">
          {/* Billing Address */}
          <div className="flex space-x-6">
            <div className="w-1/2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Billing Address</h3>

              {/* Attention */}
              <div className="flex items-center space-x-4 mb-4 ">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Attention</label>
                <input
                  id="billingAddress_Attention"
                  name="billingAddress_Attention"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_Attention}
                  onChange={handleAddress("billingAddress", "billingAddress_Attention")}
                  placeholder="Attention"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Country / Region */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Country / Region</label>
                <select
                  id="billingAddress_Country"
                  name="billingAddress_Country"
                  value={customerData.customer_Address.billingAddress.billingAddress_Country || ""}
                  onChange={handleAddress("billingAddress", "billingAddress_Country")}
                  className="flex-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a Region</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  <option value="UAE">UAE</option>
                </select>

              </div>

              {/* State */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">State</label>
                <select
                  id="billingAddress_State"
                  name="billingAddress_State"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_State}
                  onChange={handleAddress("billingAddress", "billingAddress_State")}
                  className="flex-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a State</option>
                  {customerData.customer_Address.billingAddress.billingAddress_Country === "USA" && (
                    <>
                      <option value="California">California</option>
                      <option value="Texas">Texas</option>
                      <option value="Florida">Florida</option>
                      <option value="New York">New York</option>
                    </>
                  )}
                  {customerData.customer_Address.billingAddress.billingAddress_Country === "Canada" && (
                    <>
                      <option value="Ontario">Ontario</option>
                      <option value="Quebec">Quebec</option>
                      <option value="British Columbia">British Columbia</option>
                    </>
                  )}
                  {customerData.customer_Address.billingAddress.billingAddress_Country === "India" && (
                    <>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </>
                  )}
                  {customerData.customer_Address.billingAddress.billingAddress_Country === "UAE" && (
                    <>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Al Ain">Al Ain</option>
                    </>
                  )}
                </select>
              </div>



              {/* Address */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Address</label>
                <textarea
                  id="billingAddress_Address"
                  name="billingAddress_Address"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_Address}
                  onChange={handleAddress("billingAddress", "billingAddress_Address")}
                  placeholder="Address"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              {/* City */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">City</label>
                <input
                  id="billingAddress_City"
                  name="billingAddress_City"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_City}
                  onChange={handleAddress("billingAddress", "billingAddress_City")}
                  placeholder="City"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Zip Code */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Zip Code</label>
                <input
                  id="billingAddress_ZipCode"
                  name="billingAddress_ZipCode"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_ZipCode}
                  onChange={handleAddress("billingAddress", "billingAddress_ZipCode")}
                  placeholder="Zip Code"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Phone</label>
                <input
                  id="billingAddress_Phone"
                  name="billingAddress_Phone"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_Phone}
                  onChange={handleAddress("billingAddress", "billingAddress_Phone")}
                  placeholder="Phone"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Fax Number */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Fax Number</label>
                <input
                  id="billingAddress_FaxNo"
                  name="billingAddress_FaxNo"
                  type="text"
                  value={customerData.customer_Address.billingAddress.billingAddress_FaxNo}
                  onChange={handleAddress("billingAddress", "billingAddress_FaxNo")}
                  placeholder="Fax #"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="w-1/2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Shipping Address</h3>

              {/* Attention */}
              <div className="flex items-center space-x-4 mb-4 ">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Attention</label>
                <input
                  id="shippingAddress_Attention"
                  name="shippingAddress_Attention"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_Attention}
                  onChange={handleAddress("shippingAddress", "shippingAddress_Attention")}
                  placeholder="Attention"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Country / Region */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Country / Region</label>
                <select
                  id="shippingAddress_Country"
                  name="shippingAddress_Country"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_Country}
                  onChange={handleAddress("shippingAddress", "shippingAddress_Country")}
                  className="flex-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a Region</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>

              {/* State */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">State</label>
                <select
                  id="shippingAddress_State"
                  name="shippingAddress_State"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_State}
                  onChange={handleAddress("shippingAddress", "shippingAddress_State")}
                  className="flex-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a State</option>
                  {customerData.customer_Address.shippingAddress.shippingAddress_Country === "USA" && (
                    <>
                      <option value="California">California</option>
                      <option value="Texas">Texas</option>
                      <option value="Florida">Florida</option>
                      <option value="New York">New York</option>
                    </>
                  )}
                  {customerData.customer_Address.shippingAddress.shippingAddress_Country === "Canada" && (
                    <>
                      <option value="Ontario">Ontario</option>
                      <option value="Quebec">Quebec</option>
                      <option value="British Columbia">British Columbia</option>
                    </>
                  )}
                  {customerData.customer_Address.shippingAddress.shippingAddress_Country === "India" && (
                    <>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </>
                  )}
                  {customerData.customer_Address.shippingAddress.shippingAddress_Country === "UAE" && (
                    <>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Al Ain">Al Ain</option>
                    </>
                  )}
                </select>
              </div>



              {/* Address */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Address</label>
                <textarea
                  id="shippingAddress_Address"
                  name="shippingAddress_Address"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_Address}
                  onChange={handleAddress("shippingAddress", "shippingAddress_Address")}
                  placeholder="Address"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              {/* City */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">City</label>
                <input
                  id="shippingAddress_City"
                  name="shippingAddress_City"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_City}
                  onChange={handleAddress("shippingAddress", "shippingAddress_City")}
                  placeholder="City"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Zip Code */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Zip Code</label>
                <input
                  id="shippingAddress_ZipCode"
                  name="shippingAddress_ZipCode"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_ZipCode}
                  onChange={handleAddress("shippingAddress", "shippingAddress_ZipCode")}
                  placeholder="Zip Code"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Phone</label>
                <input
                  id="shippingAddress_Phone"
                  name="shippingAddress_Phone"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_Phone}
                  onChange={handleAddress("shippingAddress", "shippingAddress_Phone")}
                  placeholder="Phone"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Fax Number */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Fax Number</label>
                <input
                  id="shippingAddress_FaxNo"
                  name="shippingAddress_FaxNo"
                  type="text"
                  value={customerData.customer_Address.shippingAddress.shippingAddress_FaxNo}
                  onChange={handleAddress("shippingAddress", "shippingAddress_FaxNo")}
                  placeholder="Fax #"
                  className="flex-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Address;
