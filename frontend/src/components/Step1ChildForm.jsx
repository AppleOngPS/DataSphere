import React, { useState } from "react";
import "../styles/Step1ChildForm.css";

function Step1ChildForm({ children = [], setChildren, setStep }) {
  const [newChild, setNewChild] = useState({
    name: "",
    school: "",
    interest: "",
    learningStyle: "", // Added learningStyle field
    specialNeeds: "",
    preferredLunch: "Fish",
  });

  const handleConfirmChild = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    // Ensure required fields are filled
    if (!newChild.name || !newChild.school || !newChild.interest || !newChild.preferredLunch) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/children/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newChild,
          userID: userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Child created successfully!");

        const updatedChildren = [
          ...children,
          { ...newChild, childID: result.childID },
        ];
        setChildren(updatedChildren);

        setNewChild({
          name: "",
          school: "",
          interest: "",
          learningStyle: "",
          specialNeeds: "",
          preferredLunch: "Fish",
          userID: userId,
        });

        setStep(2); // Proceed to Step 2 after saving the child
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating child:", error);
      alert("Failed to create child.");
    }
  };

  return (
    <div className="child-form">
      <h3>Add Child</h3>
      <input
        type="text"
        placeholder="Child's Name *"
        value={newChild.name}
        onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Primary School *"
        value={newChild.school}
        onChange={(e) => setNewChild({ ...newChild, school: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Interest *"
        value={newChild.interest}
        onChange={(e) => setNewChild({ ...newChild, interest: e.target.value })}
        required
      />
      <select
        type="text"
        placeholder="Learning Style"
        value={newChild.learningStyle}
        onChange={(e) => setNewChild({ ...newChild, learningStyle: e.target.value })}
        >
        <option value="Visual">Visual</option>
        <option value="Auditory">Auditory</option>
        <option value="Kinesthetic">Kinesthetic</option>
        <option value="Collaborative">Collaborative</option>
        <option value="Independent">Independent</option>
      </select>
      <textarea
        placeholder="Special Needs or Considerations (Optional)"
        value={newChild.specialNeeds}
        onChange={(e) => setNewChild({ ...newChild, specialNeeds: e.target.value })}
      />
      <select
        value={newChild.preferredLunch}
        onChange={(e) => setNewChild({ ...newChild, preferredLunch: e.target.value })}
        required
      >
        <option value="Fish">Fish</option>
        <option value="Chicken">Chicken</option>
        <option value="Vegan">Vegan</option>
        <option value="Non-Vegan">Non-Vegan</option>
      </select>
      <button className="save-button" onClick={handleConfirmChild}>
        Create
      </button>
    </div>
  );
}

export default Step1ChildForm;
