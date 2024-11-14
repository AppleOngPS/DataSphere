const BookingDetails = require("../models/BookingDetails");

const createBookingDetail = async (req, res) => {
  try {
    const bookingDetailsID = await BookingDetails.createBookingDetail(req.body);
    res.status(201).json({ bookingDetailsID });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating booking detail" });
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
