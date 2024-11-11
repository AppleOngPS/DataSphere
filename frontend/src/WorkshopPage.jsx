import React, { useState } from "react";
import "./WorkshopPage.css";
import { useNavigate } from "react-router-dom";
import programmes from "./programmesData";
import Mindsphere from "./assets/logo.png";

const WorkshopPage = () => {
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const navigate = useNavigate();

  const handleProgrammeClick = (programme) => {
    setSelectedProgramme(programme);
  };

  // Updated function to navigate to CheckoutPage
  const handleGetStartedButton = (workshopId) => {
    navigate("/checkout", { state: { workshopId } });
  };

  return (
    <div className="workshop">
      <section className="signature-programmes" id="programmes">
        <h2>Our Signature Programmes</h2>
        <p>Select each programme to find out more</p>
        <div className="programme-cards">
          {programmes.map((programme, index) => (
            <div
              className="programme-card"
              key={index}
              onClick={() => handleProgrammeClick(programme)}
            >
              <img src={programme.image} alt={programme.name} />
              <p>{programme.name}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedProgramme && (
        <section className="selected-programme">
          <h2>{selectedProgramme.name}</h2>
          <p>{selectedProgramme.description}</p>

          {/* Displaying workshop cards */}
          {selectedProgramme.workshopCards.length > 0 && (
            <div className="workshop-details">
              {selectedProgramme.workshopCards.map((card, index) => (
                <div className="workshop-card" key={index}>
                  <h3>{card.price}</h3>
                  {card.originalPrice && (
                    <p>
                      <s>Was {card.originalPrice}</s>
                    </p>
                  )}
                  <p>Class size: {card.classSize}</p>
                  <p>Duration: {card.duration}</p>
                  <p>
                    {card.lunchProvided
                      ? "Lunch provided"
                      : "Lunch not provided"}
                  </p>
                  <p>{card.membershipBenefits}</p>
                  <button onClick={() => handleGetStartedButton(index + 1)}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      <section className="values">
        <h2 className="values-title">Integrity. Innovation. Inclusivity.</h2>
        <p className="values-subtitle">Where learning meets achievement.</p>
        <button className="contact-button">
          Speak With Our Friendly Team Now
        </button>
      </section>

      <footer className="footer">
        <img
          src={Mindsphere}
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
    </div>
  );
};

export default WorkshopPage;
