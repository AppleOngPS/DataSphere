// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";

const ScenarioQuiz = ({ title, scenarios, onSubmit, onOptionSelect }) => {
  const [currentScenario, setCurrentScenario] = useState(0); // Current question index
  const [progress, setProgress] = useState(0); // Progress percentage
  const [tokens, setTokens] = useState(0); // Accumulated tokens

  const handleAnswer = (option) => {
    const earnedPoints = option.points;
    setTokens((prevTokens) => prevTokens + earnedPoints); // Add earned points to total tokens

    if (onOptionSelect) {
      onOptionSelect(option); // Pass selected option for tracking
    }

    // Move to the next scenario or end the quiz
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setProgress(((currentScenario + 1) / scenarios.length) * 100); // Update progress
    } else {
      onSubmit(tokens + earnedPoints); // Submit total tokens when the quiz ends
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{title}</h1>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            height: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4CAF50",
              borderRadius: "10px",
            }}
          />
        </div>
        <p>{Math.round(progress)}% Complete</p>
      </div>

      {/* Current Scenario */}
      <img
        src={scenarios[currentScenario].image}
        alt="Scenario"
        style={{
          width: "100%",
          height: "auto",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />
      <h2>{scenarios[currentScenario].question}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {scenarios[currentScenario].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <img
              src={option.image}
              alt={`Option: ${option.text}`}
              style={{ width: "75px", height: "75px", borderRadius: "5px" }}
            />
            <span style={{ fontSize: "18px" }}>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

ScenarioQuiz.propTypes = {
  title: PropTypes.string.isRequired,
  scenarios: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          points: PropTypes.number.isRequired,
          image: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func, // Optional: Track selected options
};

export default ScenarioQuiz;
