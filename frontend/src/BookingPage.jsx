import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import "./BookingPage.css";
import logo from "./assets/logo.png";
import { format } from "date-fns";
import { addHours } from "date-fns"; // to convert time to Singapore timezone

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
    learningStyle: "",
    specialNeeds: "",
    preferredLunch: "Fish",
  });
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);

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

    const fetchSchedules = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/schedule/${cardID}`
        );
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    if (cardID) {
      fetchProgrammeCard();
      fetchSchedules();
    }
  }, [cardID]);

  const handleScheduleChange = (event) => {
    const scheduleIndex = event.target.value;
    const selected = schedules[scheduleIndex];
    setSelectedSchedule(selected);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(addHours(date, 8), "dd MMM yyyy");
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return format(addHours(time, 8), "HH:mm");
  };

  const handleAddChild = () => {
    setShowChildForm(true);
  };

  const handleConfirmChild = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in first.");
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
        updateTotalPrice(updatedChildren);
        setNewChild({
          name: "",
          school: "",
          interest: "",
          learningStyle: "",
          specialNeeds: "",
          preferredLunch: "Fish",
          userID: userId,
        });
        setShowChildForm(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating child:", error);
      alert("Failed to create child.");
    }
  };

  const handleDeleteChild = async (childID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/children/${childID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Child deleted successfully!");
        const updatedChildren = children.filter(
          (child) => child.childID !== childID
        );
        setChildren(updatedChildren);
        updateTotalPrice(updatedChildren);
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting child:", error);
      alert("Failed to delete child.");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalAmount: totalPrice * 100 }), // Send amount in cents to Stripe
        }
      );
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to create checkout session:", data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
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
              onChange={(e) =>
                setNewChild({ ...newChild, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Primary School"
              value={newChild.school}
              onChange={(e) =>
                setNewChild({ ...newChild, school: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Interest"
              value={newChild.interest}
              onChange={(e) =>
                setNewChild({ ...newChild, interest: e.target.value })
              }
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
                value={newChild.learningStyle}
                onChange={(value) =>
                  setNewChild({ ...newChild, learningStyle: value })
                }
              />
            </div>

            <textarea
              placeholder="Special Needs or Considerations"
              value={newChild.specialNeeds}
              onChange={(e) =>
                setNewChild({ ...newChild, specialNeeds: e.target.value })
              }
            />

            <div className="dropdown-container">
              <label>Preferred Lunch:</label>
              <CustomSelect
                options={["Fish", "Chicken", "Vegan", "Non-Vegan"]}
                placeholder="Select Lunch"
                value={newChild.preferredLunch}
                onChange={(value) =>
                  setNewChild({ ...newChild, preferredLunch: value })
                }
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

        <div className="schedule-selection">
          <label>Schedule:</label>
          <select
            onChange={handleScheduleChange}
            value={selectedSchedule ? schedules.indexOf(selectedSchedule) : ""}
          >
            <option value="">Select Schedule</option>
            {schedules.map((schedule, index) => (
              <option key={schedule.scheduleID} value={index}>
                {`${formatDate(schedule.startDate)} - ${formatDate(
                  schedule.endDate
                )}, ${formatTime(schedule.startTime)} - ${formatTime(
                  schedule.endTime
                )}`}
              </option>
            ))}
          </select>
        </div>

        {children.map((child, index) => (
          <div key={child.childID} className="child-info">
            <p>Name: {child.name}</p>
            <p>School: {child.school}</p>
            <p>Interest: {child.interest}</p>
            <p>Learning Style: {child.learningStyle}</p>
            <p>Preferred Lunch: {child.preferredLunch}</p>
            <button onClick={() => handleDeleteChild(child.childID)}>
              Delete
            </button>
          </div>
        ))}

        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
