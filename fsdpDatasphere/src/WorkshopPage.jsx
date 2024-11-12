import React, { useState } from "react";
import "./WorkshopPage.css";
import programmes from "./programmesData";
import Mindsphere from "./assets/logo.png";
import Footer from "./Footer"; // Import Footer component

const WorkshopPage = () => {
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const handleProgrammeClick = (programme) => {
    setSelectedProgramme(programme);
  };

  // Handle "Get Started" click
  const handleGetStartedButton = (workshopId) => {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: workshopId, quantity: 1 }], // Pass the selected workshop ID
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
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
      {/* Import and use Footer component */}
      <Footer />
    </div>
  );
};

export default WorkshopPage;
