import React from "react";
import { Route } from "react-router-dom";
import { SalesProtectedRoute } from "../utils/protectedRoutes/ProtectedRoutes";
import {
  SalesDashboard,
  SalesAddQuote,
  SalesViewQuote,
  SalesPanelQuote,
  SalesPanelProducts,
  SalesViewProduct,
  SalesPanelInvoices,
  SalesViewInvoice,
  SalesAddInvoice,
  SalesLeadPanel,
  SalesAddLead,
  SalesViewLead
} from "../pages/sales/SalesPages";
import { SalesLayout } from "../layouts/Layout";

const SalesRoutes = () => (
  <>
      <Route path="/sales/:name" element={<SalesProtectedRoute><SalesLayout><SalesDashboard /></SalesLayout></SalesProtectedRoute>} />
        
    <Route path="/sales/add-quote" element={<SalesProtectedRoute><SalesLayout><SalesAddQuote /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-quote/:quoteId" element={<SalesProtectedRoute><SalesLayout><SalesViewQuote /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/quote-panel" element={<SalesProtectedRoute><SalesLayout><SalesPanelQuote /></SalesLayout></SalesProtectedRoute>} />
        
            
    <Route path="/sales/products" element={<SalesProtectedRoute><SalesLayout><SalesPanelProducts /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-product/:productId" element={<SalesProtectedRoute><SalesLayout><SalesViewProduct /></SalesLayout></SalesProtectedRoute>} />
        
    <Route path="/sales/invoice-panel" element={<SalesProtectedRoute><SalesLayout><SalesPanelInvoices /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-invoice" element={<SalesProtectedRoute><SalesLayout><SalesAddInvoice /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-invoice/:invoiceId" element={<SalesProtectedRoute><SalesLayout><SalesViewInvoice /></SalesLayout></SalesProtectedRoute>} />
        
    <Route path="/sales/leads" element={<SalesProtectedRoute><SalesLayout><SalesLeadPanel /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/add-lead" element={<SalesProtectedRoute><SalesLayout><SalesAddLead /></SalesLayout></SalesProtectedRoute>} />
    <Route path="/sales/view-lead/:leadId" element={<SalesProtectedRoute><SalesLayout><SalesViewLead /></SalesLayout></SalesProtectedRoute>} />
  </>
);

export default SalesRoutes;
