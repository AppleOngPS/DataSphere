import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status from localStorage

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please create an account and log in first." }}
      />
    );
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
