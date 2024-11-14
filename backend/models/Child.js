const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Child {
  constructor(
    childID,
    name,
    school,
    interest,
    learningStyle,
    specialNeeds,
    preferredLunch,
    userID
  ) {
    this.childID = childID;
    this.name = name;
    this.school = school;
    this.interest = interest;
    this.learningStyle = learningStyle;
    this.specialNeeds = specialNeeds;
    this.preferredLunch = preferredLunch;
    this.userID = userID;
  }

  // Fetch children by user ID
  static async getChildrenByUserID(userID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("userID", sql.Int, userID)
      .query("SELECT * FROM Child WHERE userID = @userID");
    return result.recordset;
  }

  // Create a new child
  static async createChild(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", sql.VarChar, data.name)
      .input("school", sql.VarChar, data.school)
      .input("interest", sql.VarChar, data.interest)
      .input("learningStyle", sql.VarChar, data.learningStyle || null)
      .input("specialNeeds", sql.VarChar, data.specialNeeds || null)
      .input("preferredLunch", sql.VarChar, data.preferredLunch)
      .input("userID", sql.Int, data.userID)
      .query(`INSERT INTO Child (name, school, interest, learningStyle, specialNeeds, preferredLunch, userID)
              VALUES (@name, @school, @interest, @learningStyle, @specialNeeds, @preferredLunch, @userID);
              SELECT SCOPE_IDENTITY() AS childID;`);
    return result.recordset[0].childID;
  }

  // Update an existing child's details
  static async updateChild(childID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("childID", sql.Int, childID)
      .input("school", sql.VarChar, data.school)
      .input("interest", sql.VarChar, data.interest)
      .input("learningStyle", sql.VarChar, data.learningStyle || null)
      .input("specialNeeds", sql.VarChar, data.specialNeeds || null)
      .input("preferredLunch", sql.VarChar, data.preferredLunch)
      .query(
        `UPDATE Child SET school = @school, interest = @interest, learningStyle = @learningStyle, 
                specialNeeds = @specialNeeds, preferredLunch = @preferredLunch
         WHERE childID = @childID`
      );
  }

  // Delete a child by ID
  static async deleteChild(childID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("childID", sql.Int, childID)
      .query("DELETE FROM Child WHERE childID = @childID");
  }
}

module.exports = Child;
