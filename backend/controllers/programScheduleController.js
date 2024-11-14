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

const getScheduleByCardId = async (req, res) => {
  try {
    const schedule = await ProgramSchedule.getScheduleByCardId(
      req.params.cardID
    ); // Fetch using cardID
    if (!schedule || schedule.length === 0) {
      // Handle the case when no schedule is found
      return res
        .status(404)
        .json({ message: "Schedule not found for this card" });
    }
    res.json(schedule); // Return the schedule(s)
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
  getScheduleByCardId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
