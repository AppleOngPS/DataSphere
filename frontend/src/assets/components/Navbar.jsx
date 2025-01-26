import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole"); // Retrieve role from localStorage
  const dashboardLink =
    userRole === "admin" ? "/adminDashboard" : "/userDashboard"; // Set dashboard link based on role

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/homepage">
          <img src="./src/assets/logo.png" alt="Mindsphere Logo" />
        </Link>
      </div>

      <div className="nav-items">
        <Link to="/homepage" className="nav-item">
          Homepage
        </Link>
        <Link to="/about" className="nav-item">
          About Us
        </Link>
        <Link to="/csr" className="nav-item">
          CSR
        </Link>
        <Link to="/workshops" className="nav-item">
          Programmes
        </Link>

        {/* Conditional Dashboard Link */}
        <Link to={dashboardLink} className="nav-item">
          Dashboard
        </Link>

        <div className="dropdown">
          <button className="dropbtn">Media</button>
          <div className="dropdown-content">
            <Link to="/blog">Blog</Link>
            <Link to="/news">News</Link>
          </div>
        </div>

        <Link to="/signUp" className="nav-item">
          Get Started Today
        </Link>

        {/* Profile icon with link to /profile */}
        <Link to="/profile" className="profile-icon">
          <img src="./src/assets/profile.png" alt="Profile Icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
