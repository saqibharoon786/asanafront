import React from "react";
import { Route } from "react-router-dom";
import { HRProtectedRoute } from "../utils/protectedRoutes/ProtectedRoutes";
import { HrDashboard } from "../pages/hr/HrPages";
import { HrLayout } from "../layouts/Layout";

const HrRoutes = () => (
  <>
    <Route path="/hr/:name" element={<HRProtectedRoute><HrLayout><HrDashboard /></HrLayout></HRProtectedRoute>} />
  </>
);

export default HrRoutes;
