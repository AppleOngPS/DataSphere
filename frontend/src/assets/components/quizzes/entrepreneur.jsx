// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ScenarioQuiz from "./ScenarioQuiz";
import Confetti from "react-confetti";
import axios from "axios";
import PropTypes from "prop-types";

const Entrepreneur = ({ userID }) => {
  const [tokens, setTokens] = useState(0); // Track tokens earned
  const [badge, setBadge] = useState(""); // Track earned badge
  const [showResults, setShowResults] = useState(false); // Show results after quiz
  const [showConfetti, setShowConfetti] = useState(false); // For confetti animation
  const [stickers, setStickers] = useState([]); // Track category badges
  const [stickerMessage, setStickerMessage] = useState(""); // Message when sticker is already collected

  // Define badge images for quiz results
  const badgeImages = {
    "Risk Taker": "/src/assets/risk_taker_badge.png",
    Strategist: "/src/assets/strategist_badge.png",
    "Careful Planner": "/src/assets/careful_planner_badge.png",
  };

  // Define category badge images
  const categoryBadgeImages = {
    Planning: "/src/assets/planning_badge.png",
    Investment: "/src/assets/investment_badge.png",
    Testing: "/src/assets/testing_badge.png",
    Negotiation: "/src/assets/negotiation_badge.png",
    Adaptability: "/src/assets/adaptability_badge.png",
  };

  const scenarios = [
    {
      image: "/src/assets/scenario1.jpg", // Main scenario image
      question: "You have an innovative product idea. How do you take it to market?",
      options: [
        { text: "Plan thoroughly", points: 10, category: "Planning", image: "/src/assets/scenario1a.jpg" },
        { text: "Seek investors", points: 20, category: "Investment", image: "/src/assets/scenario1b.jpg" },
        { text: "Test with small groups", points: 15, category: "Testing", image: "/src/assets/scenario1c.jpg" },
      ],
    },
    {
      image: "/src/assets/scenario2.jpg", // Main scenario image
      question: "Your main supplier backs out at the last minute. What do you do?",
      options: [
        { text: "Find alternatives quickly", points: 20, category: "Adaptability", image: "/src/assets/scenario2a.jpg" },
        { text: "Renegotiate", points: 15, category: "Negotiation", image: "/src/assets/scenario2b.jpg" },
        { text: "Pause operations", points: 5, category: "Planning", image: "/src/assets/scenario2c.jpg" },
      ],
    },
    {
      image: "/src/assets/scenario3.jpg", // Main scenario image for new scenario
      question: "How do you decide on pricing for your product or service?",
      options: [
        { text: "Research competitors", points: 15, category: "Planning", image: "/src/assets/scenario3a.jpg" },
        { text: "Focus on value offered", points: 20, category: "Adaptability", image: "/src/assets/scenario3b.jpg" },
        { text: "Experiment with discounts", points: 10, category: "Testing", image: "/src/assets/scenario3c.jpg" },
      ],
    },
  ];

  const handleQuizSubmit = (earnedTokens) => {
    setTokens(earnedTokens);

    let badgeResult = "";
    if (earnedTokens >= 50) badgeResult = "Risk Taker";
    else if (earnedTokens >= 30) badgeResult = "Strategist";
    else badgeResult = "Careful Planner";

    setBadge(badgeResult);
    setShowResults(true);
    setShowConfetti(true);

    // Stop confetti after a delay
    setTimeout(() => setShowConfetti(false), 5000);

    // Save results to backend
    if (userID) {
      axios
        .post(`http://localhost:3000/quiz-results`, {
          userID,
          tokens: earnedTokens,
          badge: badgeResult,
        })
        .then(() => console.log("Quiz results saved!"))
        .catch((error) => console.error("Error saving quiz results:", error));
    }
  };

  const handleOptionSelect = (option) => {
    setTokens((prev) => prev + option.points);

    // Add sticker for category if it's not already added
    if (!stickers.includes(option.category)) {
      setStickers((prev) => [...prev, option.category]);
      setStickerMessage(""); // Clear message
    } else {
      setStickerMessage("You've already collected this category's badge!");
    }
  };

  const resetQuiz = () => {
    setTokens(0);
    setBadge("");
    setShowResults(false);
    setShowConfetti(false);
    setStickers([]);
    setStickerMessage("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Startup Genius Assessment</h1>

      {!showResults ? (
        <div>
          {/* Show Collected Stickers While Doing Quiz */}
          <div style={{ marginBottom: "20px" }}>
            <h3>Stickers Collected:</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              {stickers.map((sticker, index) => (
                <img
                  key={index}
                  src={categoryBadgeImages[sticker]} // Use the categoryBadgeImages mapping
                  alt={`${sticker} Badge`}
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                />
              ))}
            </div>
            {stickerMessage && <p style={{ color: "red" }}>{stickerMessage}</p>}
          </div>

          <ScenarioQuiz
            title="Entrepreneur Quiz"
            scenarios={scenarios}
            onSubmit={handleQuizSubmit}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      ) : (
        <div>
          {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
          <h2>Quiz Complete!</h2>
          <p>Tokens Earned: {tokens}</p>
          <p>Your Badge:</p>
          <img
            src={badgeImages[badge]}
            alt={`${badge} Badge`}
            style={{ width: "80px", height: "80px", marginBottom: "20px" }}
          />
          <h3>Stickers Collected:</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {stickers.map((sticker, index) => (
              <img
                key={index}
                src={categoryBadgeImages[sticker]} // Use the categoryBadgeImages mapping
                alt={`${sticker} Badge`}
                style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              />
            ))}
          </div>
          <h3>Summary</h3>
          <p>
            Your entrepreneurial approach showcases your unique strengths in tackling challenges
            and seizing opportunities. Keep honing your skills for success!
          </p>
        </div>
      )}
    </div>
  );
};

Entrepreneur.propTypes = {
  userID: PropTypes.number.isRequired,
};

export default Entrepreneur;
