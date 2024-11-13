const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Booking {
  constructor(bookingID, programQuantity, userID, programID, scheduleID) {
    this.bookingID = bookingID;
    this.programQuantity = programQuantity;
    this.userID = userID;
    this.programID = programID;
    this.scheduleID = scheduleID;
  }

  // Create a new booking with scheduleID and check slot availability
  static async createBooking(data) {
    const pool = await sql.connect(dbConfig);

    // Check slot availability
    const slotCheck = await pool
      .request()
      .input("scheduleID", sql.Int, data.scheduleID)
      .query(
        "SELECT slots, slotCount FROM ProgramSchedule WHERE scheduleID = @scheduleID"
      );

    if (slotCheck.recordset.length === 0) {
      throw new Error("Schedule not found");
    }

    const { slots, slotCount } = slotCheck.recordset[0];

    if (slotCount + data.programQuantity > slots) {
      throw new Error("Not enough available slots");
    }

    // Create booking
    const result = await pool
      .request()
      .input("programQuantity", sql.Int, data.programQuantity)
      .input("userID", sql.Int, data.userID)
      .input("programID", sql.Int, data.programID)
      .input("scheduleID", sql.Int, data.scheduleID)
      .query(`INSERT INTO booking (programQuantity, userID, programID, scheduleID)
              VALUES (@programQuantity, @userID, @programID, @scheduleID);
              SELECT SCOPE_IDENTITY() AS bookingID;`);

    const bookingID = result.recordset[0].bookingID;

    // Update slotCount in ProgramSchedule
    await pool
      .request()
      .input("scheduleID", sql.Int, data.scheduleID)
      .input("newSlotCount", sql.Int, slotCount + data.programQuantity)
      .query(
        "UPDATE ProgramSchedule SET slotCount = @newSlotCount WHERE scheduleID = @scheduleID"
      );

    return bookingID;
  }

  // Get all bookings for a specific user with program and schedule details
  static async getAllBookingsForUser(userID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().input("userID", sql.Int, userID)
      .query(`SELECT b.*, p.name AS programName, p.description AS programDescription, 
                      ps.startDate, ps.startTime, ps.endDate, ps.endTime, p.programPrice, ps.slotCount, ps.slots
               FROM booking b
               JOIN Program p ON b.programID = p.programID
               JOIN ProgramSchedule ps ON b.scheduleID = ps.scheduleID
               WHERE b.userID = @userID`);
    return result.recordset;
  }

  // Get all bookings for a specific child with program and schedule details
  static async getAllBookingsForChild(childID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().input("childID", sql.Int, childID)
      .query(`SELECT b.*, p.name AS programName, p.description AS programDescription, 
                      ps.startDate, ps.startTime, ps.endDate, ps.endTime, p.programPrice, ps.slotCount, ps.slots
               FROM booking b
               JOIN Program p ON b.programID = p.programID
               JOIN ProgramSchedule ps ON b.scheduleID = ps.scheduleID
               JOIN Child c ON b.userID = c.userID
               WHERE c.childID = @childID`);
    return result.recordset;
  }

  // Delete a booking by ID and decrement slotCount
  static async deleteBooking(bookingID) {
    const pool = await sql.connect(dbConfig);

    // Retrieve the programQuantity and scheduleID for this booking to adjust slotCount
    const bookingDetails = await pool
      .request()
      .input("bookingID", sql.Int, bookingID)
      .query(
        "SELECT programQuantity, scheduleID FROM booking WHERE bookingID = @bookingID"
      );

    if (bookingDetails.recordset.length === 0) {
      throw new Error("Booking not found");
    }

    const { programQuantity, scheduleID } = bookingDetails.recordset[0];

    // Delete booking
    await pool
      .request()
      .input("bookingID", sql.Int, bookingID)
      .query("DELETE FROM booking WHERE bookingID = @bookingID");

    // Decrement slotCount in ProgramSchedule
    await pool
      .request()
      .input("scheduleID", sql.Int, scheduleID)
      .input("newSlotCount", sql.Int, `slotCount - ${programQuantity}`)
      .query(
        "UPDATE ProgramSchedule SET slotCount = GREATEST(0, slotCount - @programQuantity) WHERE scheduleID = @scheduleID"
      );
  }
}

module.exports = Booking;
