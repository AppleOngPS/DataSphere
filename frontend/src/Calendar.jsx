// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css"; // Custom CSS for updated styling
import Mindsphere from "./assets/logo.png"; // Update this path to the actual path of your logo image file

// Sample events data to simulate events per date
const eventsData = {
  "2024-11-12": [
    { name: "Team Meeting", time: "8:30 AM", venue: "Room A" },
    { name: "Lunch with Sasha", time: "10:00 AM", venue: "Cafeteria" },
    { name: "Design Review", time: "2:30 PM", venue: "Conference Room" },
    { name: "Get Groceries", time: "4:00 PM", venue: "Local Store" },
  ],
};

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const selectedDate = value.toISOString().split("T")[0];
  const events = eventsData[selectedDate] || [];

  return (
    <div className="calendar-page">
      <div className="centered-content">
        {/* Sidebar for selected date and event details */}
        <div className="sidebar">
          <h2>{value.toDateString()}</h2>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="event-item">
                <h4 className="event-name">{event.name}</h4>
                <p className="event-time">{event.time}</p>
                <p className="event-venue">{event.venue}</p>
              </div>
            ))
          ) : (
            <p className="no-events">No events for this date.</p>
          )}
        </div>

        {/* Calendar */}
        <div className="calendar-container">
          <h1 className="calendar-title">Calendar</h1>
          <Calendar
            onChange={setValue}
            value={value}
            tileContent={({ date, view }) =>
              view === "month" &&
              eventsData[date.toISOString().split("T")[0]] ? (
                <div className="event-dot"></div>
              ) : null
            }
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <img
          src={Mindsphere}
          alt="Mindsphere Logo"
          className="mindsphere-logo"
        />
        <nav className="footer-nav">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/programmes">Programmes</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <address>
          60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409501
        </address>
        <p>
          Copyright © 2024 Mindsphere Singapore Pte. Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CalendarPage;
