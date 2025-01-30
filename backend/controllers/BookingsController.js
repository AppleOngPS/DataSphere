// controllers/BookingsController.js
const Booking = require("../models/Booking");
const { createDailyRoom } = require("../services/daily");
const { sendConfirmationEmail } = require("../services/email");

exports.createBooking = async (req, res) => {
  try {
    // Validate input
    const { email, reason, slot } = req.body;
    if (!email || !reason || !slot) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 1. Create video room (Daily.co)
    const roomUrl = await createDailyRoom(slot);

    // 2. Save to database
    const booking = await Booking.create({
      email,
      reason,
      sessionTime: new Date(slot),
      roomUrl,
    });

    // 3. Send confirmation email
    await sendConfirmationEmail(email, booking.id, roomUrl);

    res.status(201).json({
      message: "Booking created successfully!",
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Booking failed: " + error.message });
  }
};
