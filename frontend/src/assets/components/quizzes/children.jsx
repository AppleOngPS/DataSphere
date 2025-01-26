// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ScenarioQuiz from "./ScenarioQuiz";
import Confetti from "react-confetti";
import axios from "axios";
import PropTypes from "prop-types";

const ChildrenQuiz = ({ userID }) => {
  const [tokens, setTokens] = useState(0); // Track earned tokens
  const [badge, setBadge] = useState(""); // Track earned badge
  const [showResults, setShowResults] = useState(false); // Show results after quiz
  const [showConfetti, setShowConfetti] = useState(false); // For confetti animation
  const [interests, setInterests] = useState({}); // Track interest categories dynamically
  const [stickers, setStickers] = useState([]); // Track badge stickers
  const [stickerMessage, setStickerMessage] = useState(""); // Message when sticker is already collected
  const [childrenData, setChildrenData] = useState([]); // Children data from the user
  const [selectedChildID, setSelectedChildID] = useState(""); // Currently selected child ID

  // Define badge images for quiz results
  const badgeImages = {
    "Creative Learner": "/src/assets/creative_learner.png",
    Explorer: "/src/assets/explorer.png",
    Thinker: "/src/assets/thinker.png",
  };

  // Define category badge images
  const categoryBadgeImages = {
    Creator: "/src/assets/creator_badge.png",
    Explorer: "/src/assets/explorer_badge.png",
    Thinker: "/src/assets/thinker_badge.png",
    Organizer: "/src/assets/organizer_badge.png",
    Builder: "/src/assets/builder_badge.png",
  };

  useEffect(() => {
    if (userID) {
      // Fetch children data for the user
      axios
        .get(`http://localhost:3000/children/user/${userID}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setChildrenData(response.data);
            setSelectedChildID(response.data[0]?.childID || ""); // Default to first child if available
          } else {
            console.error("No children data found.");
          }
        })
        .catch((error) => console.error("Error fetching children data:", error));
    }
  }, [userID]);

  const scenarios = [
    {
      image: "/src/assets/children1.jpg",
      question: "Do you learn better by seeing pictures or doing activities?",
      options: [
        { text: "Pictures", points: 10, category: "Creator", image: "/src/assets/pictures.jpg" },
        { text: "Hands-on activities", points: 20, category: "Builder", image: "/src/assets/handson.jpg" },
      ],
    },
    {
      image: "/src/assets/children2.jpg",
      question: "What do you enjoy most during your free time?",
      options: [
        { text: "Drawing", points: 15, category: "Creator", image: "/src/assets/drawing.jpg" },
        { text: "Playing outside", points: 20, category: "Explorer", image: "/src/assets/playing_outside.jpg" },
        { text: "Solving puzzles", points: 10, category: "Thinker", image: "/src/assets/puzzles.jpg" },
      ],
    },
    {
      image: "/src/assets/children3.jpg",
      question: "Which subject do you enjoy most?",
      options: [
        { text: "Math", points: 20, category: "Organizer", image: "/src/assets/math.jpg" },
        { text: "Science", points: 15, category: "Thinker", image: "/src/assets/science.jpg" },
        { text: "Art", points: 10, category: "Creator", image: "/src/assets/art.jpg" },
      ],
    },
  ];

  const handleQuizSubmit = (earnedTokens) => {
    setTokens(earnedTokens);

    let badgeResult = "";
    if (earnedTokens >= 50) badgeResult = "Creative Learner";
    else if (earnedTokens >= 30) badgeResult = "Explorer";
    else badgeResult = "Thinker";

    setBadge(badgeResult);
    setShowResults(true);
    setShowConfetti(true);

    // Stop confetti after a delay
    setTimeout(() => setShowConfetti(false), 5000);

    // Save results to backend
    if (selectedChildID) {
      axios
        .post(`http://localhost:3000/quiz-results`, {
          childID: selectedChildID,
          tokens: earnedTokens,
          badge: badgeResult,
        })
        .then(() => console.log("Quiz results saved!"))
        .catch((error) => console.error("Error saving quiz results:", error));
    }
  };

  const handleOptionSelect = (option) => {
    setTokens((prev) => prev + option.points);
    setInterests((prev) => ({
      ...prev,
      [option.category]: (prev[option.category] || 0) + option.points,
    }));

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
    setInterests({});
    setStickers([]);
    setStickerMessage("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>What Kind of Learner Are You?</h1>

      {!showResults ? (
        <div>
          {/* Child Selection Dropdown */}
          <div style={{ marginBottom: "20px" }}>
           <h3>Select a Child</h3>
           <select
             value={selectedChildID || ""}
             onChange={(e) => {
             setSelectedChildID(parseInt(e.target.value, 10));
             resetQuiz();
       }}
        style={{
             padding: "10px",
             fontSize: "16px",
             borderRadius: "5px",
             border: "1px solid #ccc",
       }}
  >
    <option value="" disabled>
      Select a child
    </option>
    {childrenData.length > 0 ? (
      childrenData.map((child) => (
        <option key={child.childID} value={child.childID}>
          {child.name}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No children available
      </option>
    )}
  </select>
</div>

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
            title="Children Quiz"
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
          <p>Your learning preferences highlight a unique way to explore and grow. Keep nurturing your talents!</p>
        </div>
      )}
    </div>
  );
};

ChildrenQuiz.propTypes = {
  userID: PropTypes.number.isRequired,
};

export default ChildrenQuiz;
