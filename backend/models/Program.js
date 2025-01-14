// const sql = require("mssql");
// const dbConfig = require("../dbConfig");

// class Program {
//   constructor(
//     programID,
//     name,
//     description,
//     programPrice,
//     originalPrice,
//     level,
//     duration,
//     lunchProvided,
//     membershipBenefits
//   ) {
//     this.programID = programID;
//     this.name = name;
//     this.description = description;
//     this.programPrice = programPrice;
//     this.originalPrice = originalPrice;
//     this.level = level;
//     this.duration = duration;
//     this.lunchProvided = lunchProvided;
//     this.membershipBenefits = membershipBenefits;
//   }

//   // Fetch a program by ID
//   static async getProgramById(programID) {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool
//       .request()
//       .input("programID", sql.Int, programID)
//       .query("SELECT * FROM Program WHERE programID = @programID");
//     return result.recordset[0];
//   }

//   // Fetch all programs
//   static async getAllPrograms() {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool.request().query("SELECT * FROM Program");
//     return result.recordset;
//   }

//   // Create a new program
//   static async createProgram(data) {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool
//       .request()
//       .input("name", sql.VarChar, data.name)
//       .input("description", sql.VarChar, data.description)
//       .input("programPrice", sql.Decimal(10, 2), data.programPrice)
//       .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
//       .input("level", sql.VarChar, data.level)
//       .input("duration", sql.VarChar, data.duration)
//       .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
//       .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
//       .query(
//         `INSERT INTO Program (name, description, programPrice, originalPrice, level, duration, lunchProvided, membershipBenefits)
//          VALUES (@name, @description, @programPrice, @originalPrice, @level, @duration, @lunchProvided, @membershipBenefits);
//          SELECT SCOPE_IDENTITY() AS programID;`
//       );
//     return result.recordset[0].programID;
//   }

//   // Update a program by ID
//   static async updateProgram(programID, data) {
//     const pool = await sql.connect(dbConfig);
//     await pool
//       .request()
//       .input("programID", sql.Int, programID)
//       .input("name", sql.VarChar, data.name)
//       .input("description", sql.VarChar, data.description)
//       .input("programPrice", sql.Decimal(10, 2), data.programPrice)
//       .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
//       .input("level", sql.VarChar, data.level)
//       .input("duration", sql.VarChar, data.duration)
//       .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
//       .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
//       .query(
//         `UPDATE Program SET name = @name, description = @description, programPrice = @programPrice,
//          originalPrice = @originalPrice, level = @level, duration = @duration,
//          lunchProvided = @lunchProvided, membershipBenefits = @membershipBenefits
//          WHERE programID = @programID`
//       );
//   }

//   // Delete a program by ID
//   static async deleteProgram(programID) {
//     const pool = await sql.connect(dbConfig);
//     await pool
//       .request()
//       .input("programID", sql.Int, programID)
//       .query("DELETE FROM Program WHERE programID = @programID");
//   }
// }

// module.exports = Program;

const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Program {
  constructor(
    programID,
    name,
    description,
    image  ) {
    this.programID = programID;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }

  // Fetch a program by ID
  static async getProgramById(programID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("programID", sql.Int, programID)
      .query("SELECT * FROM Program WHERE programID = @programID");
    return result.recordset[0];
  }

  // Fetch all programs
  static async getAllPrograms() {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Program");
    return result.recordset;
  }

  // Create a new program
  static async createProgram(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", sql.VarChar, data.name)
      .input("description", sql.VarChar, data.description)
      .input("imagePath", sql.VarChar, data.imagePath)
      .query(
        `INSERT INTO Program (name, description, imagePath)
         VALUES (@name, @description,@imagePath);
         SELECT SCOPE_IDENTITY() AS programID;`
      );
    return result.recordset[0].programID;
  }

  // Update a program by ID
  static async updateProgram(programID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("programID", sql.Int, programID)
      .input("name", sql.VarChar, data.name)
      .input("description", sql.VarChar, data.description)
      .input("imagePath", sql.VarChar, data.imagePath)
      .query(
        `UPDATE Program SET name = @name, description = @description, imagePath = @imagePath
         WHERE programID = @programID`
      );
  }

  // Delete a program by ID
  static async deleteProgram(programID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("programID", sql.Int, programID)
      .query("DELETE FROM Program WHERE programID = @programID");
  }
}

module.exports = Program;
