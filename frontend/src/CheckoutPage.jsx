import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const workshopId = location.state?.workshopId;

  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-19"));
  const [children, setChildren] = useState([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const [existingChildren] = useState([
    {
      name: "Alice",
      school: "Greenwood Primary",
      learningInterests: "Math, Science",
      preferredLearningStyle: ["Visual"],
      goalsForCamp: "Improve math skills",
      specialNeeds: "None",
    },
    {
      name: "Bob",
      school: "Maple Elementary",
      learningInterests: "Art, Coding",
      preferredLearningStyle: ["Kinesthetic"],
      goalsForCamp: "Learn basic coding",
      specialNeeds: "Allergy to nuts",
    },
  ]);
  const [selectedExistingChild, setSelectedExistingChild] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddChild = () => {
    setChildren([
      ...children,
      {
        name: "",
        school: "",
        learningInterests: "",
        preferredLearningStyle: [],
        goalsForCamp: "",
        specialNeeds: "",
      },
    ]);
    setShowChildForm(true); // Show the form when "Add a Child" is clicked
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const handleCheckboxChange = (index, field, value) => {
    const updatedChildren = [...children];
    const currentStyles = updatedChildren[index][field];
    const newStyles = currentStyles.includes(value)
      ? currentStyles.filter((style) => style !== value)
      : [...currentStyles, value];
    updatedChildren[index][field] = newStyles;
    setChildren(updatedChildren);
  };

  const handleExistingChildSelect = (e) => {
    const childIndex = e.target.value;
    if (childIndex !== "") {
      const selectedChild = existingChildren[childIndex];
      setChildren([selectedChild]);
      setShowChildForm(true); // Show the form with the selected child's data
      setSelectedExistingChild(selectedChild);
    }
  };

  const handleCheckout = () => {
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: workshopId, quantity: 1 }],
        date: selectedDate,
        participants: children,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className="CheckoutPage">
      <div className="card">
        <h2>$788*</h2>
        <p>
          <s>Was $988</s>
        </p>
        <p>Beginner</p>
        <ul>
          <li>✓ Class size: 15 - 20</li>
          <li>✓ Duration: 3.5 days</li>
          <li>✓ Lunch provided</li>
          <li>✓ Lesson materials provided</li>
        </ul>
        <p>
          Complimentary 1-year membership with access to resources and member
          rates for all programs
        </p>
      </div>

      <div className="form-container">
        <img src="./src/assets/logo.png" alt="Brand Logo" className="logo" />

        <div className="add-child-container">
          <label>Add a Child</label>
          <button onClick={handleAddChild}>+ Add a Child</button>

          <label>Select Existing Child</label>
          <select onChange={handleExistingChildSelect}>
            <option value="">Choose a child</option>
            {existingChildren.map((child, index) => (
              <option key={index} value={index}>
                {child.name} - {child.school}
              </option>
            ))}
          </select>
        </div>

        {showChildForm &&
          children.map((child, index) => (
            <div key={index} className="child-inputs">
              <input
                type="text"
                placeholder="Child's Name"
                value={child.name}
                onChange={(e) =>
                  handleChildChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Primary School"
                value={child.school}
                onChange={(e) =>
                  handleChildChange(index, "school", e.target.value)
                }
              />
              <textarea
                placeholder="Learning Interests"
                value={child.learningInterests}
                onChange={(e) =>
                  handleChildChange(index, "learningInterests", e.target.value)
                }
              />
              <div>
                <label>Preferred Learning Style:</label>
                {[
                  "Visual",
                  "Auditory",
                  "Kinesthetic",
                  "Collaborative",
                  "Independent",
                ].map((style) => (
                  <label key={style}>
                    <input
                      type="checkbox"
                      checked={child.preferredLearningStyle.includes(style)}
                      onChange={() =>
                        handleCheckboxChange(
                          index,
                          "preferredLearningStyle",
                          style
                        )
                      }
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>
          ))}

        <div className="program-dates">
          <p>Program Date: 16 Dec 2024 to 20 Dec 2024</p>
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        </div>

        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
