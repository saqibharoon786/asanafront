import React from "react";
import { Route } from "react-router-dom";
import { AdminProtectedRoute } from "../utils/protectedRoutes/ProtectedRoutes";
import {
  AdminDashboard,
  AddStaff,
  PanelStaff,
  PanelDepartment,
  EditStaff,
  PanelProjects,
  PanelProducts,
  PanelQuote,
  AddQuote,
  ViewQuote,
  PanelLeads,
  AddLead,
  ViewLead,
  PanelInvoices,
  AddInvoice,
  ViewInvoice,
  AddProduct,
  EditProduct,
} from "../pages/admin/AdminPages";
import { AdminLayout } from "../layouts/Layout";

const AdminRoutes = () => (
  <>
        <Route path="/admin/:name" element={<AdminProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/staff" element={<AdminProtectedRoute><AdminLayout><PanelStaff /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/addStaff" element={<AdminProtectedRoute><AdminLayout><AddStaff /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/update-staff/:userId" element={<AdminProtectedRoute><AdminLayout><EditStaff /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/products" element={<AdminProtectedRoute><AdminLayout><PanelProducts /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/add-product" element={<AdminProtectedRoute><AdminLayout><AddProduct /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/update-product/:productId" element={<AdminProtectedRoute><AdminLayout><EditProduct /></AdminLayout></AdminProtectedRoute>} />


        <Route path="/leads" element={<AdminProtectedRoute><AdminLayout><PanelLeads /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/add-lead" element={<AdminProtectedRoute><AdminLayout><AddLead /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-lead/:leadId" element={<AdminProtectedRoute><AdminLayout><ViewLead /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/quotes" element={<AdminProtectedRoute><AdminLayout><PanelQuote /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/add-quote" element={<AdminProtectedRoute><AdminLayout><AddQuote /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-quote/:quoteId" element={<AdminProtectedRoute><AdminLayout><ViewQuote /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/invoices" element={<AdminProtectedRoute><AdminLayout><PanelInvoices /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/add-invoice" element={<AdminProtectedRoute><AdminLayout><AddInvoice /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-invoice/:invoiceId" element={<AdminProtectedRoute><AdminLayout><ViewInvoice /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/departments" element={<AdminProtectedRoute><AdminLayout><PanelDepartment /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/projects" element={<AdminProtectedRoute><AdminLayout><PanelProjects /></AdminLayout></AdminProtectedRoute>} />
  </>
);

export default AdminRoutes;
