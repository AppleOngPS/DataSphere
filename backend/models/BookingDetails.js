const sql = require("mssql");
const dbConfig = require("../dbConfig");

class BookingDetails {
  constructor(bookingDetailsID, bookingID, childID, pricePerChild) {
    this.bookingDetailsID = bookingDetailsID;
    this.bookingID = bookingID;
    this.childID = childID;
    this.pricePerChild = pricePerChild;
  }
  // ✅ Prevent duplicate child bookings
  static async createBookingDetail(data) {
    const pool = await sql.connect(dbConfig);

    // Check if the child already has a booking under the same bookingID
    const existingDetail = await pool
      .request()
      .input("bookingID", sql.Int, data.bookingID)
      .input("childID", sql.Int, data.childID)
      .query("SELECT * FROM BookingDetails WHERE bookingID = @bookingID AND childID = @childID");

    if (existingDetail.recordset.length > 0) {
      return existingDetail.recordset[0].bookingDetailsID; // Return existing detail ID
    }

    // Insert new booking detail
    const result = await pool
      .request()
      .input("bookingID", sql.Int, data.bookingID)
      .input("childID", sql.Int, data.childID)
      .input("pricePerChild", sql.Decimal(10, 2), data.pricePerChild)
      .query(
        `INSERT INTO BookingDetails (bookingID, childID, pricePerChild)
         VALUES (@bookingID, @childID, @pricePerChild);
         SELECT SCOPE_IDENTITY() AS bookingDetailsID;`
      );

    return result.recordset[0].bookingDetailsID;
  }

  // Get all booking details for a specific booking
  static async getBookingDetailsByBookingID(bookingID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("bookingID", sql.Int, bookingID)
      .query(
        `SELECT bd.*, c.name AS childName, c.school AS childSchool
           FROM BookingDetails bd
           JOIN Child c ON bd.childID = c.childID
           WHERE bd.bookingID = @bookingID`
      );
    return result.recordset;
  }
}

module.exports = BookingDetails;
