import React, { useState, useEffect } from "react";
import { format, addHours } from "date-fns";
import { useParams } from "react-router-dom";
import "../styles/Step4Schedule.css";

function Step4Schedule({ selectedSchedule, setSelectedSchedule, setStep }) {
  const { cardID } = useParams(); // Ensure cardID is fetched from URL
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
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
      fetchSchedules();
    }
  }, [cardID]);

  const handleScheduleChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const selected = schedules.find((schedule) => schedule.scheduleID === selectedId);
    setSelectedSchedule(selected);
  };

  const formatDate = (dateString) => {
    return format(addHours(new Date(dateString), 8), "dd MMM yyyy");
  };

  const formatTime = (timeString) => {
    return format(addHours(new Date(timeString), 8), "HH:mm");
  };

  return (
    <div className="schedule-selection">
      <h3>Select Schedule</h3>
      <label>Schedule:</label>
      <select onChange={handleScheduleChange} value={selectedSchedule ? selectedSchedule.scheduleID : ""}>
        <option value="">Select Schedule</option>
        {schedules.map((schedule) => (
          <option key={schedule.scheduleID} value={schedule.scheduleID}>
            {`${formatDate(schedule.startDate)} - ${formatDate(schedule.endDate)}, 
              ${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`}
          </option>
        ))}
      </select>

      <div className="button-container">
        <button className="back-button" onClick={() => setStep(3)}>Back</button>
        <button
          className="next-button"
          onClick={() => selectedSchedule ? setStep(5) : alert("Please select a schedule.")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Step4Schedule;
