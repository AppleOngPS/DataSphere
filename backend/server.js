require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const cors = require("cors");
const bodyParser = require("body-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const { createCheckoutSession } = require("./controllers/checkoutController");
const userController = require("./controllers/userController");
const childController = require("./controllers/childController");
const bookingController = require("./controllers/bookingController");
const bookingDetailsController = require("./controllers/bookingDetailsController"); // new BookingDetails controller
const programController = require("./controllers/programController");
const programScheduleController = require("./controllers/programScheduleController");
const programmeCardController = require("./controllers/programmeCardController");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe Checkout Route (No Authentication Required)
app.post("/create-checkout-session", createCheckoutSession);

// User Routes (Require Authentication)
app.get("/users/:id", authMiddleware, userController.getUserById);
app.post("/users", authMiddleware, userController.createUser);
app.put("/users/:id", authMiddleware, userController.updateUser);
app.delete("/users/:id", authMiddleware, userController.deleteUser);

// Child Routes (No Authentication Required)
app.get("/children/user/:userID", childController.getChildrenByUserID);
app.post("/children", childController.createChild);
app.put("/children/:id", childController.updateChild);
app.delete("/children/:id", childController.deleteChild);

// Booking Routes (No Authentication Required)
app.post("/bookings", bookingController.createBooking);
app.get("/bookings/user/:userID", bookingController.getAllBookingsForUser);
app.delete("/bookings/:bookingID", bookingController.deleteBooking);

// BookingDetails Routes (No Authentication Required)
app.post("/bookingDetails", bookingDetailsController.createBookingDetail); // Create a new booking detail
app.get(
  "/bookingDetails/:bookingID",
  bookingDetailsController.getBookingDetailsByBookingID
); // Get booking details by bookingID

// Program Routes (No Authentication Required)
app.get("/programs", programController.getAllPrograms);
app.get("/programs/:id", programController.getProgramById);
app.post("/programs", programController.createProgram);
app.put("/programs/:id", programController.updateProgram);
app.delete("/programs/:id", programController.deleteProgram);

// ProgramSchedule Routes (No Authentication Required)
app.get("/programSchedules", programScheduleController.getAllSchedules);
app.get("/programSchedules/:id", programScheduleController.getScheduleById);
app.post("/programSchedules", programScheduleController.createSchedule);
app.put("/programSchedules/:id", programScheduleController.updateSchedule);
app.delete("/programSchedules/:id", programScheduleController.deleteSchedule);

// ProgrammeCard Routes (No Authentication Required)
app.get(
  "/programs/:programID/cards",
  programmeCardController.getAllCardsByProgramId
);
app.get("/cards/:cardID", programmeCardController.getProgrammeCardById);
app.post("/cards", programmeCardController.createProgrammeCard);
app.put("/cards/:cardID", programmeCardController.updateProgrammeCard);
app.delete("/cards/:cardID", programmeCardController.deleteProgrammeCard);

// Start server and connect to the database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
