require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express"); // Import Clerk's middleware directly as clerkMiddleware
const Clerk = require("../models/Clerk"); // Import the Clerk model

// Initialize Clerk middleware with the backend API key
const authenticate = clerkMiddleware({
  apiKey: process.env.BACKEND_KEY,
});

// Middleware to authenticate and store user data in the database
const clerkCustomMiddleware = async (req, res, next) => {
  try {
    // First, authenticate the request using Clerk
    authenticate(req, res, async () => {
      if (req.user && req.user.publicMetadata && req.user.publicMetadata.role) {
        const userId = req.user.id;
        const role = req.user.publicMetadata.role;

        // Store user in the database if not already stored
        await Clerk.storeUserInDB(userId, role);

        // Attach the role to the request and response locals for downstream use
        req.role = role;
        res.locals.role = role;

        next(); // Proceed to the next middleware or route handler
      } else {
        // If no role is found in public metadata, return an unauthorized status
        res.status(401).json({ message: "User role not found." });
      }
    });
  } catch (error) {
    console.error("Error in Clerk middleware:", error);
    res
      .status(500)
      .json({ message: "Server error during Clerk authentication." });
  }
};

module.exports = clerkCustomMiddleware;
