const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Membership {
  constructor(membershipID, userID, validityStart, validityEnd, discountRate) {
    this.membershipID = membershipID;
    this.userID = userID;
    this.validityStart = validityStart;
    this.validityEnd = validityEnd;
    this.discountRate = discountRate;
  }

  // ✅ Get Membership by User ID
  static async getByUserId(userID) {
    try {
      console.log("🔍 Checking database for userID:", userID);
  
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query("SELECT * FROM Membership WHERE userID = @userID");
  
      console.log("📌 Query Result:", result.recordset);
  
      if (result.recordset.length === 0) {
        console.log("❌ No membership found for user:", userID);
        return null;
      }
      
      return result.recordset[0];
    } catch (error) {
      console.error("Error in getByUserId:", error);
      throw new Error("Database query failed");
    }
  }
  

  // ✅ Create a Membership
  static async createMembership(userID, validityEnd, discountRate = 0.1) {
    try {
      const pool = await sql.connect(dbConfig);

      // Check if user already has an active membership
      const existingMembership = await pool
        .request()
        .input("userID", sql.Int, userID)
        .query(
          "SELECT * FROM Membership WHERE UserID = @userID AND ValidityEnd > GETDATE()"
        );

      if (existingMembership.recordset.length > 0) {
        throw new Error("User already has an active membership.");
      }

      // Insert new membership
      const result = await pool
        .request()
        .input("userID", sql.Int, userID)
        .input("validityEnd", sql.Date, validityEnd)
        .input("discountRate", sql.Decimal(4, 2), discountRate)
        .query(
          "INSERT INTO Membership (UserID, ValidityStart, ValidityEnd, DiscountRate) VALUES (@userID, GETDATE(), @validityEnd, @discountRate); SELECT SCOPE_IDENTITY() AS MembershipID"
        );

      return result.recordset[0].MembershipID;
    } catch (error) {
      console.error("Error in createMembership:", error);
      throw new Error("Database insert failed");
    }
  }

  // ✅ Update Membership Expiration Date
  static async updateValidity(userID, newValidityEnd) {
    try {
      const pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input("userID", sql.Int, userID)
        .input("newValidityEnd", sql.Date, newValidityEnd)
        .query("UPDATE Membership SET ValidityEnd = @newValidityEnd WHERE UserID = @userID");

      return true;
    } catch (error) {
      console.error("Error in updateValidity:", error);
      throw new Error("Database update failed");
    }
  }

  // ✅ Delete Expired Memberships (Automatic Cleanup)
  static async removeExpiredMemberships() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .query("DELETE FROM Membership WHERE ValidityEnd < GETDATE()");

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error in removeExpiredMemberships:", error);
      throw new Error("Database cleanup failed");
    }
  }
}

module.exports = Membership;
