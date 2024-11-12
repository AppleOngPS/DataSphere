const Child = require("../models/Child");

const getChildrenByCustomerID = async (req, res) => {
  try {
    const children = await Child.getChildrenByCustomerID(req.params.customerID);
    res.json(children);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving children" });
  }
};

const createChild = async (req, res) => {
  try {
    const childID = await Child.createChild(req.body);
    res.status(201).json({ childID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating child" });
  }
};

const updateChild = async (req, res) => {
  try {
    await Child.updateChild(req.params.id, req.body);
    res.json({ message: "Child updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating child" });
  }
};

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
  getChildrenByCustomerID,
  createChild,
  updateChild,
  deleteChild,
};
