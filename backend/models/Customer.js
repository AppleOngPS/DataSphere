const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Customer {
  constructor(
    customerID,
    customerName,
    email,
    password,
    contactNumber,
    preferredLunch
  ) {
    this.customerID = customerID;
    this.customerName = customerName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.preferredLunch = preferredLunch;
  }

  static async getCustomerById(customerID) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("customerID", sql.Int, customerID)
      .query("SELECT * FROM Customer WHERE customerID = @customerID");
    return result.recordset[0];
  }

  static async createCustomer(data) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("customerName", sql.VarChar, data.customerName)
      .input("email", sql.VarChar, data.email)
      .input("password", sql.VarChar, data.password)
      .input("contactNumber", sql.VarChar, data.contactNumber)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .query(`INSERT INTO Customer (customerName, email, password, contactNumber, preferredLunch)
              VALUES (@customerName, @email, @password, @contactNumber, @preferredLunch);
              SELECT SCOPE_IDENTITY() AS customerID;`);
    return result.recordset[0].customerID;
  }

  static async updateCustomer(customerID, data) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("customerID", sql.Int, customerID)
      .input("preferredLunch", sql.VarChar, data.preferredLunch || null)
      .query(
        `UPDATE Customer SET preferredLunch = @preferredLunch WHERE customerID = @customerID`
      );
  }

  static async deleteCustomer(customerID) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("customerID", sql.Int, customerID)
      .query("DELETE FROM Customer WHERE customerID = @customerID");
  }
}

module.exports = Customer;
