// src/pages/homepage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./homepage.css"; // Ensure this CSS aligns with your design style
import homeImage from "./assets/home.png"; // Import the main image

// Import each logo (replace with actual paths if available)
import fundigoLogo from "./assets/fundigo.png";
import ieaLogo from "./assets/iea.png";
import jcuLogo from "./assets/jcu.png";
import orchidLogo from "./assets/orchid.png";
import classLivingLogo from "./assets/classLiving.png";
import learningApproachImage from "./assets/logohome.png";
import GuyLogo from "./assets/homepageguy1.jpg";
import Mindsphere from "./assets/logo.png";
import learningImg from "./assets/logoright.png";

const Homepage = () => (
  <div className="home-page">
    <header className="home-header">
      <img src={homeImage} alt="Mindsphere Logo" />
      <button className="cta-button">Get Started</button>
    </header>
  </div>
);

export default Homepage;
