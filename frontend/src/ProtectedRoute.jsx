// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status from localStorage
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  const userRole = localStorage.getItem("userRole"); // Retrieve userRole from localStorage

  if (!isLoggedIn || !userId || !userRole) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please log in to proceed to checkout." }}
      />
    );
  }

  // Optionally, you can check userRole here to render certain components based on role
  // For example, if the role is admin, you can do something like:
  if (userRole === "admin") {
    // Redirect to an admin dashboard or handle accordingly
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
