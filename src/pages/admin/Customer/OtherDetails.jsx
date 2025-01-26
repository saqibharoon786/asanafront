import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOtherDetails } from "../../../features/customerSlice";

const OtherDetails = () => {
  const dispatch = useDispatch();

  const handleOtherDetails = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      createOtherDetails({
        field: name,
        value: type === "checkbox" ? checked : value,
      })
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Other Details</h2>
      <div className="space-y-4">
        {/* Currency */}
        <div>
          <label className="block font-medium mb-1">Currency:</label>
          <select
            name="customer_Currency"
            onChange={handleOtherDetails}
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            <option value="AED">AED - UAE Dirham</option>
            <option value="USD">USD - US Dollar</option>
          </select>
        </div>

        {/* Payment Terms */}
        <div>
          <label className="block font-medium mb-1">Payment Terms:</label>
          <select
            name="customer_PaymentTerms"
            onChange={handleOtherDetails}
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Due On Receipt">Due On Receipt</option>
            <option value="Net 15">Net 15</option>
            <option value="Net 30">Net 30</option>
          </select>
        </div>

        {/* Opening Balance */}
        <div>
          <label className="block font-medium mb-1">Opening Balance:</label>
          <input
            type="text"
            name="customer_OpeningBalance"
            onChange={handleOtherDetails}
            placeholder="Enter opening balance"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block font-medium mb-1">Tax Rate:</label>
          <input
            type="text"
            name="customer_TaxRate"
            onChange={handleOtherDetails}
            placeholder="Enter tax rate"
            className="w-full border px-2 py-1 rounded mb-2"
          />
        </div>

        {/* Enable Portal */}
        <div>
          <label className="block font-medium mb-1">Enable Portal:</label>
          <input
            type="checkbox"
            name="customer_EnablePortal"
            onChange={handleOtherDetails}
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
