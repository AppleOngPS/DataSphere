class User {
  constructor(
    userID,
    userName,
    email,
    password,
    contactNumber,
    preferredLunch,
    role // Add role to the constructor
  ) {
    this.userID = userID;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.preferredLunch = preferredLunch;
    this.role = role; // Assign role to the instance
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

  // Create a new user with role
  static async createUser(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("userName", sql.VarChar, data.userName)
      .input("email", sql.VarChar, data.email)
      .input("password", sql.VarChar, data.password)
      .input("contactNumber", sql.VarChar, data.contactNumber)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .input("role", sql.VarChar, data.role) // Add role input
      .query(
        `INSERT INTO endUser (userName, email, password, contactNumber, preferredLunch, role)
        VALUES (@userName, @email, @password, @contactNumber, @preferredLunch, @role);
        SELECT SCOPE_IDENTITY() AS userID;`
      );
    return result.recordset[0].userID;
  }

  static async updateUser(userID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userID", sql.Int, userID)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .input("role", sql.VarChar, data.role || null) // Role update logic
      .query(
        `UPDATE endUser SET preferredLunch = @preferredLunch, role = @role WHERE userID = @userID`
      );
  }

  static async deleteUser(userID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userID", sql.Int, userID)
      .query("DELETE FROM endUser WHERE userID = @userID");
  }
}

module.exports = User;
