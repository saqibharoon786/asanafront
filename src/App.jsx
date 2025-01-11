// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// // Sales
// import {
//   SalesDashboard,
//   SalesAddQuote,
//   SalesViewQuote,
//   SalesPanelQuote,
//   SalesPanelProducts,
//   SalesViewProduct,
//   SalesPanelInvoices,
//   SalesViewInvoice,
//   SalesAddInvoice,
//   SalesLeadPanel,
//   SalesAddLead,
//   SalesViewLead
// } from "./pages/sales/SalesPages";
// // HR
// import { HrDashboard } from "./pages/hr/HrPages";
// // Admin
// import { AdminDashboard, AddStaff, PanelStaff, PanelDepartment, EditStaff, PanelProjects, PanelProducts, PanelQuote, AddQuote, ViewQuote, 
// PanelLeads, AddLead, ViewLead, PanelInvoices, AddInvoice, ViewInvoice, AddProduct, EditProduct } from "./pages/admin/AdminPages";
// // Layouts
// import { AdminLayout, HrLayout, SalesLayout } from "./layouts/Layout";
// // Protected Roots
// import {
//   AdminProtectedRoute,
//   HRProtectedRoute,
//   SalesProtectedRoute,
// } from "./utils/protectedRoutes/ProtectedRoutes";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
        // <Route path="/admin/:name" element={<AdminProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminProtectedRoute>} />

        // <Route path="/staff" element={<AdminProtectedRoute><AdminLayout><PanelStaff /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/addStaff" element={<AdminProtectedRoute><AdminLayout><AddStaff /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/update-staff/:userId" element={<AdminProtectedRoute><AdminLayout><EditStaff /></AdminLayout></AdminProtectedRoute>} />

        // <Route path="/products" element={<AdminProtectedRoute><AdminLayout><PanelProducts /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/add-product" element={<AdminProtectedRoute><AdminLayout><AddProduct /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/update-product/:productId" element={<AdminProtectedRoute><AdminLayout><EditProduct /></AdminLayout></AdminProtectedRoute>} />


        // <Route path="/leads" element={<AdminProtectedRoute><AdminLayout><PanelLeads /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/add-lead" element={<AdminProtectedRoute><AdminLayout><AddLead /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/view-lead/:leadId" element={<AdminProtectedRoute><AdminLayout><ViewLead /></AdminLayout></AdminProtectedRoute>} />

        // <Route path="/quotes" element={<AdminProtectedRoute><AdminLayout><PanelQuote /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/add-quote" element={<AdminProtectedRoute><AdminLayout><AddQuote /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/view-quote/:quoteId" element={<AdminProtectedRoute><AdminLayout><ViewQuote /></AdminLayout></AdminProtectedRoute>} />

        // <Route path="/invoices" element={<AdminProtectedRoute><AdminLayout><PanelInvoices /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/add-invoice" element={<AdminProtectedRoute><AdminLayout><AddInvoice /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/view-invoice/:invoiceId" element={<AdminProtectedRoute><AdminLayout><ViewInvoice /></AdminLayout></AdminProtectedRoute>} />

        // <Route path="/departments" element={<AdminProtectedRoute><AdminLayout><PanelDepartment /></AdminLayout></AdminProtectedRoute>} />
        // <Route path="/projects" element={<AdminProtectedRoute><AdminLayout><PanelProjects /></AdminLayout></AdminProtectedRoute>} />






//         <Route path="/hr/:name" element={<HRProtectedRoute><HrLayout><HrDashboard /></HrLayout></HRProtectedRoute>} />


//         {/* -------------------------------------------------------Sales--------------------------------------------------------------- */}
//         <Route path="/sales/:name" element={<SalesProtectedRoute><SalesLayout><SalesDashboard /></SalesLayout></SalesProtectedRoute>} />
        
//         <Route path="/sales/add-quote" element={<SalesProtectedRoute><SalesLayout><SalesAddQuote /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/view-quote/:quoteId" element={<SalesProtectedRoute><SalesLayout><SalesViewQuote /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/quote-panel" element={<SalesProtectedRoute><SalesLayout><SalesPanelQuote /></SalesLayout></SalesProtectedRoute>} />

    
//         <Route path="/sales/products" element={<SalesProtectedRoute><SalesLayout><SalesPanelProducts /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/view-product/:productId" element={<SalesProtectedRoute><SalesLayout><SalesViewProduct /></SalesLayout></SalesProtectedRoute>} />

//         <Route path="/sales/invoice-panel" element={<SalesProtectedRoute><SalesLayout><SalesPanelInvoices /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/add-invoice" element={<SalesProtectedRoute><SalesLayout><SalesAddInvoice /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/view-invoice/:invoiceId" element={<SalesProtectedRoute><SalesLayout><SalesViewInvoice /></SalesLayout></SalesProtectedRoute>} />

//         <Route path="/sales/leads" element={<SalesProtectedRoute><SalesLayout><SalesLeadPanel /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/add-lead" element={<SalesProtectedRoute><SalesLayout><SalesAddLead /></SalesLayout></SalesProtectedRoute>} />
//         <Route path="/sales/view-lead/:leadId" element={<SalesProtectedRoute><SalesLayout><SalesViewLead /></SalesLayout></SalesProtectedRoute>} />

//       </Routes>
//     </Router>
//   );
// };


// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import SalesRoutes from "./routes/SalesRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {SuperAdminRoutes()}
        {AdminRoutes()}
        {SalesRoutes()}
      </Routes>
    </Router>
  );
}; 

 


export default App;

