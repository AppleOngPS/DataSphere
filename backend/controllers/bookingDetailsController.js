const BookingDetails = require("../models/BookingDetails");

const createBookingDetail = async (req, res) => {
  console.log("📩 Incoming request for BookingDetails:", req.body); // ✅ Debug log

  try {
    const { bookingID, childID, pricePerChild } = req.body;

    if (!bookingID || !childID || !pricePerChild) {
      return res.status(400).json({ error: "Missing required fields in request body" });
    }

    const bookingDetailsID = await BookingDetails.createBookingDetail({ bookingID, childID, pricePerChild });

    res.status(201).json({ success: true, bookingDetailsID });
  } catch (error) {
    console.error("❌ Error in BookingDetails creation:", error);
    res.status(500).json({ error: error.message });
  }
};

const getBookingDetailsByBookingID = async (req, res) => {
  try {
    const bookingDetails = await BookingDetails.getBookingDetailsByBookingID(
      req.params.bookingID
    );
    res.json(bookingDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving booking details" });
  }
};

module.exports = {
  createBookingDetail,
  getBookingDetailsByBookingID,
};
