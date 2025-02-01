import { Link } from "react-router-dom";

export const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.program}</h3>
      <p>Time Slot: {booking.time}</p>
      <p>Date: {booking.date}</p>
      <Link to={`/call/${booking.id}`}>
        <button>Join Session</button>
      </Link>
    </div>
  );
};
