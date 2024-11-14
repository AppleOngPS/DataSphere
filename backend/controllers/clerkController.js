// clerkController.js
const Clerk = require("../models/Clerk");
const clerkClient = require("@clerk/clerk-sdk-node"); // Adjust import based on your setup

// Middleware to store user data in the database upon sign-in or sign-up
const storeUserMiddleware = async (req, res, next) => {
  if (req.user && req.user.publicMetadata && req.user.publicMetadata.role) {
    const role = req.user.publicMetadata.role;
    try {
      await Clerk.storeUserInDB(req.user.id, role);
      req.role = role;
      res.locals.role = role;
      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error storing user data", error: err.message });
    }
  } else {
    res.status(401).send("User role not found.");
  }
};

// Sync users from Clerk into your database
const syncUsers = async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList({ limit: 100 });
    const userPromises = users.map(async (user) => {
      const { id, email, firstName, lastName } = user;
      const name = `${firstName} ${lastName}`;
      await Clerk.insertClerkUser(id, name, email);
    });
    await Promise.all(userPromises);
    res.status(200).send("Users synced successfully!");
  } catch (error) {
    console.error("Error syncing users:", error);
    res.status(500).send("Error syncing users.");
  }
};

// Clerk middleware for authentication
const clerkMiddleware = require("@clerk/clerk-express"); // Adjust based on your Clerk setup
const authenticate = clerkMiddleware({
  apiKey: process.env.BACKEND_KEY, // Use Clerk secret key from environment variables
});

// Webhook handler for Clerk events
const handleWebhook = async (req, res) => {
  try {
    const event = req.body; // Assuming Clerk sends JSON payload
    console.log("Received Clerk webhook event:", event);
    // Handle different event types as needed
    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ message: "Error handling webhook" });
  }
};

module.exports = {
  storeUserMiddleware,
  syncUsers,
  authenticate,
  handleWebhook,
};
