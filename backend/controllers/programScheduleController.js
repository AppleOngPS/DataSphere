const ProgramSchedule = require("../models/ProgramSchedule");

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await ProgramSchedule.getAllSchedules();
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving schedules" });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const schedule = await ProgramSchedule.getScheduleById(req.params.id);
    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving schedule" });
  }
};

const createSchedule = async (req, res) => {
  try {
    const scheduleID = await ProgramSchedule.createSchedule(req.body);
    res.status(201).json({ scheduleID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    await ProgramSchedule.updateSchedule(req.params.id, req.body);
    res.json({ message: "Schedule updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    await ProgramSchedule.deleteSchedule(req.params.id);
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting schedule" });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
