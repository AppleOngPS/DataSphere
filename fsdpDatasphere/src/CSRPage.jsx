// src/CSRPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './csr.css'; // Import your CSS for styling
import './components/nav.css'; // Import Navbar CSS

const CSRPage = () => {
  return (
    <div className="csr-container">
      <h1>We Prioritize Social Responsibility</h1>
      <p>Stay tuned for our next care outreach initiative.</p>

      <section className="values">
     
        <button className="contact-button">Speak With Our Friendly Team Now</button>
      </section>

      <footer className="footer">
        <img src="path_to_mindsphere_logo.png" alt="Mindsphere Logo" className="mindsphere-logo" />
        <nav className="footer-nav">
          <a href="/homepage">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CSRPage;
