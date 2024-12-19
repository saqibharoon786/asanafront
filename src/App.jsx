import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// Sales 
import {SalesDashboard,SalesAddQuote,SalesViewQuote,SalesPanelQuote,SalesLeads} from './pages/sales/SalesPages'
// HR
import { HrDashboard} from './pages/hr/HrPages';
// Admin
import { AdminDashboard, AddStaff, PanelStaff, PanelDepartment,EditStaff, PanelProjects, PanelProducts, PanelQuote, AddQuote, ViewQuote, PanelLeads, AddLead, ViewLead, PanelInvoices, AddInvoice, ViewInvoice,AddProduct, EditProduct } from "./pages/admin/AdminPages";
// Layouts 
import { AdminLayout, HrLayout, SalesLayout } from "./layouts/Layout";
// Protected Roots
import { AdminProtectedRoute, HRProtectedRoute, SalesProtectedRoute } from "./utils/protectedRoutes/ProtectedRoutes";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/*---------------------------------------------------------Admin Routes---------------------------------*/}
        <Route path="/admin/:name" element={<AdminProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/update-staff/:userId" element={<AdminProtectedRoute><AdminLayout><EditStaff /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/staff" element={<AdminProtectedRoute><AdminLayout><PanelStaff /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/products" element={<AdminProtectedRoute><AdminLayout><PanelProducts /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/add-product" element={<AdminProtectedRoute><AdminLayout><AddProduct /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/edit-product" element={<AdminProtectedRoute><AdminLayout><EditProduct /></AdminLayout></AdminProtectedRoute>} />

        <Route path="/addStaff" element={<AdminProtectedRoute><AdminLayout><AddStaff /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/leads" element={<AdminProtectedRoute><AdminLayout><PanelLeads /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/addNewLead" element={<AdminProtectedRoute><AdminLayout><AddLead /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-lead/:leadId" element={<AdminProtectedRoute><AdminLayout><ViewLead /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/quotePanel" element={<AdminProtectedRoute><AdminLayout><PanelQuote /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/addNewQuote" element={<AdminProtectedRoute><AdminLayout><AddQuote /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-quote/:quoteId" element={<AdminProtectedRoute><AdminLayout><ViewQuote /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/invoicePanel" element={<AdminProtectedRoute><AdminLayout><PanelInvoices /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/addNewInvoice" element={<AdminProtectedRoute><AdminLayout><AddInvoice /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/view-invoice/:invoiceId" element={<AdminProtectedRoute><AdminLayout><ViewInvoice /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/Department" element={<AdminProtectedRoute><AdminLayout><PanelDepartment /></AdminLayout></AdminProtectedRoute>} />
        <Route path="/Projects" element={<AdminProtectedRoute><AdminLayout><PanelProjects /></AdminLayout></AdminProtectedRoute>} />
        {/*---------------------------------------------------------Hr Routes---------------------------------*/}
        <Route path="/hr/:name" element={<HRProtectedRoute><HrLayout><HrDashboard /></HrLayout></HRProtectedRoute>} />
        {/*-----------------------------------------------------------Sales-------------------------------------*/}
        <Route path="/sales/:name" element={<SalesProtectedRoute><SalesLayout><SalesDashboard /></SalesLayout></SalesProtectedRoute>} />
        <Route path="/sales-Add-New-Quote" element={<SalesProtectedRoute><SalesLayout><SalesAddQuote /></SalesLayout></SalesProtectedRoute>} />
        <Route path="/view-quote/:quoteId" element={<SalesProtectedRoute><SalesLayout><SalesViewQuote /></SalesLayout></SalesProtectedRoute>} />
        <Route path="/sales-Quote-Panel" element={<SalesProtectedRoute><SalesLayout><SalesPanelQuote /></SalesLayout></SalesProtectedRoute>} />
        <Route path="/sales-leads" element={<SalesProtectedRoute><SalesLayout><SalesLeads /></SalesLayout></SalesProtectedRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
