// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import "./nav.css";

const Navbar = () => {
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
        </Link>{" "}
        {/* Link to About Us */}
        <Link to="/csr" className="nav-item">
          CSR
        </Link>
        <Link to="/workshops" className="nav-item">
          Programmes
        </Link>
        <Link to="/admin" className="nav-item">
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
        {/* Profile icon placement */}
        <div className="profile-icon">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
