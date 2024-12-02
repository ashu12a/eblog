import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./auth/Sidebar";

const PrivateRoute = () => {
  const { token, user, loading } = useAuth();

  // Show loader while checking authentication
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  // If authenticated, render the protected route
  return token && user ? (
    <Sidebar>
      <Outlet />
    </Sidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
