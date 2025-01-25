import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSingularFields } from "../../../features/customerSlice";

const Address = () => {
  const billing = useSelector((state) => state.customer.customer_Address.billing_Address);
  const shipping = useSelector((state) => state.customer.customer_Address.shipping_Address);
  const dispatch = useDispatch();

  const handleAddressChange = (type, field) => (event) => {
    dispatch(updateSingularFields({ field: `customer_Address.${type}.${field}`, value: event.target.value }));
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
            value={billing.street}
            onChange={handleAddressChange("billing_Address", "street")}
            placeholder="Street"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={billing.city}
            onChange={handleAddressChange("billing_Address", "city")}
            placeholder="City"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={billing.state}
            onChange={handleAddressChange("billing_Address", "state")}
            placeholder="State"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={billing.postalCode}
            onChange={handleAddressChange("billing_Address", "postalCode")}
            placeholder="Postal Code"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <input
            type="text"
            value={shipping.street}
            onChange={handleAddressChange("shipping_Address", "street")}
            placeholder="Street"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={shipping.city}
            onChange={handleAddressChange("shipping_Address", "city")}
            placeholder="City"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={shipping.state}
            onChange={handleAddressChange("shipping_Address", "state")}
            placeholder="State"
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            value={shipping.postalCode}
            onChange={handleAddressChange("shipping_Address", "postalCode")}
            placeholder="Postal Code"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
