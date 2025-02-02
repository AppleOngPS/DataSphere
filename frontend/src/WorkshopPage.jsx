import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addHours } from "date-fns"; // ✅ Import date formatting
import "./WorkshopPage.css";
import Mindsphere from "./assets/logo.png";
import Footer from "./Footer";
import FadeInSection from "./FadeInSection"; // Import the FadeInSection component

const WorkshopPage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [programmeCards, setProgrammeCards] = useState([]);
  const [membership, setMembership] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch Programmes
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch("http://localhost:3000/programs");
        const data = await response.json();
        setProgrammes(data);
      } catch (error) {
        console.error("Error fetching programmes:", error);
      }
    };
    fetchProgrammes();
  }, []);

  // ✅ Fetch Membership Data
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`http://localhost:3000/memberships/${userId}`);
        if (!response.ok) throw new Error("Membership not found");

        const membershipData = await response.json();
        console.log("📌 Membership Data:", membershipData);
        setMembership(membershipData);
      } catch (error) {
        console.log("❌ No active membership for this user.");
        setMembership(null);
      }
    };

    fetchMembership();
  }, [userId]);

  // ✅ Fetch Programme Cards
  const handleProgrammeClick = async (programme) => {
    setSelectedProgramme(programme);
    try {
      const response = await fetch(`http://localhost:3000/programs/${programme.programID}/cards`);
      const cardsData = await response.json();
      setProgrammeCards(cardsData);
    } catch (error) {
      console.error("Error fetching programme cards:", error);
    }
  };

  // ✅ Apply Membership Discount
  const getDiscountedPrice = (programPrice) => {
    if (membership?.isActive) {
      const discount = membership.DiscountRate || 0;
      return (programPrice * (1 - discount)).toFixed(2);
    }
    return programPrice.toFixed(2);
  };

  // ✅ Handle Checkout
  const handleGetStartedButton = (cardID) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please log in to proceed to checkout.");
      navigate("/login");
    } else {
      navigate(`/checkout/${cardID}`);
    }
  };

  return (
    <div className="workshop">
      <FadeInSection>
        <section className="signature-programmes" id="programmes">
          <h2>Our Signature Programmes</h2>
          <p>Select each programme to find out more</p>
          <div className="programme-cards">
            {programmes.map((programme) => (
              <FadeInSection key={programme.programID}>
                <div className="programme-card" onClick={() => handleProgrammeClick(programme)}>
                  <img src={programme.imagePath || Mindsphere} alt={programme.name} />
                  <p>{programme.name}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>
      </FadeInSection>

      {selectedProgramme && (
        <FadeInSection>
          <section className="selected-programme">
            <h2>{selectedProgramme.name}</h2>
            <div className="workshop-details">
              {programmeCards.map((card) => (
                <FadeInSection key={card.cardID}>
                  <div className="workshop-card">
                    <h3>
                      {card.programPrice
                        ? membership?.isActive
                          ? `Member Price: $${getDiscountedPrice(card.programPrice)}`
                          : `Standard Price: $${card.programPrice.toFixed(2)}`
                        : "Coming Soon"}
                    </h3>

                    {card.originalPrice && (
                      <div>
                        <s>Was ${card.originalPrice.toFixed(2)}</s>
                      </div>
                    )}
                    <div>{card.cardName}</div>
                    <div>Class size: {card.classSize}</div>
                    <div>Duration: {card.duration}</div>
                    <div>{card.lunchProvided ? "Lunch provided" : "Lunch not provided"}</div>
                    <div>{card.membershipBenefits}</div>

                    {card.programPrice && (
                      <button onClick={() => handleGetStartedButton(card.cardID)}>Get Started</button>
                    )}
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>
        </FadeInSection>
      )}

      <Footer />
    </div>
  );
};

export default WorkshopPage;
