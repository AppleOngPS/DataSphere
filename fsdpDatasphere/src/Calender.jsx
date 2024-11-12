import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // Uncomment if you want default Calendar styles
import "./Calender.css"; // Custom CSS for your Calendar
import Mindsphere from "./assets/logo.png"; // Update this path to the actual path of your logo image file

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <div className="calendar-container">
        <h1 className="calendar-title">Calendar</h1>
        <Calendar
          onChange={setValue}
          value={value}
          className="calendar-component"
        />
        <p className="selected-date">Selected Date: {value.toDateString()}</p>
      </div>

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
