import React from "react";
import { Route } from "react-router-dom";
import { SalesProtectedRoute } from "../utils/protectedRoutes/ProtectedRoutes";
import {
  SalesDashboard,
  SalesAddQuote,
  SalesViewQuote,
  SalesPanelQuote,
  SalesPanelProducts,
  SalesAddProduct,
  SalesViewProduct,
  SalesEditProduct,
  SalesPanelInvoices,
  SalesViewInvoice,
  SalesAddInvoice,
  SalesLeadDetails,
  SalesOptionalDataLead,
  SalesPanelLeads,
  SalesPanelCalender,
  SalesPanelCustomer,
  SalesAddCustomer,
  SalesEditCustomer
} from "../pages/sales/SalesPages";
import { SalesLayout } from "../layouts/Layout";

const SalesRoutes = () => (
  <>
    <Route path="/sales/:name" element={<SalesProtectedRoute><SalesLayout><SalesDashboard /></SalesLayout></SalesProtectedRoute>} />
        
    <Route path="/sales/quotes" element={<SalesProtectedRoute><SalesLayout><SalesPanelQuote /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-quote" element={<SalesProtectedRoute><SalesLayout><SalesAddQuote /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-quote/:quoteId" element={<SalesProtectedRoute><SalesLayout><SalesViewQuote /></SalesLayout></SalesProtectedRoute>} />
            
    <Route path="/sales/products" element={<SalesProtectedRoute><SalesLayout><SalesPanelProducts /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-product" element={<SalesProtectedRoute><SalesLayout><SalesAddProduct /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/update-product/:productId" element={<SalesProtectedRoute><SalesLayout><SalesEditProduct /></SalesLayout></SalesProtectedRoute>} />
    {/* <Route path="/sales/view-product/:productId" element={<SalesProtectedRoute><SalesLayout><SalesViewProduct /></SalesLayout></SalesProtectedRoute>} /> */}
        
    <Route path="/sales/invoices" element={<SalesProtectedRoute><SalesLayout><SalesPanelInvoices /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-invoice" element={<SalesProtectedRoute><SalesLayout><SalesAddInvoice /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-invoice/:invoiceId" element={<SalesProtectedRoute><SalesLayout><SalesViewInvoice /></SalesLayout></SalesProtectedRoute>} />
        
    <Route path="/sales/leads" element={<SalesProtectedRoute><SalesLayout><SalesPanelLeads /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/lead-detail/:id" element={<SalesProtectedRoute><SalesLayout><SalesLeadDetails /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/optional-data-lead/:leadId" element={<SalesProtectedRoute><SalesLayout> <SalesOptionalDataLead /></SalesLayout></SalesProtectedRoute>}/>

    <Route path="/sales/calender" element={<SalesProtectedRoute><SalesLayout> <SalesPanelCalender /></SalesLayout></SalesProtectedRoute>}/>

    <Route path="/sales/customers" element={<SalesProtectedRoute><SalesLayout><SalesPanelCustomer /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-customers" element={<SalesProtectedRoute><SalesLayout><SalesAddCustomer /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-customer" element={<SalesProtectedRoute><SalesLayout><SalesEditCustomer /></SalesLayout></SalesProtectedRoute>} />
  </>
);

export default SalesRoutes;