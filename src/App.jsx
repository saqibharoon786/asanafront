import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import SalesRoutes from "./routes/SalesRoutes";
import ProjectRoutes from "./routes/ProjectRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        Add the other routes for each section
        {SuperAdminRoutes()}
        {AdminRoutes()}
        {SalesRoutes()}
        {ProjectRoutes()}
      </Routes>
    </Router>
  );
};

export default App;
