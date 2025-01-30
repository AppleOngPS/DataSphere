// routes/video.js
const express = require("express");
const { getBookingDetails } = require("../controllers/VideoController");

const router = express.Router();

// Page 2: Unrestricted Video Call Access
router.get("/:bookingId", getBookingDetails);

module.exports = router;
