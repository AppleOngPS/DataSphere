// customerModel.js
const sql = require('mssql');
const dbConfig = require('./dbConfig'); // Using require for CommonJS syntax


const createCustomer = async (customerData) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('customerName', sql.VarChar, customerData.firstName + ' ' + customerData.lastName)
      .input('email', sql.VarChar, customerData.email)
      .input('password', sql.VarChar, customerData.password)
      .input('contactNumber', sql.VarChar, customerData.contactNumber || '')
      .input('preferredLunch', sql.VarChar, customerData.preferredLunch || null)
      .query(`
        INSERT INTO Customer (customerName, email, password, contactNumber, preferredLunch)
        VALUES (@customerName, @email, @password, @contactNumber, @preferredLunch)
      `);
    console.log('Customer created:', result);
  } catch (err) {
    console.error('SQL error:', err.message);
  }
};

module.exports = { createCustomer }; // Export the function using CommonJS syntax
