import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import './nav.css';

const Navbar = () => {
  const { isSignedIn } = useUser(); // Get the user's signed-in state

  return (
    <nav className="navbar">
      <div className="logo">
        {/* Use the logo directly from the public folder */}
        <img src="./src/assets/logo.png" alt="Mindsphere Logo" />
      </div>

      <div className="nav-items">
        <Link to="/homepage" className="nav-item">Homepage</Link>
        <Link to="/about" className="nav-item">About Us</Link> {/* Link to About Us */}
        <Link to="/csr" className="nav-item">CSR</Link>

        <div className="dropdown">
          <button className="dropbtn">Programmes</button>
          <div className="dropdown-content">
            <Link to="/workshops">Workshops</Link>
            <Link to="/labs">Labs</Link>
            <Link to="/professionals">Professionals</Link>
            <Link to="/camps">Camps</Link>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Media</button>
          <div className="dropdown-content">
            <Link to="/blog">Blog</Link>
            <Link to="/news">News</Link>
          </div>
        </div>

        <Link to="/contact" className="nav-item">Contact Us</Link>

        {/* Conditional rendering of the profile icon or sign-in button */}
        <div className="profile-icon">
          {isSignedIn ? <UserButton /> : <Link to="/sign-in" className="nav-item">Sign In/Sign Up</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
