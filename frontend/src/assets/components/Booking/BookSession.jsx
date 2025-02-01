import { useState } from "react";
import { Link } from "react-router-dom";
import "./booking.css";
import Footer from "../../../Footer";

const BookingCard = ({ booking }) => {
  return (
    <div className="session-card">
      <h3>{booking.program}</h3>
      <p>Time Slot: {booking.time}</p>
      <p>Date: {booking.date}</p>
      <Link to={`/call/${booking.id}`}>
        <button className="join-button">Join Session</button>
      </Link>
    </div>
  );
};

const BookSession = ({ onViewChange }) => {
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleBooking = () => {
    onViewChange("timeSlots");
  };

  return (
    <div className="book-session-section content-top-aligned">
      <h1 className="section-title">Book Session</h1>
      <div className="form-container large-box">
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="dropdown-input"
        >
          <option value="">Select Time Slot</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
        </select>
        <button className="confirm-booking">Confirm</button>
      </div>
    </div>
  );
};

const TimeSlots = ({ onViewChange }) => {
  const bookings = [
    { id: 1, program: "Beginner Program", time: "9:00 AM", date: "2023-08-20" },
    {
      id: 2,
      program: "Intermediate Program",
      time: "2:00 PM",
      date: "2023-08-21",
    },
  ];

  return (
    <div className="time-slots-section content-top-aligned">
      <h1 className="section-title">Time Slots Booked</h1>
      <div className="session-list large-box">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const SessionDashboard = () => {
  const [view, setView] = useState("bookSession");

  return (
    <div className="session-dashboard-container">
      <div className="sidebar-wrapper">
        <div className="session-sidebar">
          <ul>
            <button
              className="sidebar-option"
              onClick={() => setView("bookSession")}
            >
              Book Session
            </button>

            <button
              className="sidebar-option"
              onClick={() => setView("timeSlots")}
            >
              Time Slots
            </button>
          </ul>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="main-session-content large-box">
          {view === "bookSession" ? (
            <BookSession onViewChange={setView} />
          ) : (
            <TimeSlots onViewChange={setView} />
          )}
        </div>
      </div>
      {/* Import and use Footer component */}
      <Footer />
    </div>
  );
};

export default SessionDashboard;
