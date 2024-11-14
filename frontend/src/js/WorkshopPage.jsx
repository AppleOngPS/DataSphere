import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkshopPage.css";
import Mindsphere from "./assets/logo.png";

const WorkshopPage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [programmeCards, setProgrammeCards] = useState([]);
  const navigate = useNavigate();

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

  const handleProgrammeClick = async (programme) => {
    setSelectedProgramme(programme);
    try {
      const response = await fetch(
        `http://localhost:3000/programs/${programme.programID}/cards`
      );
      const cardsData = await response.json();
      setProgrammeCards(cardsData);
    } catch (error) {
      console.error("Error fetching programme cards:", error);
    }
  };

  // Updated function to navigate to CheckoutPage
  const handleGetStartedButton = (cardID) => {
    navigate(`/checkout/${cardID}`);
  };

  const renderProgramDescription = () => {
    if (!selectedProgramme) return null;

    switch (selectedProgramme.name) {
      case "Public Speaking Workshops":
        return (
          <>
            <p>
              We identify with what makes a speaker influential and his presence
              compelling.
            </p>
            <p>
              Our tiered public speaking workshops are thoughtfully designed to
              transform your child into a seasoned stage storyteller through
              comprehensive training.
            </p>
            <p>
              From dynamic activities to ample stage time, your child will
              acquire the skills and confidence to shine under the spotlight.
            </p>
            <p>
              Watch them thrive as they learn the art and science of impactful
              speaking in a supportive and energetic environment.
            </p>
            <p>
              Gift your child a breakthrough in powerful communication today,
              reach out to us for the programme synopsis and workshop coverage!
            </p>
          </>
        );
      case "PSLE Power Up Camp":
        return (
          <>
            <p>
              Preparing your child for national examinations can be challenging,
              but the journey can become purposeful and balanced when we learn
              to dance in the rain.
            </p>
            <p>
              Our dynamic 2-day PSLE Power Camp imparts the Learning Sphere
              designed to boost competency in managing examinations and to help
              adopters learn efficiently and effectively!
            </p>
            <p>
              Crafted with learners' needs in mind, our lesson plans incorporate
              activities that leverage interactive learning while encouraging
              individual contribution.
            </p>
            <p>
              Throughout this transformative process, your child will discover
              that the skills needed for examination success are also highly
              sought after in the workforce.
            </p>
            <p>
              Empower your child with our exam staple and see how PSLE
              management can enhance learning and future success!
            </p>
          </>
        );
      case "Future Entrepreneurs Labs":
        return <p>Coming Soon.</p>;
      default:
        return <p>{selectedProgramme.description}</p>;
    }
  };

  return (
    <div className="workshop">
      <section className="signature-programmes" id="programmes">
        <h2>Our Signature Programmes</h2>
        <p>Select each programme to find out more</p>
        <div className="programme-cards">
          {programmes.map((programme) => (
            <div
              className="programme-card"
              key={programme.programID}
              onClick={() => handleProgrammeClick(programme)}
            >
              <img
                src={programme.imagePath || Mindsphere}
                alt={programme.name}
              />
              <p>{programme.name}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedProgramme && (
        <section className="selected-programme">
          <h2>{selectedProgramme.name}</h2>
          {renderProgramDescription()}

          <div className="workshop-details">
            {programmeCards.map((card) => (
              <div className="workshop-card" key={card.cardID}>
                <h3>
                  {card.programPrice ? `$${card.programPrice}` : "Coming Soon"}
                </h3>
                {card.originalPrice && (
                  <div>
                    <s>Was ${card.originalPrice}</s>
                  </div>
                )}
                <div>{card.cardName}</div>
                <div>Class size: {card.classSize}</div>
                <div>Duration: {card.duration}</div>
                <div>
                  {card.lunchProvided ? "Lunch provided" : "Lunch not provided"}
                </div>
                <div>{card.membershipBenefits}</div>
                {/* Only display the "Get Started" button if the programPrice is available */}
                {card.programPrice && (
                  <button onClick={() => handleGetStartedButton(card.cardID)}>
                    Get Started
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rest of the page */}
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
