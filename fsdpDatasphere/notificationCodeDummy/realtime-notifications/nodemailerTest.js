// nodemailerTest.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com', // Change to your recipient
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error sending email:', error);
    }
    console.log('Email sent successfully:', info.response);
});
