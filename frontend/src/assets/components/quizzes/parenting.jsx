// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ScenarioQuiz from "./ScenarioQuiz"; // Import reusable ScenarioQuiz component
import Confetti from "react-confetti";

const ParentingQuiz = () => {
  const [tokens, setTokens] = useState(0); // Track tokens earned
  const [badge, setBadge] = useState(""); // Track earned badge
  const [showResults, setShowResults] = useState(false); // Show results after quiz
  const [showConfetti, setShowConfetti] = useState(false); // Show confetti animation
  const [stickers, setStickers] = useState([]); // Track stickers collected
  const [stickerMessage, setStickerMessage] = useState(""); // Message for duplicate stickers

  // Define badge images for quiz results
  const badgeImages = {
    "Super Supportive Parent": "/src/assets/super_supportive_parent.png",
    "Empathetic Guide": "/src/assets/empathetic_guide.png",
    "Practical Parent": "/src/assets/practical_parent.png",
  };

  // Define category badge images
  const categoryBadgeImages = {
    Discipline: "/src/assets/discipline_badge.png",
    Guidance: "/src/assets/guidance_badge.png",
    Independence: "/src/assets/independence_badge.png",
    Confidence: "/src/assets/confidence_badge.png",
    Academics: "/src/assets/academics_badge.png",
    Skills: "/src/assets/skills_badge.png",
  };

  const scenarios = [
    {
      question: "How do you handle your child's mistakes?",
      image: "/src/assets/parenting1.jpg",
      options: [
        { text: "Discipline them", points: 10, category: "Discipline", image: "/src/assets/discipline.jpg" },
        { text: "Guide them gently", points: 20, category: "Guidance", image: "/src/assets/guide.jpg" },
        { text: "Let them learn on their own", points: 15, category: "Independence", image: "/src/assets/learn.jpg" },
      ],
    },
    {
      question: "What’s your primary goal for your child?",
      image: "/src/assets/parenting2.jpg",
      options: [
        { text: "Academic success", points: 20, category: "Academics", image: "/src/assets/academic.jpg" },
        { text: "Building confidence", points: 25, category: "Confidence", image: "/src/assets/confidence.jpg" },
        { text: "Learning life skills", points: 15, category: "Skills", image: "/src/assets/life_skills.jpg" },
      ],
    },
    {
      question: "What does your child enjoy most?",
      image: "/src/assets/parenting3.jpg",
      options: [
        { text: "Reading", points: 15, category: "Academics", image: "/src/assets/reading.jpg" },
        { text: "Hands-on activities", points: 25, category: "Skills", image: "/src/assets/hands_on.jpg" },
        { text: "Group discussions", points: 10, category: "Confidence", image: "/src/assets/group.jpg" },
      ],
    },
  ];

  const handleQuizSubmit = (earnedTokens) => {
    setTokens(earnedTokens);

    let badgeResult = "";
    if (earnedTokens >= 60) badgeResult = "Super Supportive Parent";
    else if (earnedTokens >= 40) badgeResult = "Empathetic Guide";
    else badgeResult = "Practical Parent";

    setBadge(badgeResult);
    setShowResults(true);
    setShowConfetti(true);

    // Stop confetti after a delay
    setTimeout(() => setShowConfetti(false), 5000);
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
      <h1>Parenting Style & Learning Goals</h1>

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
            title="Parenting Quiz"
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
          <p>Your parenting approach highlights strengths in guiding and supporting your child effectively. Keep nurturing their growth with your thoughtful methods!</p>
        </div>
      )}
    </div>
  );
};

export default ParentingQuiz;
