import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./assets/logo.png"; // Make sure this path is correct

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="MindSphere Logo" className="logo-image" />
      </Link>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/csr" className="nav-link">
          CSR
        </Link>
        <Link to="/programmes" className="nav-link">
          Programmes
        </Link>{" "}
        {/* Link to Programmes page */}
        <Link to="/media" className="nav-link">
          Media
        </Link>
      </nav>

      <Link to="/get-started" className="cta-button">
        Get started today
      </Link>
    </header>
  );
};

export default Header;
