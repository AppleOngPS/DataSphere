// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ScenarioQuiz from "./ScenarioQuiz";
import Confetti from "react-confetti";
import axios from "axios";
import PropTypes from "prop-types";


const AdultsQuiz = ({ userID }) => {
  const [tokens, setTokens] = useState(0); // Track tokens earned
  const [badge, setBadge] = useState(""); // Track earned badge
  const [showResults, setShowResults] = useState(false); // Show results after quiz
  const [showConfetti, setShowConfetti] = useState(false); // For confetti animation
  const [stickers, setStickers] = useState([]); // Track category badges
  const [stickerMessage, setStickerMessage] = useState(""); // Message when sticker is already collected

  // Define badge images for quiz results
  const badgeImages = {
    "Expert Strategist": "/src/assets/expert_strategist_badge.png",
    "Proactive Learner": "/src/assets/proactive_learner_badge.png",
    "Focused Beginner": "/src/assets/focused_beginner_badge.png",
  };

  // Define category badge images
  const categoryBadgeImages = {
    Leadership: "/src/assets/leadership_badge.png",
    Communication: "/src/assets/communication_badge.png",
    "Project Management": "/src/assets/project_management_badge.png",
    "Technical Skills": "/src/assets/technical_skills_badge.png",
    Mentoring: "/src/assets/mentoring_badge.png",
    "Business Planning": "/src/assets/business_planning_badge.png",
    Adaptability: "/src/assets/adaptability_badge.png", 
    Planning: "/src/assets/planning_badge.png", 
  };
  

  const scenarios = [
    {
      question: "What’s your primary focus at work?",
      image: "/src/assets/adult_placeholder.jpg",
      options: [
        { text: "Leadership", points: 10, category: "Leadership", image: "/src/assets/leader.jpg" },
        { text: "Communication", points: 15, category: "Communication", image: "/src/assets/comm.jpg" },
        { text: "Project Management", points: 20, category: "Project Management", image: "/src/assets/pm.jpg" },
        { text: "Technical Skills", points: 25, category: "Technical Skills", image: "/src/assets/techskills.jpg" },
      ],
    },
    {
      question: "Where do you see yourself in the next 5 years?",
      image: "/src/assets/adult_placeholder1.jpg",
      options: [
        { text: "Managing a team", points: 20, category: "Leadership", image: "/src/assets/teammanagement.jpg" },
        { text: "Starting a business", points: 25, category: "Business Planning", image: "/src/assets/bus.jpg" },
        { text: "Advancing technical skills", points: 15, category: "Technical Skills", image: "/src/assets/ts.jpg" },
        { text: "Mentoring others", points: 10, category: "Mentoring", image: "/src/assets/mentors.jpg" },
      ],
    },
    {
      question: "How do you manage unexpected challenges at work?",
      image: "/src/assets/adult_challenge_placeholder.jpg",
      options: [
        { text: "Reprioritize tasks", points: 15, category: "Adaptability", image: "/src/assets/reprioritize_tasks.jpg" },
        { text: "Seek assistance from colleagues", points: 10, category: "Communication", image: "/src/assets/seek_assistance.jpg" },
        { text: "Adjust timelines and expectations", points: 20, category: "Planning", image: "/src/assets/adjust_timelines.jpg" },
        { text: "Pause and reflect for better solutions", points: 15, category: "Mentoring", image: "/src/assets/pause_reflect.jpg" },
      ],
    },
  ];

  const handleQuizSubmit = (earnedTokens) => {
    setTokens(earnedTokens);

    let badgeResult = "";
    if (earnedTokens >= 50) badgeResult = "Expert Strategist";
    else if (earnedTokens >= 30) badgeResult = "Proactive Learner";
    else badgeResult = "Focused Beginner";

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
      <h1>Skill Upgrade Assessment</h1>

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
            title="Skill Assessment"
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
          <p>Your career goals showcase your strengths and aspirations. Keep pushing forward to achieve your dreams!</p>
        </div>
      )}
    </div>
  );
};

AdultsQuiz.propTypes = {
  userID: PropTypes.number.isRequired,
};

export default AdultsQuiz;
