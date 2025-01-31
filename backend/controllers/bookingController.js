const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

require("dotenv").config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email from .env
    to, // Recipient email
    subject, // Email subject
    text, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error("Failed to send email");
  }
};

// Function to send reminders for bookings 3 days in advance
const sendBookingReminders = async () => {
  try {
    const bookings = await Booking.getBookingsForReminder();

    if (bookings.length === 0) {
      console.log("No bookings to notify.");
      return;
    }

    for (const booking of bookings) {
      const { bookingID, customerEmail, customerName, serviceName, startDate } =
        booking;

      // Format the startDate
      const formattedDate = new Date(startDate).toLocaleDateString(); // For the date part
      const formattedTime = new Date(startDate).toLocaleTimeString(); // For the time part

      // Check if startDate is present
      if (!startDate) {
        console.error(`Missing startDate for bookingID: ${bookingID}`);
        continue; // Skip this booking if the date is missing
      }

      const subject = `Reminder: Upcoming Booking for ${serviceName}`;
      const text = `
        Dear ${customerName},

        This is a reminder about your upcoming booking:

        - Program name: ${serviceName}
        - Date: ${formattedDate}
        - Time: ${formattedTime}

        We look forward to seeing you!

        Best regards,
        The Team
      `;

      await sendEmail(customerEmail, subject, text);

      // Mark as notified
      await Booking.markAsNotified(booking.bookingID);
    }

    console.log("Reminders sent successfully.");
  } catch (error) {
    console.error("Error sending booking reminders:", error);
  }
};

// Function to create a booking
const createBooking = async (req, res) => {
  try {
    const bookingID = await Booking.createBooking(req.body);
    res.status(201).json({ bookingID });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ message: error.message });
  }
};

// Function to get all bookings for a user
const getAllBookingsForUser = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookingsForUser(req.params.userID);
    res.json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings for user:", error);
    res.status(500).json({ message: "Error retrieving bookings for user" });
  }
};

// Function to delete a booking
const deleteBooking = async (req, res) => {
  try {
    await Booking.deleteBooking(req.params.bookingID);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
};

module.exports = {
  createBooking,
  getAllBookingsForUser,
  deleteBooking,
  sendBookingReminders,
};
