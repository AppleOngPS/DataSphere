const Program = require("../models/Program");

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.getAllPrograms();
    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programs" });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.getProgramById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving program" });
  }
};

const createProgram = async (req, res) => {
  try {
    const programID = await Program.createProgram(req.body);
    res.status(201).json({ programID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating program" });
  }
};

const updateProgram = async (req, res) => {
  try {
    await Program.updateProgram(req.params.id, req.body);
    res.json({ message: "Program updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating program" });
  }
};

const deleteProgram = async (req, res) => {
  try {
    await Program.deleteProgram(req.params.id);
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting program" });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
