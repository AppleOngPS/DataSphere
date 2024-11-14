const { clerkClient } = require('@clerk/clerk-sdk-node'); // Import Clerk SDK
const User = require("../models/User");
const { requireAuth } = require("@clerk/express"); // To ensure routes are protected

// Fetch a user by Clerk ID
const getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // Get Clerk user ID from request
    const user = await User.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    // Use Clerk to get user info from the authenticated session
    const clerkUser = await clerkClient.users.getUser(req.user.id);
    
    // Create a new user object using Clerk data and store in the database
    const userData = {
      userName: clerkUser.firstName + " " + clerkUser.lastName,
      email: clerkUser.emailAddresses[0].emailAddress,
      password: req.body.password,  // Store password securely
      contactNumber: req.body.contactNumber,
      preferredLunch: req.body.preferredLunch,
      role: req.body.role || "user", // Default role is "user"
    };

    const userID = await User.createUser(userData); // Insert into database

    return res.status(201).json({ message: "User created successfully", userID });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Error creating user" });
  }
};

// Update a user's preferred lunch
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get Clerk user ID from request
    const { preferredLunch } = req.body;

    // Update the user's preferred lunch option in the database
    await User.updateUser(userId, { preferredLunch });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Error updating user" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get Clerk user ID from request

    // Delete the user from the database
    await User.deleteUser(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

// Protect routes with Clerk authentication and role-based access control (RBAC)
const requireAdmin = (req, res, next) => {
  const userRole = req.user.publicMetadata.role; // Get role from Clerk user metadata
  if (userRole !== "admin") {
    return res.status(403).json({ message: "Permission denied" });
  }
  next(); // Proceed if user is an admin
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  requireAdmin, // Add requireAdmin to allow role-based access control
};

