// require("dotenv").config();
// const express = require("express");
// const sql = require("mssql");
// const dbConfig = require("./dbConfig"); // import dbConfig
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authMiddleware = require("./middlewares/authMiddleware");
// const { createCheckoutSession } = require("./controllers/checkoutController");
// const customerController = require("./controllers/customerController");
// const childController = require("./controllers/childController");

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Stripe Checkout Route (No Authentication Required)
// app.post("/create-checkout-session", createCheckoutSession);

// // Customer Routes (Require Authentication)
// app.get("/customers/:id", authMiddleware, customerController.getCustomerById);
// app.post("/customers", authMiddleware, customerController.createCustomer);
// app.put("/customers/:id", authMiddleware, customerController.updateCustomer);
// app.delete("/customers/:id", authMiddleware, customerController.deleteCustomer);

// // Child Routes (Require Authentication)
// app.get(
//   "/children/customer/:customerID",
//   authMiddleware,
//   childController.getChildrenByCustomerID
// );
// app.post("/children", authMiddleware, childController.createChild);
// app.put("/children/:id", authMiddleware, childController.updateChild);
// app.delete("/children/:id", authMiddleware, childController.deleteChild);

// // Start server and connect to the database
// app.listen(port, async () => {
//   try {
//     await sql.connect(dbConfig);
//     console.log("Database connection established successfully");
//   } catch (err) {
//     console.error("Database connection error:", err);
//     process.exit(1); // Exit with code 1 indicating an error
//   }

//   console.log(`Server listening on port ${port}`);
// });

// // Close the connection pool on SIGINT signal
// process.on("SIGINT", async () => {
//   console.log("Server is gracefully shutting down");
//   await sql.close();
//   console.log("Database connection closed");
//   process.exit(0); // Exit with code 0 indicating successful shutdown
// });
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = 3000;

// Middleware to allow CORS
app.use(cors());
app.use(express.json());

// Log the email user and password (for debugging)
console.log("Email User:", process.env.GMAIL_USER);
console.log("Email Pass:", process.env.GMAIL_PASS);

// Check if email credentials are set
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("Email credentials are not set in the environment variables.");
    process.exit(1);
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Define the route to send notifications
app.post('/send-notification', async (req, res) => {
    const { to, subject, message } = req.body;

    // Validate incoming email parameters
    if (!to || !subject || !message) {
        return res.status(400).json({ message: 'Please provide to, subject, and message fields.' });
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        // Send the email using Nodemailer
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${subject}`);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email!', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
