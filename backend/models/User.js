const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
  constructor(
    userID,
    userName,
    email,
    password,
    contactNumber,
    preferredLunch
  ) {
    this.userID = userID;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.preferredLunch = preferredLunch;
  }

  // Fetch a user by ID
  static async getUserById(userID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("userID", sql.Int, userID)
      .query("SELECT * FROM endUser WHERE userID = @userID");
    return result.recordset[0];
  }

  // Create a new user
  static async createUser(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("userName", sql.VarChar, data.userName)
      .input("email", sql.VarChar, data.email)
      .input("password", sql.VarChar, data.password)
      .input("contactNumber", sql.VarChar, data.contactNumber)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .query(`INSERT INTO endUser (userName, email, password, contactNumber, preferredLunch)
              VALUES (@userName, @email, @password, @contactNumber, @preferredLunch);
              SELECT SCOPE_IDENTITY() AS userID;`);
    return result.recordset[0].userID;
  }

  // Update a user's preferred lunch option
  static async updateUser(userID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userID", sql.Int, userID)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .query(
        `UPDATE endUser SET preferredLunch = @preferredLunch WHERE userID = @userID`
      );
  }

  // Delete a user by ID
  static async deleteUser(userID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userID", sql.Int, userID)
      .query("DELETE FROM endUser WHERE userID = @userID");
  }
}

module.exports = User;
