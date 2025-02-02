import { useState, useEffect } from "react";
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

const BookSession = ({ onViewChange, onBook }) => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [email, setEmail] = useState("");

  const sendEmail = async (email, link) => {
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, link }),
      });
      if (!response.ok) {
        throw new Error("Failed to send confirmation email.");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Failed to send confirmation email. Please check your connection.");
    }
  };

  const handleConfirm = async () => {
    if (!selectedProgram || !selectedDate || !selectedSlot) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      id: Date.now(),
      program: selectedProgram,
      date: selectedDate,
      time: selectedSlot,
    };

    try {
      const link = `https://mindsphere.daily.co/${newBooking.id}`;
      await sendEmail(email, link);
      onBook(newBooking); // Update parent state
      onViewChange("timeSlots"); // Switch view
      alert("Booking confirmed! Check your email for the session link.");
    } catch (error) {
      onBook(newBooking); // Still save the booking even if email fails
      onViewChange("timeSlots");
      alert("Booking saved, but failed to send confirmation email.");
    }
  };

  return (
    <div className="book-session-section content-top-aligned">
      <h1 className="section-title">Book Session</h1>
      <div className="form-container large-box">
        <select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="dropdown-input"
        >
          <option value="">Select Program</option>
          <option value="Beginner Program">
            Skill-Based Coaching Programs - Beginner Program
          </option>
          <option value="Intermediate Program">
            Skill-Based Coaching Programs - Intermediate Program
          </option>
          <option value="Intermediate Program">
            Skill-Based Coaching Programs - Advance Program
          </option>
          <option value="Intermediate Program">
            Goal-Oriented Coaching Programs - Beginner Program
          </option>
          <option value="Intermediate Program">
            Goal-Oriented Coaching Programs - Intermediate Program
          </option>
          <option value="Intermediate Program">
            Goal-Oriented Coaching Programs - Advance Program
          </option>
          <option value="Intermediate Program">
            Personal Development Coaching - Beginner Program
          </option>
          <option value="Intermediate Program">
            Personal Development Coaching - Intermediate Program
          </option>
          <option value="Intermediate Program">
            Personal Development Coaching - Advance Program
          </option>
        </select>

        <div className="date-input-container">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

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

        <button className="confirm-booking" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

const TimeSlots = ({ bookings }) => {
  // Changed to receive bookings prop
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
  const [bookings, setBookings] = useState(() => {
    // Load bookings from localStorage on initial render
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleBook = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

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
            <BookSession onViewChange={setView} onBook={handleBook} />
          ) : (
            <TimeSlots bookings={bookings} onViewChange={setView} /> // Pass bookings prop
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SessionDashboard;
