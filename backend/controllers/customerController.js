const Customer = require("../models/Customer");

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving customer" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const customerID = await Customer.createCustomer(req.body);
    res.status(201).json({ customerID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    await Customer.updateCustomer(req.params.id, req.body);
    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteCustomer(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};

module.exports = {
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
