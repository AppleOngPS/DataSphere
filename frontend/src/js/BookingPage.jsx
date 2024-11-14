import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomSelect from "./CustomSelect"; // Import CustomSelect if using custom dropdown
import "./BookingPage.css";
import logo from "./assets/logo.png";

function BookingPage() {
  const { cardID } = useParams();
  const [programmeCard, setProgrammeCard] = useState(null);
  const [children, setChildren] = useState([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newChild, setNewChild] = useState({
    name: "",
    school: "",
    interest: "",
    preferredLearningStyle: "",
    specialNeeds: "",
    lunchChoice: "Fish",
  });

  useEffect(() => {
    const fetchProgrammeCard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cards/${cardID}`);
        const data = await response.json();
        setProgrammeCard(data);
        setTotalPrice(data.programPrice || 0);
      } catch (error) {
        console.error("Error fetching programme card:", error);
      }
    };

    if (cardID) {
      fetchProgrammeCard();
    }
  }, [cardID]);

  useEffect(() => {
    const savedChildren = JSON.parse(localStorage.getItem("children")) || [];
    setChildren(savedChildren);
    updateTotalPrice(savedChildren);
  }, []);

  useEffect(() => {
    localStorage.setItem("children", JSON.stringify(children));
    updateTotalPrice(children);
  }, [children]);

  const handleAddChild = () => {
    setShowChildForm(true);
  };

  const handleConfirmChild = () => {
    setChildren([...children, newChild]);
    setNewChild({
      name: "",
      school: "",
      interest: "",
      preferredLearningStyle: "",
      specialNeeds: "",
      lunchChoice: "Fish",
    });
    setShowChildForm(false);
  };

  const handleChildChange = (field, value) => {
    setNewChild((prevChild) => ({
      ...prevChild,
      [field]: value,
    }));
  };

  const updateTotalPrice = (childrenList) => {
    const price = programmeCard ? programmeCard.programPrice : 0;
    setTotalPrice(price * (childrenList.length || 1));
  };

  return (
    <div className="CheckoutPage">
      {programmeCard && (
        <div className="card">
          <h2>Total Price: ${totalPrice}*</h2>
          {programmeCard.originalPrice && (
            <p>
              <s>Was ${programmeCard.originalPrice}</s>
            </p>
          )}
          <p>{programmeCard.cardName}</p>
          <ul>
            <li>✓ Class size: {programmeCard.classSize || "N/A"}</li>
            <li>✓ Duration: {programmeCard.duration}</li>
            <li>
              ✓{" "}
              {programmeCard.lunchProvided
                ? "Lunch provided"
                : "Lunch not provided"}
            </li>
            <li>
              {programmeCard.membershipBenefits ||
                "Standard membership benefits apply"}
            </li>
          </ul>
        </div>
      )}

      <div className="form-container">
        <img src={logo} alt="Brand Logo" className="logo" />

        <div className="add-child-container">
          <button onClick={handleAddChild}>+ Add a Child</button>
        </div>

        {showChildForm && (
          <div className="child-inputs">
            <input
              type="text"
              placeholder="Child's Name"
              value={newChild.name}
              onChange={(e) => handleChildChange("name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Primary School"
              value={newChild.school}
              onChange={(e) => handleChildChange("school", e.target.value)}
            />
            <input
              type="text"
              placeholder="Interest"
              value={newChild.interest}
              onChange={(e) => handleChildChange("interest", e.target.value)}
            />

            <div className="dropdown-container">
              <label>Preferred Learning Style:</label>
              <CustomSelect
                options={[
                  "Visual",
                  "Auditory",
                  "Kinesthetic",
                  "Collaborative",
                  "Independent",
                ]}
                placeholder="Select Learning Style"
                value={newChild.preferredLearningStyle}
                onChange={(value) =>
                  handleChildChange("preferredLearningStyle", value)
                }
              />
            </div>

            <textarea
              placeholder="Special Needs or Considerations"
              value={newChild.specialNeeds}
              onChange={(e) =>
                handleChildChange("specialNeeds", e.target.value)
              }
            />

            <div className="dropdown-container">
              <label>Preferred Lunch:</label>
              <CustomSelect
                options={["Fish", "Chicken", "Vegan", "Non-Vegan"]}
                placeholder="Select Lunch"
                value={newChild.lunchChoice}
                onChange={(value) => handleChildChange("lunchChoice", value)}
              />
            </div>

            <button
              onClick={handleConfirmChild}
              className="confirm-child-button"
            >
              OK
            </button>
          </div>
        )}

        {children.map((child, index) => (
          <div key={index} className="child-info">
            <p>
              Child {index + 1}: {child.name}
            </p>
            <p>School: {child.school}</p>
            <p>Interest: {child.interest}</p>
            <p>Preferred Lunch: {child.lunchChoice}</p>
          </div>
        ))}

        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default BookingPage;
