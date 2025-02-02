import React from "react";
import "../styles/Step2ChildList.css";
import { useEffect } from "react";

function Step2ChildList({ children, setChildren, setStep, setEditingChildIndex }) {
    useEffect(() => {
      document.body.classList.add("custom-body");
  
      return () => {
        document.body.classList.remove("custom-body"); // Cleanup when leaving page
      };
    }, []);
  
  const handleDeleteChild = async (childID) => {
    try {
      const response = await fetch(`http://localhost:3000/children/${childID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Child deleted successfully!");

        // Remove child from local state
        const updatedChildren = children.filter((child) => child.childID !== childID);
        setChildren(updatedChildren);
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting child:", error);
      alert("Failed to delete child.");
    }
  };

  const handleEditChild = (index) => {
    setEditingChildIndex(index); // Store the index of the child being edited
    setStep(3); // Move to the edit step
  };

  return (
    <div className="child-list">
      <h3>Added Children</h3>
      
      {children.length === 0 ? (
        <p className="no-children">No children added yet.</p>
      ) : (
        children.map((child, index) => (
          <div className="child-entry" key={index}>
            <p className="child-name">{child.name}</p>
            <div className="child-buttons">
              <button className="edit-button" onClick={() => handleEditChild(index)}>✎</button>
              <button className="delete-button" onClick={() => handleDeleteChild(child.childID)}>X</button>
            </div>
          </div>
        ))
      )}

      <button className="add-child-button" onClick={() => setStep(1)}>Add a Child</button>
      
      {/* Disable Next button if no children exist */}
      <button 
        className="next-button" 
        onClick={() => setStep(4)} 
        disabled={children.length === 0}
      >
        Next
      </button>
    </div>
  );
}

export default Step2ChildList;
