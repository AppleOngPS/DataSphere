import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get the message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Logged in successfully!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);
        console.log("User ID:", data.userId);
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in.");
    }
  };

  return (
    <div className="auth-container">
      <h1>mindsphere</h1>
      {/* Display the redirect message if it exists */}
      {location.state?.message && (
        <p className="redirect-message">{location.state.message}</p>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <Link to="/signup" className="toggle-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
