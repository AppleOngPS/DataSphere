// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import EntrepreneurQuiz from "./entrepreneur";
import ParentingQuiz from "./parenting";
import ChildrenQuiz from "./children";
import AdultsQuiz from "./adult";
import useGoogleAnalytics from "../../../js/useGoogleAnalytics";

import "./quizselector.css";

const QuizSelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [isLocked, setIsLocked] = useState(false); // Lock the dropdown after selection
  // const { logCustomEvent } = useGoogleAnalytics(); // Use Google Analytics hook

  const handleSelection = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setIsLocked(true); // Lock the dropdown
    logCustomEvent("quiz_category_selected", {
      category,
    }); // Log the quiz selection
  };

  const resetSelection = () => {
    logCustomEvent("quiz_reset", { previousCategory: selectedCategory }); // Log the reset action
    setSelectedCategory("");
    setIsLocked(false);
  };

  const renderQuiz = () => {
    switch (selectedCategory) {
      case "entrepreneur":
        return <EntrepreneurQuiz />;
      case "parenting":
        return <ParentingQuiz />;
      case "children":
        return <ChildrenQuiz />;
      case "adult":
        return <AdultsQuiz />;
      default:
        return <p>Please select a category to start the quiz.</p>;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Select a Quiz Category</h1>
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedCategory}
          onChange={handleSelection}
          disabled={isLocked}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: isLocked ? "not-allowed" : "pointer",
          }}
        >
          <option value="">-- Select Category --</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="parenting">Parenting</option>
          <option value="children">Children</option>
          <option value="adult">Adult</option>
        </select>
        <button
          onClick={resetSelection}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#FF0000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Selection
        </button>
      </div>
      <CSSTransition
        in={!!selectedCategory}
        timeout={300}
        classNames="quiz-transition"
        unmountOnExit
      >
        <div className="quiz-content">{renderQuiz()}</div>
      </CSSTransition>
    </div>
  );
};

export default QuizSelector;
