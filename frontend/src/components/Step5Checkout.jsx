import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, addHours } from "date-fns";
import "../styles/Step5Checkout.css";

function Step5Checkout({ children, selectedSchedule, setStep }) {
  const [programmeCard, setProgrammeCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const { cardID } = useParams();

    useEffect(() => {
      document.body.classList.add("custom-body");
  
      return () => {
        document.body.classList.remove("custom-body"); // Cleanup when leaving page
      };
    }, []);
    
  useEffect(() => {
    const fetchProgrammeCard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cards/${cardID}`);
        const data = await response.json();
        setProgrammeCard(data);
      } catch (error) {
        console.error("Error fetching programme card:", error);
      }
    };

    const fetchSchedules = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/${cardID}`);
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

  // ✅ Update total price whenever children or programmeCard changes
  useEffect(() => {
    if (programmeCard) {
      const pricePerChild = programmeCard.programPrice || 0;
      setTotalPrice(pricePerChild * (children.length || 1));
    }
  }, [children, programmeCard]); // ✅ Recalculate when children/program price changes

  const handleCheckout = async () => {
    const userID = localStorage.getItem("userId"); // ✅ Retrieve userID from localStorage
  
    if (!userID || !selectedSchedule || children.length === 0) {
      alert("Missing booking details");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          scheduleID: selectedSchedule.scheduleID, // ✅ Ensure scheduleID is provided
          totalAmount: totalPrice * 100, // ✅ Ensure correct amount (cents)
          children, // ✅ Ensure children data is included
        }),
      });
  
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
  

  // ✅ Format date/time correctly in Singapore Time (SGT)
  const formatDate = (dateString) => format(addHours(new Date(dateString), 8), "dd MMM yyyy");
  const formatTime = (timeString) => format(addHours(new Date(timeString), 8), "HH:mm");

  return (
    <div className="checkout-summary-container">
      <h3>Checkout Summary</h3>

      {programmeCard && (
        <div className="card">
          <h2>Total Price: ${totalPrice}*</h2>
          {programmeCard.originalPrice && <p><s>Was ${programmeCard.originalPrice}</s></p>}
          <p>{programmeCard.cardName}</p>
          <ul className="program-details">
            <li>✓ Class size: {programmeCard.classSize || "N/A"}</li>
            <li>✓ Duration: {programmeCard.duration}</li>
            <li>✓ {programmeCard.lunchProvided ? "Lunch provided" : "Lunch not provided"}</li>
            <li>{programmeCard.membershipBenefits || "Standard membership benefits apply"}</li>
          </ul>
        </div>
      )}

      {selectedSchedule && (
        <div className="schedule-summary">
          <h4>Selected Schedule</h4>
          <p>{`${formatDate(selectedSchedule.startDate)} - ${formatDate(selectedSchedule.endDate)}`}</p>
          <p>{`${formatTime(selectedSchedule.startTime)} - ${formatTime(selectedSchedule.endTime)}`}</p>
        </div>
      )}

      <div className="review-section">
        <h4>Children</h4>
        {children.length > 0 ? (
          children.map((child, index) => (
            <div className="child-summary" key={index}>
              <p><strong>Name:</strong> {child.name}</p>
              <p><strong>School:</strong> {child.school}</p>
              <p><strong>Interest:</strong> {child.interest}</p>
              <p><strong>Learning Style:</strong> {child.learningStyle || "Not provided"}</p>
              <p><strong>Special Needs:</strong> {child.specialNeeds || "None"}</p>
              <p><strong>Lunch:</strong> {child.preferredLunch}</p>
            </div>
          ))
        ) : (
          <p>No children added.</p>
        )}
      </div>

      <div className="button-container">
        <button className="back-button" onClick={() => setStep(4)}>Back</button>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default Step5Checkout;
