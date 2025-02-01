import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateBooking.css"; // ✅ Import CSS

const CreateBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("Processing your booking...");
  const [success, setSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // ✅ Prevent duplicate API calls

  const userID = searchParams.get("userID");
  const scheduleID = searchParams.get("scheduleID");
  const totalAmount = parseFloat(searchParams.get("totalAmount")); // ✅ Ensure it's a number
  const children = searchParams.get("children");

  useEffect(() => {
    if (!userID || !scheduleID || !totalAmount || !children) {
      setStatusMessage("❌ Missing booking information.");
      setSuccess(false);
      return;
    }

    if (isProcessing) return; // ✅ Prevent duplicate API calls

    setIsProcessing(true);

    try {
      const parsedChildren = JSON.parse(decodeURIComponent(children));

      if (parsedChildren.length === 0) {
        setStatusMessage("❌ No children selected for booking.");
        setSuccess(false);
        return;
      }

      // ✅ Step 1: Check or Create Booking
      axios
        .post("http://localhost:3000/bookings", {
          programQuantity: parsedChildren.length,
          userID,
          scheduleID,
          programPrice: totalAmount / parsedChildren.length, // ✅ Prevent division by 0
        })
        .then((response) => {
          if (!response.data.success) {
            console.warn("⚠️ Booking already exists:", response.data.message);
            setStatusMessage("⚠️ Booking already exists.");
            setSuccess(true);
            return; // ✅ Stop further execution
          }

          const bookingID = response.data.bookingID;
          console.log("✅ Booking Created: ID =", bookingID);

        })
        .then(() => {
          setStatusMessage("🎉 Booking successfully created!");
          setSuccess(true);

          // ✅ Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/userDashboard");
          }, 3000);
        })
        .catch((error) => {
          console.error("❌ Error creating booking:", error);
          setStatusMessage("❌ Error creating booking.");
          setSuccess(false);
        });
    } catch (error) {
      console.error("❌ Error processing booking:", error);
      setStatusMessage("❌ Error processing payment.");
      setSuccess(false);
    }
  }, [userID, scheduleID, totalAmount, children, navigate, isProcessing]); // ✅ Depend on isProcessing

  // ✅ Separate function for creating Booking Details
  const createBookingDetails = async (bookingID, parsedChildren) => {
    console.log("📌 Attempting to create BookingDetails for booking ID:", bookingID);
    
    if (!bookingID || !parsedChildren || parsedChildren.length === 0) {
      console.warn("⚠️ Skipping BookingDetails creation due to missing data.");
      return;
    }
  
    try {
      const responses = await Promise.all(
        parsedChildren.map((child) =>
          axios.post("http://localhost:3000/bookingDetails", {
            bookingID,
            childID: child.childID,
            pricePerChild: totalAmount / parsedChildren.length,
          })
        )
      );
  
      console.log("✅ BookingDetails successfully created:", responses);
    } catch (error) {
      console.error("❌ Error creating BookingDetails:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="create-booking-container">
      <div className="booking-status">
        <h2>{statusMessage}</h2>
        {success === null && <div className="loading-spinner"></div>}
        {success !== null && (
          <button className="dashboard-button" onClick={() => navigate("/userDashboard")}>
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBooking;
