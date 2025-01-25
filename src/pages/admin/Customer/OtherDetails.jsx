import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSingularFields } from "../../../features/customerSlice";

const OtherDetails = () => {
  const otherDetails = useSelector((state) => ({
    customer_Currency: state.customer.customer_Currency,
    customer_PaymentTerms: state.customer.customer_PaymentTerms,
    customer_EnablePortal: state.customer.customer_EnablePortal,
  }));
  const dispatch = useDispatch();

  const handleCustomerOtherDetailsChange = (e) => {
    const { name, type, value, checked } = e.target;
    dispatch(
      updateSingularFields({
        field: name,
        value: type === "checkbox" ? checked : value,
      })
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Other Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Currency:</label>
          <select
            value={otherDetails.customer_Currency}
            name="customer_Currency"
            onChange={handleCustomerOtherDetailsChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            <option value="AED">AED - UAE Dirham</option>
            <option value="USD">USD - US Dollar</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Terms:</label>
          <select
            value={otherDetails.customer_PaymentTerms}
            name="customer_PaymentTerms"
            onChange={handleCustomerOtherDetailsChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Due On Receipt">Due On Receipt</option>
            <option value="Net 15">Net 15</option>
            <option value="Net 30">Net 30</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Enable Portal:</label>
          <input
            type="checkbox"
            checked={otherDetails.customer_EnablePortal}
            name="customer_EnablePortal"
            onChange={handleCustomerOtherDetailsChange}
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
