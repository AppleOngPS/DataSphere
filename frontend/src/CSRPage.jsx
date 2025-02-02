// src/CSRPage.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./csr.css"; // Import your CSS for styling
import Footer from "./Footer";
import { Link } from "react-router-dom";
import MindsphereLogo from "./assets/logo.png"; // Ensure the path to the logo is correct
import FadeInSection from "./FadeInSection";

const CSRPage = () => {
  return (
    <>
      {/* Trusted by local companies section (with fade-in effect) */}
      <FadeInSection>
        <section className="core-values">
          <h2 className="core-values-title">
            Integrity. Innovation. Inclusivity.
          </h2>
          <p className="core-values-subtitle">
            Where learning meets achievement.
          </p>
          <Link to="/book-session" className="contact-button">
            Speak With Our Friendly Team Now
          </Link>
        </section>
        {/* Trusted by local companies section (with fade-in effect) */}
      </FadeInSection>
      <footer className="footer">
        <img
          src={MindsphereLogo}
          alt="Mindsphere Logo"
          className="mindsphere-logo"
        />
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>
          Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default CSRPage;
