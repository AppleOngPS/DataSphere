const User = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

const createUser = async (req, res) => {
  try {
    const userID = await User.createUser(req.body);
    res.status(201).json({ userID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
