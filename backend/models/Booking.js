// module.exports = Booking;
const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Booking {
  constructor(bookingID, programQuantity, userID, scheduleID, totalAmount, notified, customerEmail, customerName, Name, bookingDate, startTime) {
    this.bookingID = bookingID;
    this.programQuantity = programQuantity;
    this.userID = userID;
    this.scheduleID = scheduleID;
    this.totalAmount = totalAmount;
    this.notified = notified;
    this.customerEmail = customerEmail;
    this.customerName = customerName;
    this.Name = Name;
    this.bookingDate = bookingDate;
    this.startTime = startTime;
  }

  // ✅ Prevent Creating Duplicate Booking for the Same User and Schedule
  static async createBooking(data) {
    const pool = await sql.connect(dbConfig);

    // Check if booking already exists for this user and schedule
    const existingBooking = await pool
        .request()
        .input("userID", sql.Int, data.userID)
        .input("scheduleID", sql.Int, data.scheduleID)
        .query("SELECT bookingID FROM booking WHERE userID = @userID AND scheduleID = @scheduleID");

    if (existingBooking.recordset.length > 0) {
        console.log("🔹 Booking already exists:", existingBooking.recordset[0].bookingID);
        return { success: false, bookingID: existingBooking.recordset[0].bookingID }; // ✅ Return existing ID
    }

    // Check slot availability
    const slotCheck = await pool
        .request()
        .input("scheduleID", sql.Int, data.scheduleID)
        .query("SELECT slots, slotCount FROM ProgramSchedule WHERE scheduleID = @scheduleID");

    if (slotCheck.recordset.length === 0) {
        throw new Error("Schedule not found");
    }

    const { slots, slotCount } = slotCheck.recordset[0];

    if (slotCount + data.programQuantity > slots) {
        throw new Error("Not enough available slots");
    }

    // Calculate total amount
    const totalAmount = data.programQuantity * data.programPrice;

    // Create booking
    const result = await pool
        .request()
        .input("programQuantity", sql.Int, data.programQuantity)
        .input("userID", sql.Int, data.userID)
        .input("scheduleID", sql.Int, data.scheduleID)
        .input("totalAmount", sql.Decimal(10, 2), totalAmount/100)
        .query(
            `INSERT INTO booking (programQuantity, userID, scheduleID, totalAmount)
             VALUES (@programQuantity, @userID, @scheduleID, @totalAmount);
             SELECT SCOPE_IDENTITY() AS bookingID;`
        );

    const bookingID = result.recordset[0].bookingID;

    // Update slot count
    await pool
        .request()
        .input("scheduleID", sql.Int, data.scheduleID)
        .input("newSlotCount", sql.Int, slotCount + data.programQuantity)
        .query("UPDATE ProgramSchedule SET slotCount = @newSlotCount WHERE scheduleID = @scheduleID");

    return { success: true, bookingID };
}
  // Get all bookings for a specific user with schedule details
  static async getAllBookingsForUser(userID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("userID", sql.Int, userID)
      .query(
        `SELECT b.*, ps.startDate, ps.startTime, ps.endDate, ps.endTime, ps.slots
         FROM booking b
         JOIN ProgramSchedule ps ON b.scheduleID = ps.scheduleID
         WHERE b.userID = @userID`
      );
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
      .query(
        `UPDATE ProgramSchedule SET slotCount = GREATEST(0, slotCount - @programQuantity) 
         WHERE scheduleID = @scheduleID`
      );
  }

  // Get bookings for reminders
  static async getBookingsForReminder() {
    const pool = await sql.connect(dbConfig);
    const query = `
      SELECT 
        b.bookingID, 
        e.userName AS customerName,  -- Now using userName from endUser table
        e.email AS customerEmail,  -- Added email from endUser table
        pc.cardName AS serviceName,  
        ps.startDate
      FROM dbo.Booking b
      INNER JOIN dbo.ProgramSchedule ps 
        ON b.scheduleID = ps.scheduleID
      INNER JOIN dbo.ProgrammeCard pc
        ON ps.cardID = pc.cardID
      INNER JOIN dbo.endUser e  -- Added join with endUser to get customer details
        ON b.userID = e.userID
      WHERE 
        b.notified = 0 
        AND ps.startDate = CAST(DATEADD(DAY, 3, GETDATE()) AS DATE)
    `;
    const result = await pool.request().query(query);
    return result.recordset;  // Return the result of the query
  }

  // Mark a booking as notified
  static async markAsNotified(bookingID) {
    const pool = await sql.connect(dbConfig);
    const query = `
      UPDATE dbo.Booking
      SET notified = 1
      WHERE bookingID = @bookingID
    `;
    await pool.request().input("bookingID", sql.Int, bookingID).query(query);
  }
}

module.exports = Booking;
