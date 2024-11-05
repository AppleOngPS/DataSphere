const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Program {
  constructor(programID, name, description, programPrice) {
    this.programID = programID;
    this.name = name;
    this.description = description;
    this.programPrice = programPrice;
  }

  // Get all programs
  static async getAllPrograms() {
    try {
      const connection = await sql.connect(dbConfig);
      const result = await connection
        .request()
        .query("SELECT * FROM dbo.Program");

      return result.recordset.map(
        (row) =>
          new Program(
            row.programID,
            row.name,
            row.description,
            row.programPrice
          )
      );
    } catch (error) {
      throw new Error("Error fetching programs: " + error.message);
    }
  }

  // Get program by ID
  static async getProgramById(programID) {
    try {
      const connection = await sql.connect(dbConfig);
      const result = await connection
        .request()
        .input("programID", sql.Int, programID)
        .query("SELECT * FROM dbo.Program WHERE programID = @programID");

      if (result.recordset.length > 0) {
        const row = result.recordset[0];
        return new Program(
          row.programID,
          row.name,
          row.description,
          row.programPrice
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error fetching program by ID: " + error.message);
    }
  }

  // Create a new program
  static async createProgram(newProgramData) {
    try {
      const connection = await sql.connect(dbConfig);
      const result = await connection
        .request()
        .input("name", sql.VarChar(255), newProgramData.name)
        .input("description", sql.VarChar(255), newProgramData.description)
        .input("programPrice", sql.Decimal(10, 2), newProgramData.programPrice)
        .query(
          "INSERT INTO dbo.Program (name, description, programPrice) OUTPUT INSERTED.programID VALUES (@name, @description, @programPrice)"
        );

      return new Program(
        result.recordset[0].programID,
        newProgramData.name,
        newProgramData.description,
        newProgramData.programPrice
      );
    } catch (error) {
      throw new Error("Error creating program: " + error.message);
    }
  }

  // Update program by ID
  static async updateProgram(programID, updatedProgramData) {
    try {
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("programID", sql.Int, programID)
        .input("name", sql.VarChar(255), updatedProgramData.name)
        .input("description", sql.VarChar(255), updatedProgramData.description)
        .input(
          "programPrice",
          sql.Decimal(10, 2),
          updatedProgramData.programPrice
        )
        .query(
          "UPDATE dbo.Program SET name = @name, description = @description, programPrice = @programPrice WHERE programID = @programID"
        );

      return true;
    } catch (error) {
      throw new Error("Error updating program: " + error.message);
    }
  }

  // Delete program by ID
  static async deleteProgram(programID) {
    try {
      const connection = await sql.connect(dbConfig);
      await connection
        .request()
        .input("programID", sql.Int, programID)
        .query("DELETE FROM dbo.Program WHERE programID = @programID");

      return true;
    } catch (error) {
      throw new Error("Error deleting program: " + error.message);
    }
  }
}

module.exports = Program;
