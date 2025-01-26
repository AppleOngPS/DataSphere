require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const cors = require("cors");
const bodyParser = require("body-parser");
const { requireAuth } = require("@clerk/express");
const { createCheckoutSession } = require("./controllers/checkoutController");
const userController = require("./controllers/userController");
const childController = require("./controllers/childController");
const bookingController = require("./controllers/bookingController");
const bookingDetailsController = require("./controllers/bookingDetailsController"); // new BookingDetails controller
const programController = require("./controllers/programController");
const programScheduleController = require("./controllers/programScheduleController");
const programmeCardController = require("./controllers/programmeCardController");
// const webhookController = require("./controllers/webhookController"); // Import the webhook controller
const clerkClientMiddleware = require("./middlewares/clerkClientMiddleware"); // Import custom Clerk middleware
const clerkController = require("./controllers/clerkController"); // Clerk-related controllers
const loginController = require("./controllers/loginController");
const { validateUser, schemas } = require("./middlewares/validateUser");
const { sendBookingReminders } = require('./controllers/bookingController');  // Correct path



const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  "/signup",
  validateUser(schemas.register),
  loginController.registerUser
);
app.post("/login", validateUser(schemas.login), loginController.login);

// Stripe Checkout Route (No Authentication Required)
app.post("/create-checkout-session", createCheckoutSession);

app.get("/users/:id/details", userController.getAllById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users/email", userController.getEmailById);
app.get("/users/username", userController.getUsernameById);
app.get("/users/contact-number", userController.getContactNumberById);
app.get("/users/lunch", userController.getLunchById);
app.get("/users/:userID/role", userController.getRoleById);
app.put("/users/:id/subscribe", userController.updateSubscriptionStatus); // Make sure it's correctly imported



// Child Routes (No Authentication Required)
app.get("/children/user/:userID", childController.getChildrenByUserID);
app.post("/children/:userID", childController.createChild);
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
app.get("/schedule/:cardID", programScheduleController.getScheduleByCardId);
app.post("/programSchedules", programScheduleController.createSchedule);
app.put("/programSchedules/:id", programScheduleController.updateSchedule);
app.delete("/programSchedules/:id", programScheduleController.deleteSchedule);

// ProgrammeCard Routes (No Authentication Required)
app.get(
  "/programs/:programID/cards",
  programmeCardController.getAllCardsByProgramId
);
app.get("/cards/:cardID", programmeCardController.getProgrammeCardById);
app.get("/cards", programmeCardController.getAllProgrammeCards);
app.post("/cards", programmeCardController.createProgrammeCard);
app.put("/cards/:cardID", programmeCardController.updateProgrammeCard);
app.delete("/cards/:cardID", programmeCardController.deleteProgrammeCard);





// Start server and connect to the database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
    // Trigger the reminder check as soon as the server starts
  await sendBookingReminders();  // Call the reminder function immediately
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
