// controllers/VideoController.js
const Booking = require("../models/Booking");

exports.getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    console.log("Fetching booking details for ID:", bookingId);

    if (!bookingId) {
      return res.status(400).json({ error: "Missing booking ID." });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Remove email restriction, allowing unrestricted access
    res.json({
      roomUrl: booking.roomUrl,
      sessionTime: booking.sessionTime,
      reason: booking.reason,
    });
  } catch (error) {
    console.error("Error retrieving booking:", error);
    res.status(500).json({ error: "Server error." });
  }
};
