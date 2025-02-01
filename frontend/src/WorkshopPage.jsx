import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addHours } from "date-fns"; // ✅ Import date formatting
import "./WorkshopPage.css";
import Mindsphere from "./assets/logo.png";
import Footer from "./Footer";

const WorkshopPage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [programmeCards, setProgrammeCards] = useState([]);
  const [membership, setMembership] = useState(null); // ✅ Stores membership details
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // ✅ Get userID from localStorage

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
        console.log("📌 Membership Data:", membershipData); // ✅ Log fetched membership data
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
      const response = await fetch(
        `http://localhost:3000/programs/${programme.programID}/cards`
      );
      const cardsData = await response.json();
      setProgrammeCards(cardsData);
    } catch (error) {
      console.error("Error fetching programme cards:", error);
    }
  };

  // ✅ Apply Membership Discount
  const getDiscountedPrice = (programPrice) => {
    if (membership?.isActive) {
      const discount = membership.DiscountRate || 0; // Default to 0 if no discountRate
      return (programPrice * (1 - discount)).toFixed(2); // Calculate new price
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
          <p>{selectedProgramme.description}</p>
          {renderProgramDescription()}

          <div className="workshop-details">
            {programmeCards.map((card) => (
              <div className="workshop-card" key={card.cardID}>
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
                <div>
                  {card.lunchProvided ? "Lunch provided" : "Lunch not provided"}
                </div>
                <div>{card.membershipBenefits}</div>

                {/* ✅ Display "Get Started" only if programPrice exists */}
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

      <Footer />
    </div>
  );
};

export default WorkshopPage;
