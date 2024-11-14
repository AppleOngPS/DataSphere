const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const bookingID = await Booking.createBooking(req.body);
    res.status(201).json({ bookingID });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllBookingsForUser = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookingsForUser(req.params.userID);
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving bookings for user" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.deleteBooking(req.params.bookingID);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking" });
  }
};

module.exports = {
  createBooking,
  getAllBookingsForUser,
  deleteBooking,
};