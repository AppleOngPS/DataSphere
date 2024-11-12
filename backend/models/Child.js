const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Child {
  constructor(childID, name, school, interest, customerID) {
    this.childID = childID;
    this.name = name;
    this.school = school;
    this.interest = interest;
    this.customerID = customerID;
  }

  static async getChildrenByCustomerID(customerID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("customerID", sql.Int, customerID)
      .query("SELECT * FROM Child WHERE customerID = @customerID");
    return result.recordset;
  }

  static async createChild(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", sql.VarChar, data.name)
      .input("school", sql.VarChar, data.school)
      .input("interest", sql.VarChar, data.interest)
      .input("customerID", sql.Int, data.customerID)
      .query(`INSERT INTO Child (name, school, interest, customerID)
              VALUES (@name, @school, @interest, @customerID);
              SELECT SCOPE_IDENTITY() AS childID;`);
    return result.recordset[0].childID;
  }

  static async updateChild(childID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("childID", sql.Int, childID)
      .input("school", sql.VarChar, data.school)
      .input("interest", sql.VarChar, data.interest)
      .query(
        `UPDATE Child SET school = @school, interest = @interest WHERE childID = @childID`
      );
  }

  static async deleteChild(childID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("childID", sql.Int, childID)
      .query("DELETE FROM Child WHERE childID = @childID");
  }
}

module.exports = Child;
