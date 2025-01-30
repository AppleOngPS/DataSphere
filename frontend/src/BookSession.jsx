// src/pages/BookSession.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function BookSession() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason, slot }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      console.log("Booking created!", data);

      // Redirect to video call page
      navigate(`/video/${data.bookingId}`);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Book 1:1 Coaching</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for session"
          required
        />
        <input
          type="datetime-local"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
        />
        <button type="submit">Book Now</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Footer />
    </div>
  );
}
