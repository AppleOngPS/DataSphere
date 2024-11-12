import React, { useState } from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calender.css";
import "./Calendar.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Calendar</h1>
      <Calendar
        onChange={setValue}
        value={value}
        className="calendar-component"
      />
      <p className="selected-date">Selected Date: {value.toDateString()}</p>
    </div>
  );
};

export default CalendarPage;
