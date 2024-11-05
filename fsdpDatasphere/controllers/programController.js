const Program = require("../models/programModel");

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.getAllPrograms(); // Assuming this fetches from the database
    res.json(programs); // Ensure this sends JSON
  } catch (error) {
    res.status(500).json({ error: "Error fetching programs" });
  }
};

const getProgramById = async (req, res) => {
  const programID = parseInt(req.params.id);

  try {
    const program = await Program.getProgramById(programID);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving program");
  }
};

const createProgram = async (req, res) => {
  const { name, description, programPrice } = req.body;

  try {
    const newProgram = await Program.createProgram({
      name,
      description,
      programPrice,
    });
    res.status(201).json(newProgram);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating program");
  }
};

const updateProgram = async (req, res) => {
  const programID = parseInt(req.params.id);
  const { name, description, programPrice } = req.body;

  try {
    await Program.updateProgram(programID, { name, description, programPrice });
    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating program");
  }
};

const deleteProgram = async (req, res) => {
  const programID = parseInt(req.params.id);

  try {
    await Program.deleteProgram(programID);
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting program");
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
