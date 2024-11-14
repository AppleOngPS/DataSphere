const User = require("../models/User");

const getAllById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getAllById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getAllById:", error);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

const getEmailById = async (req, res) => {
  try {
    const userId = req.params.id;
    const email = await User.getEmailById(userId);
    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }
    return res.status(200).json({ email });
  } catch (error) {
    console.error("Error in getEmailById:", error);
    res.status(500).json({ message: "Error fetching email" });
  }
};

const getUsernameById = async (req, res) => {
  try {
    const userId = req.params.id;
    const username = await User.getUsernameById(userId);
    if (!username) {
      return res.status(404).json({ message: "Username not found" });
    }
    return res.status(200).json({ username });
  } catch (error) {
    console.error("Error in getUsernameById:", error);
    res.status(500).json({ message: "Error fetching username" });
  }
};

const getContactNumberById = async (req, res) => {
  try {
    const userId = req.params.id;
    const contactNumber = await User.getContactNumberById(userId);
    if (!contactNumber) {
      return res.status(404).json({ message: "Contact number not found" });
    }
    return res.status(200).json({ contactNumber });
  } catch (error) {
    console.error("Error in getContactNumberById:", error);
    res.status(500).json({ message: "Error fetching contact number" });
  }
};

const getLunchById = async (req, res) => {
  try {
    const userId = req.params.id;
    const preferredLunch = await User.getLunchById(userId);
    if (!preferredLunch) {
      return res.status(404).json({ message: "Preferred lunch not found" });
    }
    return res.status(200).json({ preferredLunch });
  } catch (error) {
    console.error("Error in getLunchById:", error);
    res.status(500).json({ message: "Error fetching preferred lunch" });
  }
};

const createUser = async (req, res) => {
  try {
    const userId = await User.createUser(req.body);
    return res
      .status(201)
      .json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.updateUser(userId, req.body);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.deleteUser(userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  getAllById,
  getEmailById,
  getUsernameById,
  getContactNumberById,
  getLunchById,
  createUser,
  updateUser,
  deleteUser,
};
