// const sql = require("mssql");
// const dbConfig = require("../dbConfig");

// class ProgrammeCard {
//   constructor(
//     cardID,
//     programID,
//     cardName,
//     description,
//     programPrice,
//     originalPrice,
//     classSize,
//     duration,
//     lunchProvided,
//     membershipBenefits
//   ) {
//     this.cardID = cardID;
//     this.programID = programID;
//     this.cardName = cardName;
//     this.description = description;
//     this.programPrice = programPrice;
//     this.originalPrice = originalPrice;
//     this.classSize = classSize;
//     this.duration = duration;
//     this.lunchProvided = lunchProvided;
//     this.membershipBenefits = membershipBenefits;
//   }


// //retreive all ProgrammeCards
// static async getAllProgrammeCards() {
//   const pool = await sql.connect(dbConfig);
//   try {
//     const result = await pool
//       .request()
//       .query("SELECT * FROM ProgrammeCard");
//     return result.recordset; // Return all records
//   } catch (error) {
//     console.error("Error retrieving programme cards:", error);
//     throw new Error("Database query failed");
//   } finally {
//     pool.close(); // Ensure the connection is closed
//   }
// }

//   // Fetch a ProgrammeCard by ID
//   static async getProgrammeCardById(cardID) {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool
//       .request()
//       .input("cardID", sql.Int, cardID)
//       .query("SELECT * FROM ProgrammeCard WHERE cardID = @cardID");
//     return result.recordset[0];
//   }

//   // Fetch all ProgrammeCards for a specific program
//   static async getCardsByProgramId(programID) {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool
//       .request()
//       .input("programID", sql.Int, programID)
//       .query("SELECT * FROM ProgrammeCard WHERE programID = @programID");
//     return result.recordset;
//   }

//   // Create a new ProgrammeCard
//   // Create a new ProgrammeCard
// static async createProgrammeCard(data) {
//   const pool = await sql.connect(dbConfig);
  
//   try {
//     // Check if the programID exists in the Program table
//     const result = await pool
//       .request()
//       .input("programID", sql.Int, data.programID)
//       .query("SELECT COUNT(*) AS count FROM Program WHERE programID = @programID");

//     // If the programID doesn't exist, throw an error
//     if (result.recordset[0].count === 0) {
//       throw new Error(`Program with ID ${data.programID} does not exist.`);
//     }

//     // Proceed with inserting the ProgrammeCard if the programID is valid
//     const insertResult = await pool
//       .request()
//       .input("programID", sql.Int, data.programID)
//       .input("cardName", sql.VarChar, data.cardName)
//       .input("description", sql.VarChar, data.description || null)
//       .input("programPrice", sql.Decimal(10, 2), data.programPrice)
//       .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
//       .input("classSize", sql.VarChar, data.classSize || null)
//       .input("duration", sql.VarChar, data.duration)
//       .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
//       .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
//       .query(
//         `INSERT INTO ProgrammeCard (programID, cardName, description, programPrice, originalPrice, classSize, duration, lunchProvided, membershipBenefits)
//          VALUES (@programID, @cardName, @description, @programPrice, @originalPrice, @classSize, @duration, @lunchProvided, @membershipBenefits);
//          SELECT SCOPE_IDENTITY() AS cardID;`
//       );

//     return insertResult.recordset[0].cardID;
//   } catch (error) {
//     console.error("Error creating programme card:", error);
//     throw new Error(`Error creating programme card: ${error.message}`);
//   }
// }


//   // Update a ProgrammeCard by ID
//   static async updateProgrammeCard(cardID, data) {
//     const pool = await sql.connect(dbConfig);
//     await pool
//       .request()
//       .input("cardID", sql.Int, cardID)
//       .input("cardName", sql.VarChar, data.cardName)
//       .input("description", sql.VarChar, data.description || null)
//       .input("programPrice", sql.Decimal(10, 2), data.programPrice)
//       .input("originalPrice", sql.Decimal(10, 2), data.originalPrice || null)
//       .input("classSize", sql.VarChar, data.classSize || null)
//       .input("duration", sql.VarChar, data.duration)
//       .input("lunchProvided", sql.Bit, data.lunchProvided ? 1 : 0)
//       .input("membershipBenefits", sql.VarChar, data.membershipBenefits || null)
//       .query(
//         `UPDATE ProgrammeCard SET cardName = @cardName, description = @description, programPrice = @programPrice,
//          originalPrice = @originalPrice, classSize = @classSize, duration = @duration,
//          lunchProvided = @lunchProvided, membershipBenefits = @membershipBenefits
//          WHERE cardID = @cardID`
//       );
//   }
  
  
//    // Delete a ProgrammeCard by ID
//    static async deleteProgrammeCard(cardID) {
//     const pool = await sql.connect(dbConfig);
//     const transaction = new sql.Transaction(pool);

//     try {
//       await transaction.begin(); // Begin the transaction

//       const request = new sql.Request(transaction);
//       request.input("cardID", sql.Int, cardID);

//       // Step 1: Delete dependent records in BookingDetails
//       await request.query(`
//         DELETE FROM dbo.BookingDetails
//         WHERE bookingID IN (
//           SELECT bookingID FROM dbo.Booking
//           WHERE scheduleID IN (
//             SELECT scheduleID FROM dbo.ProgramSchedule
//             WHERE cardID = @cardID
//           )
//         );
//       `);

//       // Step 2: Delete records in Booking
//       await request.query(`
//         DELETE FROM dbo.Booking
//         WHERE scheduleID IN (
//           SELECT scheduleID FROM dbo.ProgramSchedule
//           WHERE cardID = @cardID
//         );
//       `);

//       // Step 3: Delete records in ProgramSchedule
//       await request.query(`
//         DELETE FROM dbo.ProgramSchedule
//         WHERE cardID = @cardID;
//       `);

//       // Step 4: Delete the ProgrammeCard itself
//       await request.query(`
//         DELETE FROM dbo.ProgrammeCard
//         WHERE cardID = @cardID;
//       `);

//       // Commit the transaction if all queries succeed
//       await transaction.commit();

//       return { message: "Programme card and related records deleted successfully" };
//     } catch (error) {
//       await transaction.rollback(); // Rollback if any error occurs
//       throw new Error(`Error deleting programme card and related records: ${error.message}`);
//     }
//   }
// }

// module.exports = ProgrammeCard;
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
    membershipBenefits,
    SubscriptionsID,
    Email
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
    this.SubscriptionsID = SubscriptionsID;
    this.Email = Email;
  }

  static async getAllEmail() {
    const pool = await sql.connect(dbConfig);
    try {
      const result = await pool
        .request()
        .query("SELECT * FROM Subscriptions");
      return result.recordset; // Return all records
    } catch (error) {
      console.error("Error retrieving Subscriptions details:", error);
      throw new Error("Database query failed");
    } finally {
      pool.close(); // Ensure the connection is closed
    }
  }



//retreive all ProgrammeCards
static async getAllProgrammeCards() {
  const pool = await sql.connect(dbConfig);
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM ProgrammeCard");
    return result.recordset; // Return all records
  } catch (error) {
    console.error("Error retrieving programme cards:", error);
    throw new Error("Database query failed");
  } finally {
    pool.close(); // Ensure the connection is closed
  }
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
  // Create a new ProgrammeCard
static async createProgrammeCard(data) {
  const pool = await sql.connect(dbConfig);
  
  try {
    // Check if the programID exists in the Program table
    const result = await pool
      .request()
      .input("programID", sql.Int, data.programID)
      .query("SELECT COUNT(*) AS count FROM Program WHERE programID = @programID");

    // If the programID doesn't exist, throw an error
    if (result.recordset[0].count === 0) {
      throw new Error(`Program with ID ${data.programID} does not exist.`);
    }

    // Proceed with inserting the ProgrammeCard if the programID is valid
    const insertResult = await pool
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

    return insertResult.recordset[0].cardID;
  } catch (error) {
    console.error("Error creating programme card:", error);
    throw new Error(`Error creating programme card: ${error.message}`);
  }
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
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin(); // Begin the transaction

      const request = new sql.Request(transaction);
      request.input("cardID", sql.Int, cardID);

      // Step 1: Delete dependent records in BookingDetails
      await request.query(`
        DELETE FROM dbo.BookingDetails
        WHERE bookingID IN (
          SELECT bookingID FROM dbo.Booking
          WHERE scheduleID IN (
            SELECT scheduleID FROM dbo.ProgramSchedule
            WHERE cardID = @cardID
          )
        );
      `);

      // Step 2: Delete records in Booking
      await request.query(`
        DELETE FROM dbo.Booking
        WHERE scheduleID IN (
          SELECT scheduleID FROM dbo.ProgramSchedule
          WHERE cardID = @cardID
        );
      `);

      // Step 3: Delete records in ProgramSchedule
      await request.query(`
        DELETE FROM dbo.ProgramSchedule
        WHERE cardID = @cardID;
      `);

      // Step 4: Delete the ProgrammeCard itself
      await request.query(`
        DELETE FROM dbo.ProgrammeCard
        WHERE cardID = @cardID;
      `);

      // Commit the transaction if all queries succeed
      await transaction.commit();

      return { message: "Programme card and related records deleted successfully" };
    } catch (error) {
      await transaction.rollback(); // Rollback if any error occurs
      throw new Error(`Error deleting programme card and related records: ${error.message}`);
    }
  }
}

module.exports = ProgrammeCard;