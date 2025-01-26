import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRemarks } from "../../../features/customerSlice";

const Remarks = () => {
    const dispatch = useDispatch();

    const handleRemarks = (e) => {
        dispatch(createRemarks({ field: e.target.name, value: e.target.value }))
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {/* Billing Address */}
                <div>
                    <input
                        type="text"
                        name="customer_Remarks"
                        onChange={handleRemarks}
                        placeholder="Remarks"
                        className="w-full border px-2 py-1 rounded mb-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Remarks;
