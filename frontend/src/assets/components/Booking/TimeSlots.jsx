import { BookingCard } from "./BookingCard";

export const TimeSlots = () => {
  // Example data - replace with your actual data source
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
    <div className="time-slots">
      <h1>Time Slots Booked</h1>
      <div className="cards-container">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};
export default TimeSlots;
