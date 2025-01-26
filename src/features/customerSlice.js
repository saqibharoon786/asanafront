import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer_GeneralDetails: {
    customer_Type: "", // Enum: ['Business', 'Individual']
    customer_PrimaryInfo: {
      salutation: "",
      firstName: "",
      lastName: "",
    },
    customer_CompanyName: "",
    customer_DisplayName: "",
    customer_Email: "",
    customer_Contact: {
      workPhone: "",
      mobilePhone: "",
    },
  },
  customer_OtherDetails: {
    customer_Currency: "",
    customer_PaymentTerms: "Due On Receipt", // Enum: ['Due On Receipt', 'Net 15', 'Net 30', 'Net 45', 'Net 60']
    customer_EnablePortal: false,
    customer_OpeningBalance: 0,
    customer_TaxRate: 0,
    customer_Documents: [
      {
        filePath: "",
      },
    ],
  },
  customer_Address: {
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  },
  customer_ContactPersons: [
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designation: "",
    },
  ],
  customer_Remarks: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createGeneralDetails: (state, action) => {
      const { field, value } = action.payload;
      if (field === "salutation" || field === "firstName" || field === "lastName") {
        state.customer_GeneralDetails.customer_PrimaryInfo[field] = value;
      }
      if (field === "workPhone" || field === "mobilePhone") {
        state.customer_GeneralDetails.customer_Contact[field] = value;
      } else {
        state.customer_GeneralDetails[field] = value;
      }
    },
    createOtherDetails: (state, action) => {
      const { field, value } = action.payload;
      if (field === "document") {
        return;
      } else {
        state.customer_OtherDetails[field] = value;
      }
    },
    createAddress: (state, action) => {
      const { addressType, field, value } = action.payload;
      if (addressType === "billingAddress") {
        state.customer_Address.billingAddress[field] = value;
      }
      else if (addressType === "shippingAddress"){
        state.customer_Address.shippingAddress[field] = value;
      }
    },
    createContactPersons: (state, action) => {
      const { field, index, value } = action.payload;
      if (state.customer_ContactPersons[index]) {
        state.customer_ContactPersons[index][field] = value;
      } else {
        state.customer_ContactPersons.push({ 
          salutation: "", 
          firstName: "", 
          lastName: "", 
          email: "", 
          phone: "", 
          designation: "" 
        });
        state.customer_ContactPersons[index][field] = value;
      }
    },    
    createRemarks: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { createGeneralDetails, createOtherDetails, createAddress, createContactPersons, createRemarks } = customerSlice.actions;
export default customerSlice.reducer;

