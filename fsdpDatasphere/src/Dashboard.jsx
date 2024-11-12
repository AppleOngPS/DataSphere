import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();
  const [children, setChildren] = useState([]); // Array to store child data
  const [showChildForm, setShowChildForm] = useState(false); // State to toggle child form visibility
  const [childName, setChildName] = useState(""); // Input state for child's name

  // Add child function
  const addChild = () => {
    if (childName.trim()) {
      setChildren([
        ...children,
        { name: childName, school: "", learningInterests: "", preferredLearningStyle: [], goalsForCamp: "", specialNeeds: "" }
      ]);
      setChildName(""); // Clear input after adding
      setShowChildForm(true); // Show the form
    }
  };

  // Handle change in child inputs
  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  // Handle checkbox change for preferred learning styles
  const handleCheckboxChange = (index, field, value) => {
    const updatedChildren = [...children];
    const currentStyles = updatedChildren[index][field];
    const newStyles = currentStyles.includes(value)
      ? currentStyles.filter((style) => style !== value)
      : [...currentStyles, value];
    updatedChildren[index][field] = newStyles;
    setChildren(updatedChildren);
  };

  return (
    <div>
      <h1>Welcome to the Dashboard, {user?.firstName}!</h1>

      <div className="add-child-container">
        <label>Add a Child</label>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Enter child's name"
        />
        <button onClick={addChild}>+ Add a Child</button>
      </div>

      {showChildForm && children.map((child, index) => (
        <div key={index} className="child-inputs">
          <input
            type="text"
            placeholder="Child's Name"
            value={child.name}
            onChange={(e) => handleChildChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Primary School"
            value={child.school}
            onChange={(e) => handleChildChange(index, 'school', e.target.value)}
          />
          <textarea
            placeholder="Learning Interests"
            value={child.learningInterests}
            onChange={(e) => handleChildChange(index, 'learningInterests', e.target.value)}
          />
          <div>
            <label>Preferred Learning Style:</label>
            {['Visual', 'Auditory', 'Kinesthetic', 'Collaborative', 'Independent'].map((style) => (
              <label key={style}>
                <input
                  type="checkbox"
                  checked={child.preferredLearningStyle.includes(style)}
                  onChange={() => handleCheckboxChange(index, 'preferredLearningStyle', style)}
                />
                {style}
              </label>
            ))}
          </div>
          <textarea
            placeholder="Goals for the Camp"
            value={child.goalsForCamp}
            onChange={(e) => handleChildChange(index, 'goalsForCamp', e.target.value)}
          />
          <textarea
            placeholder="Special Needs or Considerations"
            value={child.specialNeeds}
            onChange={(e) => handleChildChange(index, 'specialNeeds', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

