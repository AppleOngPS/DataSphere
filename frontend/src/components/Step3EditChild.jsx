import React, { useState } from "react";
import "../styles/Step3EditChild.css";

function Step3EditChild({ children, setChildren, setStep, editingChildIndex }) {
  const childToEdit = children[editingChildIndex];

  const [updatedChild, setUpdatedChild] = useState({
    name: childToEdit?.name || "",
    school: childToEdit?.school || "",
    interest: childToEdit?.interest || "",
    learningStyle: childToEdit?.learningStyle || "",
    specialNeeds: childToEdit?.specialNeeds || "",
    preferredLunch: childToEdit?.preferredLunch || "Fish",
  });

  const handleSaveChanges = async () => {
    if (!childToEdit || !childToEdit.childID) {
      alert("Error: Invalid child selection.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/children/${childToEdit.childID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedChild),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Child updated successfully!");

        // Update the child in local state
        const updatedChildren = children.map((child, index) =>
          index === editingChildIndex ? { ...child, ...updatedChild } : child
        );
        setChildren(updatedChildren);

        setStep(2); // Return to child list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating child:", error);
      alert("Failed to update child.");
    }
  };

  return (
    <div className="edit-child-form">
      <h3>Edit Child</h3>
      <input
        type="text"
        placeholder="Child's Name"
        value={updatedChild.name}
        disabled // Name is not editable
      />
      <input
        type="text"
        placeholder="Primary School"
        value={updatedChild.school}
        onChange={(e) =>
          setUpdatedChild({ ...updatedChild, school: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Interest"
        value={updatedChild.interest}
        onChange={(e) =>
          setUpdatedChild({ ...updatedChild, interest: e.target.value })
        }
      />
      <select
        value={updatedChild.learningStyle}
        onChange={(e) =>
          setUpdatedChild({ ...updatedChild, learningStyle: e.target.value })
        }
      >
        <option value="Visual">Visual</option>
        <option value="Auditory">Auditory</option>
        <option value="Kinesthetic">Kinesthetic</option>
        <option value="Collaborative">Collaborative</option>
        <option value="Independent">Independent</option>
      </select>

      <textarea
        placeholder="Special Needs or Considerations (Optional)"
        value={updatedChild.specialNeeds}
        onChange={(e) =>
          setUpdatedChild({ ...updatedChild, specialNeeds: e.target.value })
        }
      />
      <select
        value={updatedChild.preferredLunch}
        onChange={(e) =>
          setUpdatedChild({ ...updatedChild, preferredLunch: e.target.value })
        }
      >
        <option value="Fish">Fish</option>
        <option value="Chicken">Chicken</option>
        <option value="Vegan">Vegan</option>
        <option value="Non-Vegan">Non-Vegan</option>
      </select>
      <div className="button-container">
        <button className="back-button" onClick={() => setStep(2)}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSaveChanges}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Step3EditChild;
