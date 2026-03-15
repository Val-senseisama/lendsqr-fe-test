import React from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
