const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ProgrammeCard {
  constructor(
    cardID,
    programID,
    cardName,
    description,
    programPrice,
    originalPrice,
    classSize,
    duration,
    lunchProvided,
    membershipBenefits
  ) {
    this.cardID = cardID;
    this.programID = programID;
    this.cardName = cardName;
    this.description = description;
    this.programPrice = programPrice;
    this.originalPrice = originalPrice;
    this.classSize = classSize;
    this.duration = duration;
    this.lunchProvided = lunchProvided;
    this.membershipBenefits = membershipBenefits;
  }

  // Fetch a ProgrammeCard by ID
  static async getProgrammeCardById(cardID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("cardID", sql.Int, cardID)
      .query("SELECT * FROM ProgrammeCard WHERE cardID = @cardID");
    return result.recordset[0];
  }

  // Fetch all ProgrammeCards for a specific program
  static async getCardsByProgramId(programID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("programID", sql.Int, programID)
      .query("SELECT * FROM ProgrammeCard WHERE programID = @programID");
    return result.recordset;
  }

  // Create a new ProgrammeCard
  static async createProgrammeCard(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("programID", sql.Int, data.programID)
      .input("cardName", sql.VarChar, data.cardName)
      .input("description", sql.VarChar, data.description || null)
      .input("programPrice", sql.Decimal(10, 2), data.programPrice)
      .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
      .input("classSize", sql.VarChar, data.classSize || null)
      .input("duration", sql.VarChar, data.duration)
      .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
      .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
      .query(
        `INSERT INTO ProgrammeCard (programID, cardName, description, programPrice, originalPrice, classSize, duration, lunchProvided, membershipBenefits)
         VALUES (@programID, @cardName, @description, @programPrice, @originalPrice, @classSize, @duration, @lunchProvided, @membershipBenefits);
         SELECT SCOPE_IDENTITY() AS cardID;`
      );
    return result.recordset[0].cardID;
  }

  // Update a ProgrammeCard by ID
  static async updateProgrammeCard(cardID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("cardID", sql.Int, cardID)
      .input("cardName", sql.VarChar, data.cardName)
      .input("description", sql.VarChar, data.description || null)
      .input("programPrice", sql.Decimal(10, 2), data.programPrice)
      .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
      .input("classSize", sql.VarChar, data.classSize || null)
      .input("duration", sql.VarChar, data.duration)
      .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
      .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
      .query(
        `UPDATE ProgrammeCard SET cardName = @cardName, description = @description, programPrice = @programPrice,
         originalPrice = @originalPrice, classSize = @classSize, duration = @duration,
         lunchProvided = @lunchProvided, membershipBenefits = @membershipBenefits
         WHERE cardID = @cardID`
      );
  }

  // Delete a ProgrammeCard by ID
  static async deleteProgrammeCard(cardID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("cardID", sql.Int, cardID)
      .query("DELETE FROM ProgrammeCard WHERE cardID = @cardID");
  }
}

module.exports = ProgrammeCard;
