const mssql = require('mssql');
const dayjs = require('dayjs');

// Get all programs with schedules
const getProgramWithSchedules = async (req, res) => {
  try {
    const result = await mssql.query(`
      SELECT 
        p.programID,
        p.name,
        p.description,
        p.programPrice,
        s.startDate,
        s.startTime,
        s.endDate,
        s.endTime,
        s.slots
      FROM dbo.Program p
      INNER JOIN dbo.ProgramSchedule s ON p.programID = s.programID
    `);

    // Format the dates using dayjs
    const formattedPrograms = result.recordset.map(program => ({
      programID: program.programID,
      name: program.name,
      description: program.description,
      programPrice: program.programPrice,
      startDate: dayjs(program.startDate).format('YYYY-MM-DD'),
      startTime: dayjs(program.startTime).format('HH:mm:ss'),
      endDate: dayjs(program.endDate).format('YYYY-MM-DD'),
      endTime: dayjs(program.endTime).format('HH:mm:ss'),
      slots: program.slots
    }));

    res.json(formattedPrograms);
  } catch (err) {
    console.error('Error fetching programs:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Create a new program and schedule
const createProgramWithSchedule = async (req, res) => {
  const { name, description, programPrice, startDate, startTime, endDate, endTime, slots } = req.body;
  try {
    // Insert program into Program table
    await mssql.query(`
      INSERT INTO dbo.Program (name, description, programPrice) 
      VALUES ('${name}', '${description}', ${programPrice});
    `);

    // Get the last inserted programID
    const programID = await mssql.query(`
      SELECT TOP 1 programID FROM dbo.Program ORDER BY programID DESC;
    `);

    // Insert into ProgramSchedule
    await mssql.query(`
      INSERT INTO dbo.ProgramSchedule (programID, startDate, startTime, endDate, endTime, slots, slotCount)
      VALUES (${programID.recordset[0].programID}, '${startDate}', '${startTime}', '${endDate}', '${endTime}', ${slots}, 0);
    `);

    res.status(201).json({ message: 'Program and schedule created successfully' });
  } catch (err) {
    console.error('Error creating program and schedule:', err);
    res.status(500).json({ error: 'Error creating program and schedule' });
  }
};

// Update an existing program and its schedule
const updateProgramWithSchedule = async (req, res) => {
  const { name, description, programPrice, startDate, startTime, endDate, endTime, slots } = req.body;
  const programID = req.params.id;

  try {
    // Update program in Program table
    await mssql.query(`
      UPDATE dbo.Program
      SET name = '${name}', description = '${description}', programPrice = ${programPrice}
      WHERE programID = ${programID};
    `);

    // Update program schedule in ProgramSchedule table
    await mssql.query(`
      UPDATE dbo.ProgramSchedule
      SET startDate = '${startDate}', startTime = '${startTime}', endDate = '${endDate}', endTime = '${endTime}', slots = ${slots}
      WHERE programID = ${programID};
    `);

    res.status(200).json({ message: 'Program and schedule updated successfully' });
  } catch (err) {
    console.error('Error updating program and schedule:', err);
    res.status(500).json({ error: 'Error updating program and schedule' });
  }
};

// Delete a program and its associated schedule
const deleteProgramAndSchedule = async (req, res) => {
  const programID = req.params.id;

  try {
    await mssql.query(`
      DELETE FROM dbo.booking
      WHERE scheduleID IN (
        SELECT scheduleID FROM dbo.ProgramSchedule WHERE programID = ${programID}
      );
    `);

    await mssql.query(`
      DELETE FROM dbo.ProgramSchedule
      WHERE programID = ${programID};
    `);
    await mssql.query(`
      DELETE FROM dbo.Program
      WHERE programID = ${programID};
    `);

    res.status(200).json({ message: 'Program and associated schedule deleted successfully' });
  } catch (err) {
    console.error('Error deleting program and schedule:', err);
    res.status(500).json({ error: 'Error deleting program and schedule' });
  }
};


module.exports = {
  getProgramWithSchedules,
  createProgramWithSchedule,
  updateProgramWithSchedule,
  deleteProgramAndSchedule
};
