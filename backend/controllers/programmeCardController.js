const ProgrammeCard = require("../models/ProgrammeCard");

const getAllCardsByProgramId = async (req, res) => {
  try {
    const cards = await ProgrammeCard.getCardsByProgramId(req.params.programID);
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme cards" });
  }
};

const getProgrammeCardById = async (req, res) => {
  try {
    const card = await ProgrammeCard.getProgrammeCardById(req.params.cardID);
    if (!card)
      return res.status(404).json({ message: "Programme card not found" });
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme card" });
  }
};

const createProgrammeCard = async (req, res) => {
  try {
    const cardID = await ProgrammeCard.createProgrammeCard(req.body);
    res.status(201).json({ cardID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating programme card" });
  }
};

const updateProgrammeCard = async (req, res) => {
  try {
    await ProgrammeCard.updateProgrammeCard(req.params.cardID, req.body);
    res.json({ message: "Programme card updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating programme card" });
  }
};

const deleteProgrammeCard = async (req, res) => {
  try {
    await ProgrammeCard.deleteProgrammeCard(req.params.cardID);
    res.json({ message: "Programme card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting programme card" });
  }
};

module.exports = {
  getAllCardsByProgramId,
  getProgrammeCardById,
  createProgrammeCard,
  updateProgrammeCard,
  deleteProgrammeCard,
};
