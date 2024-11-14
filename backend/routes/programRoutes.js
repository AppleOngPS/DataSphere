const express = require('express');
const router = express.Router();
const {
    getProgramWithSchedules,
    createProgramWithSchedule,
    updateProgramWithSchedule,
    deleteProgramAndSchedule
} = require('../controllers/programController');

router.get('/programs-schedules', getProgramWithSchedules);  // Fetch all programs with schedules
router.post('/programs-schedules', createProgramWithSchedule);  // Create new program and schedule
router.put('/programs-schedules/:id', updateProgramWithSchedule);  // Update a program and schedule
router.delete('/programs-schedules/:id', deleteProgramAndSchedule);  // Delete a program and associated schedules

module.exports = router;
