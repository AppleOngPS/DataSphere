// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status from localStorage

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please log in to proceed to checkout." }}
      />
    );
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
