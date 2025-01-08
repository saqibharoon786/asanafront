import React from "react";
import { Route } from "react-router-dom";
import { SuperAdminProtectedRoute } from "../utils/protectedRoutes/ProtectedRoutes";
import {
  SuperAdminDashboard,
  PanelCompany,
  AddCompany
} from "../pages/superAdmin/SuperAdminPages";
import { SuperAdminLayout } from "../layouts/Layout";

const SuperAdminRoutes = () => (
  <>
        <Route path="/superadmin/:name" element={<SuperAdminProtectedRoute><SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout></SuperAdminProtectedRoute>} />

        <Route path="/superadmin/company" element={<SuperAdminProtectedRoute><SuperAdminLayout><PanelCompany /></SuperAdminLayout></SuperAdminProtectedRoute>} />
        <Route path="/superadmin/add-company" element={<SuperAdminProtectedRoute><SuperAdminLayout><AddCompany /></SuperAdminLayout></SuperAdminProtectedRoute>} />
  </>
);

export default SuperAdminRoutes;
