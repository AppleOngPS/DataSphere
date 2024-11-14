// Clerk.js
const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Clerk {
  // Store user data in the database upon sign-in or sign-up
  static async storeUserInDB(userId, role) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("userId", sql.VarChar, userId)
        .input("role", sql.VarChar, role)
        .query(
          `IF NOT EXISTS (SELECT 1 FROM endUsers WHERE userId = @userId)
            INSERT INTO endUsers (userId, role) VALUES (@userId, @role);`
        );
      return result;
    } catch (err) {
      console.error("Database insert error:", err);
      throw new Error("Database error during user creation");
    }
  }

  // Insert Clerk users into your database (for syncing users)
  static async insertClerkUser(id, name, email) {
    try {
      const pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input("id", sql.VarChar, id)
        .input("name", sql.VarChar, name)
        .input("email", sql.VarChar, email)
        .query(
          `INSERT INTO Customers (customerID, customerName, email) 
          VALUES (@id, @name, @email)`
        );
    } catch (error) {
      console.error("Database error during Clerk user sync:", error);
      throw new Error("Database error during Clerk user sync");
    }
  }
}

module.exports = Clerk;
