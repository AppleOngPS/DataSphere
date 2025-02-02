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
// const clerkClientMiddleware = require("./middlewares/clerkClientMiddleware"); // Import custom Clerk middleware
const clerkController = require("./controllers/clerkController"); // Clerk-related controllers
const loginController = require("./controllers/loginController");
const { validateUser, schemas } = require("./middlewares/validateUser");
//reportRoutes
const reportRoutes = require("./routes/reportRoutes");

const { fetchAnalyticsData, fetchUserFlowData } = require("./analytics");  // Import the function from analytics.js

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

// API endpoint to fetch analytics data
app.get('/api/analytics', async (req, res) => {
  try {
    const data = await fetchAnalyticsData();  // Call the fetch function
    res.json(data);  // Send the fetched data as a response
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: 'Error fetching analytics data' });  // Send an error response
  }
});

// // Route to fetch user flow data (page views by page path)
// app.get('/api/user-flow', async (req, res) => {
//   try {
//     const data = await fetchUserFlowData();
//     res.json(data);  // Send the user flow data as JSON
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching user flow data' });
//   }
// });

// // Route for tracking events
// const trackingController = require("./controllers/TrackingController");
// app.post("/track", trackingController.logUserEvent);
// app.post("/track/:id", trackingController.logUserEvent);
// app.get("/analytics", trackingController.getTrackingData);

// AI Suggestions Route
app.post("/ai/suggestions", async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ message: "No data provided" });
  }
  try {
    const insights = generateInsights(data);
    res.status(200).json({ suggestion: insights });
  } catch (error) {
    res.status(500).json({ message: "Error generating insights", error: error.message });
  }
});

const generateInsights = (data) => {
  if (!data.length) return "No data available yet. Encourage more user activity!";
  const totalEvents = data.length;
  const uniqueUsers = new Set(data.map((item) => item.userID)).size;

  return `Total events: ${totalEvents}. Unique users: ${uniqueUsers}. Focus on engaging inactive users.`;
};

// Quiz Routes
const quizController = require("./controllers/quizController");
app.get("/quizzes", quizController.getAllQuizzes); // Fetch all quizzes
app.get("/quizzes/:quizID", quizController.getQuizByID); // Fetch a specific quiz
app.post("/quizzes/:quizID/results", quizController.submitQuizResults); // Submit quiz results
app.get("/quiz-results/user/:userID", quizController.getQuizResultsByUser);


// Report routes
app.use("/reports", reportRoutes);

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
