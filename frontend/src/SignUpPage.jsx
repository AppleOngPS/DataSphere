import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    contactNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Sign up successful!");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up.");
    }
  };

  return (
    <div className="auth-container">
      <h1>mindsphere</h1>
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
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Have an account?{" "}
        <Link to="/login" className="toggle-link">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
