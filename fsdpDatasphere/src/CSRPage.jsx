// src/CSRPage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./csr.css"; // Import your CSS for styling
import "./components/nav.css"; // Import Navbar CSS
import Footer from "./Footer"; // Import Footer component

import Mindsphere from "./assets/logo.png";

const CSRPage = () => {
  return (
    <div className="csr-container">
      {/* Import and use Footer component */}
      <Footer />
    </div>
  );
};

export default CSRPage;
