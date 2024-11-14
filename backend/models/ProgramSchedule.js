const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ProgramSchedule {
  constructor(
    scheduleID,
    cardID, // Replace programID with cardID
    startDate,
    startTime,
    endDate,
    endTime,
    slots,
    slotCount
  ) {
    this.scheduleID = scheduleID;
    this.cardID = cardID; // Updated to cardID
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate;
    this.endTime = endTime;
    this.slots = slots;
    this.slotCount = slotCount;
  }

  // Fetch a schedule by card ID (updated method)
  static async getScheduleByCardId(cardID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("cardID", sql.Int, cardID) // Query by cardID instead of scheduleID
      .query("SELECT * FROM ProgramSchedule WHERE cardID = @cardID"); // Updated query
    return result.recordset;
  }

  // Fetch all schedules
  static async getAllSchedules() {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM ProgramSchedule");
    return result.recordset;
  }

  // Create a new schedule
  static async createSchedule(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("cardID", sql.Int, data.cardID) // Use cardID instead of programID
      .input("startDate", sql.Date, data.startDate)
      .input("startTime", sql.Time, data.startTime)
      .input("endDate", sql.Date, data.endDate)
      .input("endTime", sql.Time, data.endTime)
      .input("slots", sql.Int, data.slots)
      .input("slotCount", sql.Int, data.slotCount || 0)
      .query(
        `INSERT INTO ProgramSchedule (cardID, startDate, startTime, endDate, endTime, slots, slotCount)
         VALUES (@cardID, @startDate, @startTime, @endDate, @endTime, @slots, @slotCount);
         SELECT SCOPE_IDENTITY() AS scheduleID;`
      );
    return result.recordset[0].scheduleID;
  }

  // Update a schedule by ID
  static async updateSchedule(scheduleID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("scheduleID", sql.Int, scheduleID)
      .input("cardID", sql.Int, data.cardID) // Use cardID instead of programID
      .input("startDate", sql.Date, data.startDate)
      .input("startTime", sql.Time, data.startTime)
      .input("endDate", sql.Date, data.endDate)
      .input("endTime", sql.Time, data.endTime)
      .input("slots", sql.Int, data.slots)
      .input("slotCount", sql.Int, data.slotCount)
      .query(
        `UPDATE ProgramSchedule SET cardID = @cardID, startDate = @startDate, startTime = @startTime, endDate = @endDate,
         endTime = @endTime, slots = @slots, slotCount = @slotCount
         WHERE scheduleID = @scheduleID`
      );
  }

  // Delete a schedule by ID
  static async deleteSchedule(scheduleID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("scheduleID", sql.Int, scheduleID)
      .query("DELETE FROM ProgramSchedule WHERE scheduleID = @scheduleID");
  }
}

module.exports = ProgramSchedule;
