const { clerkClient } = require("@clerk/express");
const sql = require("mssql");
const dbConfig = require("../dbConfig"); // Import your DB configuration

// This function processes incoming webhooks from Clerk
const handleWebhook = async (req, res) => {
  const { body, headers } = req;

  // Validate webhook signature (Clerk sends a signature in headers)
  const signature = headers["clerk-signature"];
  const secret = process.env.CLERK_WEBHOOK_SECRET; // Secret from Clerk dashboard for webhook validation

  if (!validateSignature(body, signature, secret)) {
    return res.status(400).send("Invalid signature");
  }

  // Handle different types of Clerk webhook events
  switch (body.type) {
    case "user.created":
      await handleUserCreated(body);
      break;
    case "user.updated":
      await handleUserUpdated(body);
      break;
    case "user.deleted":
      await handleUserDeleted(body);
      break;
    default:
      console.log(`Unhandled event type: ${body.type}`);
      break;
  }

  res.status(200).send("Webhook processed");
};

// Handle user creation webhook
const handleUserCreated = async (event) => {
  try {
    const { id, email, firstName, lastName } = event.data;
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("name", sql.VarChar, `${firstName} ${lastName}`)
      .input("email", sql.VarChar, email)
      .query(
        `INSERT INTO Customers (customerID, customerName, email) 
         VALUES (@id, @name, @email)`
      );
    console.log(`User ${id} created and added to database.`);
  } catch (error) {
    console.error("Error processing user creation webhook:", error);
  }
};

// Handle user update webhook
const handleUserUpdated = async (event) => {
  try {
    const { id, email, firstName, lastName } = event.data;
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .input("name", sql.VarChar, `${firstName} ${lastName}`)
      .input("email", sql.VarChar, email)
      .query(
        `UPDATE Customers 
         SET customerName = @name, email = @email 
         WHERE customerID = @id`
      );
    console.log(`User ${id} updated in database.`);
  } catch (error) {
    console.error("Error processing user update webhook:", error);
  }
};

// Handle user deletion webhook
const handleUserDeleted = async (event) => {
  try {
    const { id } = event.data;
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`DELETE FROM Customers WHERE customerID = @id`);
    console.log(`User ${id} deleted from database.`);
  } catch (error) {
    console.error("Error processing user deletion webhook:", error);
  }
};

// Helper function to validate Clerk's webhook signature
const validateSignature = (body, signature, secret) => {
  // Implement webhook signature validation logic here
  return true; // Simplified for now
};

module.exports = { handleWebhook };
