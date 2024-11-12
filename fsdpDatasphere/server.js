require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { Webhook } = require('svix');
const cors = require('cors'); // Import CORS
const dbConfig = require('./dbConfig'); // Ensure dbConfig is properly configured

const app = express();

// Enable CORS for your frontend URL
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL if needed

// Establish SQL Server connection
async function connectToDatabase() {
  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw err; // Re-throw the error to halt further execution if DB connection fails
  }
}

let poolPromise;

// Initialize the database connection
connectToDatabase().then(pool => {
  poolPromise = pool; // Store pool in a global variable
}).catch(err => {
  // Handle any issues in DB connection
  console.error('Exiting application due to database connection failure', err.message);
  process.exit(1); // Exit the application if DB connection fails
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for handling webhooks
app.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  console.log('Received webhook at /api/webhooks');
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body.toString());

  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    // Verify the webhook signature using the Clerk Webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY); // Ensure the secret key is loaded from the .env file
    const evt = wh.verify(payloadString, svixHeaders);

    console.log('Verified Event:', evt); // Log the verified event data

    const { id, first_name, last_name } = evt.data;

    if (evt.type === 'user.created') {
      // Process the user-created event
      console.log(`New user created: ${first_name} ${last_name}`);
      
      if (poolPromise) {
        const pool = await poolPromise;
        const request = pool.request();

        await request
          .input('clerkUserId', sql.VarChar, id)
          .input('firstName', sql.VarChar, first_name)
          .input('lastName', sql.VarChar, last_name)
          .query(`
            INSERT INTO Users (clerkUserId, firstName, lastName) 
            VALUES (@clerkUserId, @firstName, @lastName)
          `);

        console.log('User created in SQL Server');
      } else {
        throw new Error('Database connection not available');
      }
    }

    // Respond to the webhook with a success message
    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (err) {
    console.error('Error handling webhook:', err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Set up the server to listen on the specified port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = poolPromise; // Export the poolPromise for use in other modules



