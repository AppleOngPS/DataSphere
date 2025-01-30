const express = require("express");
const { createBooking } = require("../controllers/BookingsController");

const router = express.Router();

// Page 1: Booking Form Submission
router.post("/", createBooking);

module.exports = router;
