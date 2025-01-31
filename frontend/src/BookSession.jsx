import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const BookSession = () => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason, slot }),
      });

      const text = await response.text();
      if (!response.ok) throw new Error(text);

      const data = JSON.parse(text);
      console.log("Booking successful:", data);
      alert("Booking confirmed! Check your email.");
    } catch (err) {
      console.error("Error:", err);
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
};

// Ensure this is the default export
export default BookSession;
