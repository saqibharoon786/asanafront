import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOtherDetails } from "../../../../features/customerSlice";

const SalesOtherDetails = () => {
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
        {/* Currency and Payment Terms in a row */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <select
              name="customer_Currency"
              onChange={handleOtherDetails}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Select currency"
            >
              <option value="">Select currency</option>
              <option value="AED">AED - UAE Dirham</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>
          <div className="w-1/2">
            <select
              name="customer_PaymentTerms"
              onChange={handleOtherDetails}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Select payment terms"
            >
              <option value="Due On Receipt">Due On Receipt</option>
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
            </select>
          </div>
        </div>
  
        {/* Opening Balance and Tax Rate in a row */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <input
              type="text"
              name="customer_OpeningBalance"
              onChange={handleOtherDetails}
              placeholder="Opening balance"
              className="w-full border px-2 py-1 rounded mb-2"
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              name="customer_TaxRate"
              onChange={handleOtherDetails}
              placeholder="Tax rate"
              className="w-full border px-2 py-1 rounded mb-2"
            />
          </div>
        </div>
  
        {/* Enable Portal */}
        <div>
          <input
            type="checkbox"
            name="customer_EnablePortal"
            onChange={handleOtherDetails}
            className="h-5 w-5"
          />
          <span className="ml-2">Enable Portal</span>
        </div>
      </div>
    </div>
  );
  
};

export default SalesOtherDetails;
