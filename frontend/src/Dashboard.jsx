// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";


const Dashboard = () => {
  const { user } = useUser();
  const [children, setChildren] = useState([]); // Array to store child data
  const [childName, setChildName] = useState(""); // Input state for child name

  // Add child function
  const addChild = () => {
    if (childName.trim()) {
      setChildren([...children, childName]);
      setChildName(""); // Clear input after adding
    }
  };

  // Remove child function
  const removeChild = (index) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Welcome to the Dashboard, {user?.firstName}!</h1>

      {/* Add Child Section */}
      <div className="add-child-section">
        <h2>Add Child</h2>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Enter child's name"
        />
        <button onClick={addChild}>Add Child</button>
      </div>

      {/* Remove Child Section */}
      {children.length > 0 && (
        <div className="child-list-section">
          <h2>Your Children</h2>
          <ul>
            {children.map((child, index) => (
              <li key={index}>
                {child}{" "}
                <button onClick={() => removeChild(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
