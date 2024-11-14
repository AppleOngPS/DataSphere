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
const webhookController = require("./controllers/webhookController"); // Import the webhook controller
const clerkClientMiddleware = require("./middlewares/clerkClientMiddleware"); // Import custom Clerk middleware
const clerkController = require("./controllers/clerkController"); // Clerk-related controllers
const loginController = require("./controllers/loginController");
const { validateUser, schemas } = require("./middlewares/validateUser");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Clerk middleware for authentication (pass secret API key)
// app.use(
//   clerkMiddleware({
//     apiKey: process.env.BACKEND_KEY, // Secret Key from .env
//   })
// );

// // // Function to store user data in the database upon sign-in or sign-up
// // const storeUserInDB = async (userId, role) => {
// //   try {
// //     const pool = await sql.connect(dbConfig);
// //     const result = await pool
// //       .request()
// //       .input("userId", sql.VarChar, userId)
// //       .input("role", sql.VarChar, role)
// //       .query(
// //         `IF NOT EXISTS (SELECT 1 FROM Users WHERE userId = @userId)
// //           INSERT INTO endUsers (userId, role) VALUES (@userId, @role);`
// //       );
// //     return result;
// //   } catch (err) {
// //     console.error("Database insert error:", err);
// //     throw new Error("Database error during user creation");
// //   }
// // };

// // // Middleware to detect role and store user data in DB
// // app.use(async (req, res, next) => {
// //   if (req.user && req.user.publicMetadata && req.user.publicMetadata.role) {
// //     const role = req.user.publicMetadata.role;
// //     try {
// //       await storeUserInDB(req.user.id, role); // Store user data in DB if not already stored
// //       req.role = role; // Pass role info in the request
// //       res.locals.role = role; // Store role in response locals (or set it in a cookie)
// //       next();
// //     } catch (err) {
// //       res
// //         .status(500)
// //         .json({ message: "Error storing user data", error: err.message });
// //     }
// //   } else {
// //     res.status(401).send("User role not found.");
// //   }
// // });

// // // Sync users from Clerk into your database (New Endpoint)
// // app.get("/sync-users", async (req, res) => {
// //   try {
// //     // Fetch all users from Clerk (adjust limit as necessary)
// //     const users = await clerkClient.users.getUserList({ limit: 100 });

// //     // Iterate through the list of users and insert them into your database
// //     const userPromises = users.map(async (user) => {
// //       const { id, email, firstName, lastName } = user;

// //       // Insert user data into the Customers table (make sure column names match your schema)
// //       const pool = await sql.connect(dbConfig);
// //       await pool
// //         .request()
// //         .input("id", sql.VarChar, id)
// //         .input("name", sql.VarChar, `${firstName} ${lastName}`)
// //         .input("email", sql.VarChar, email)
// //         .query(
// //           `INSERT INTO Customers (customerID, customerName, email)
// //           VALUES (@id, @name, @email)`
// //         );
// //     });

// //     // Wait for all insertions to complete
// //     await Promise.all(userPromises);

// //     res.status(200).send("Users synced successfully!");
// //   } catch (error) {
// //     console.error("Error syncing users:", error);
// //     res.status(500).send("Error syncing users.");
// //   }
// // });

// // // Webhook route to handle Clerk webhook events
// // app.post(
// //   "/webhooks/clerk",
// //   express.raw({ type: "application/json" }),
// //   webhookController.handleWebhook
// // );

// Apply the Clerk middleware globally
// Route to sync Clerk users to your database

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
