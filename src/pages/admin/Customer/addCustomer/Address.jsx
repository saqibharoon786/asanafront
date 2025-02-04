import React from "react";
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
        value: e.target.value, // Use the actual input value
      })
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Address</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Billing Address */}
        <div>
          <h3 className="font-semibold mb-2">Billing Address</h3>
          <input
            type="text"
            value={customerData.customer_Address.billingAddress.street}
            onChange={handleAddress("billingAddress", "street")}
            placeholder="Street"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.billingAddress.city}
            onChange={handleAddress("billingAddress", "city")}
            placeholder="City"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.billingAddress.state}
            onChange={handleAddress("billingAddress", "state")}
            placeholder="State"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.billingAddress.postalCode}
            onChange={handleAddress("billingAddress", "postalCode")}
            placeholder="Postal Code"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.billingAddress.country}
            onChange={handleAddress("billingAddress", "country")}
            placeholder="Country"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <input
            type="text"
            value={customerData.customer_Address.shippingAddress.street}
            onChange={handleAddress("shippingAddress", "street")}
            placeholder="Street"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.shippingAddress.city}
            onChange={handleAddress("shippingAddress", "city")}
            placeholder="City"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.shippingAddress.state}
            onChange={handleAddress("shippingAddress", "state")}
            placeholder="State"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.shippingAddress.postalCode}
            onChange={handleAddress("shippingAddress", "postalCode")}
            placeholder="Postal Code"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={customerData.customer_Address.shippingAddress.country}
            onChange={handleAddress("shippingAddress", "country")}
            placeholder="Country"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
