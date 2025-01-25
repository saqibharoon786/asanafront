import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer_Type: "", // Enum: ['Business', 'Individual']
    customer_PrimaryInfo: {
      salutation: "",
      firstName: "",
      lastName: "",
    },
    customer_CompanyName: "", // Renamed from customer_Company to match Mongoose schema
    customer_DisplayName: "",
    customer_Email: "",
    customer_Contact: {
      workPhone: "",
      mobilePhone: "",
    },
    customer_Currency: "", 
    customer_TaxRate: "",
    customer_OpeningBalance: 0, 
    customer_PaymentTerms: "Due On Receipt",
    customer_EnablePortal: false, 
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
        first_Name: "",
        last_Name: "",
        email: "",
        phone: "",
        designation: "",
      },
    ],
    customer_Remarks: "",
    customer_Documents: [
      {
        filePath: "",
      },
    ],
    customer_CreatedBy: {
      userId: "",
    },
    customer_CreatedAt: new Date().toISOString(), // Default: current timestamp
    updatedAt: null, // Updated timestamp, null initially
  };  

  const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      updateSingularFields: (state, action) => {
        const { field, value } = action.payload;
        state[field] = value;
      },
      updatePrimaryContact: (state, action) => {
        const {field, value} = action.payload;
        state.customer_PrimaryInfo[field] = value;
      },    
      updatePhone: (state, action) => {
        const {field, value} = action.payload;
        state.customer_Contact[field] = value;
      },    
    },
  });
  
export const { updateSingularFields, updatePrimaryContact, updatePhone } = customerSlice.actions;
export default customerSlice.reducer;
  
