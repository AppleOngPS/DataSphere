const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Clerk {
  // Store user in the database if not already stored
  static async storeUserInDB(userId, name, email, role) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("role", sql.VarChar, role).query(`
        IF NOT EXISTS (SELECT 1 FROM endUsers WHERE userId = @userId)
          INSERT INTO endUsers (userId, customerName, email, role) 
          VALUES (@userId, @name, @email, @role);
      `);
  }

  // Update user information in the database
  static async updateUserInDB(userId, name, email, role) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("role", sql.VarChar, role).query(`
        UPDATE endUsers 
        SET customerName = @name, email = @email, role = @role
        WHERE userId = @userId;
      `);
  }

  // Delete user from the database
  static async deleteUserFromDB(userId) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userId", sql.VarChar, userId)
      .query("DELETE FROM endUsers WHERE userId = @userId;");
  }
}

module.exports = Clerk;
