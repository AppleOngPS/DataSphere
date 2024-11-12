import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Log the current working directory and list files
console.log("Current working directory:", process.cwd());
console.log("Files in current directory:");
fs.readdirSync(process.cwd()).forEach(file => {
    console.log(file);
});

// Create an Express application
const app = express();
const PORT = 3000;

// Middleware to allow CORS
app.use(cors());
app.use(express.json());

// Log the email user and password
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

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${subject}`);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email!', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

