const Child = require("../models/Child");

// Get children by user ID
const getChildrenByUserID = async (req, res) => {
  try {
    const children = await Child.getChildrenByUserID(req.params.userID);
    res.json(children);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving children" });
  }
};

// Create a new child
const createChild = async (req, res) => {
  try {
    const childID = await Child.createChild(req.body);
    res.status(201).json({ childID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating child" });
  }
};

// Update an existing child
const updateChild = async (req, res) => {
  try {
    await Child.updateChild(req.params.id, req.body);
    res.json({ message: "Child updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating child" });
  }
};

// Delete a child by ID
const deleteChild = async (req, res) => {
  try {
    await Child.deleteChild(req.params.id);
    res.json({ message: "Child deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting child" });
  }
};

module.exports = {
  getChildrenByUserID,
  createChild,
  updateChild,
  deleteChild,
};
