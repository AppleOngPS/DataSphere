// const Program = require("../models/Program");

// const getAllPrograms = async (req, res) => {
//   try {
//     const programs = await Program.getAllPrograms();
//     res.json(programs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving programs" });
//   }
// };

// const getProgramById = async (req, res) => {
//   try {
//     const program = await Program.getProgramById(req.params.id);
//     if (!program) return res.status(404).json({ message: "Program not found" });
//     res.json(program);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving program" });
//   }
// };

// const createProgram = async (req, res) => {
//   try {
//     const programID = await Program.createProgram(req.body);
//     res.status(201).json({ programID });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating program" });
//   }
// };

// const updateProgram = async (req, res) => {
//   try {
//     await Program.updateProgram(req.params.id, req.body);
//     res.json({ message: "Program updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating program" });
//   }
// };

// const deleteProgram = async (req, res) => {
//   try {
//     await Program.deleteProgram(req.params.id);
//     res.json({ message: "Program deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting program" });
//   }
// };

// module.exports = {
//   getAllPrograms,
//   getProgramById,
//   createProgram,
//   updateProgram,
//   deleteProgram,
// };
require('dotenv').config();  // Load environment variables from .env file

const nodemailer = require("nodemailer");
const Program = require("../models/Program");
const { getAllEmail } = require('../models/ProgrammeCard');  // Assuming getAllEmail is used to fetch email addresses

// Create Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail", // Or any other email service you use
  auth: {
    user: process.env.EMAIL_USER, // Email from .env
    pass: process.env.EMAIL_PASS, // Password from .env
  },
});

// Helper function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email from .env
    to: to, // Recipient email (passed dynamically)
    subject: subject, // Email subject
    text: text, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Helper function to send emails to all subscribers
const sendEmailsToAllSubscribers = async (subject, text) => {
  const emailAddresses = await getAllEmail();

  // Send all emails concurrently
  const emailPromises = emailAddresses.map(subscriber => {
    const recipientEmail = subscriber.email;
    return sendEmail(recipientEmail, subject, text);  // return the promise
  });

  // Use Promise.all to send all emails concurrently
  try {
    await Promise.all(emailPromises);
    console.log("Emails sent to all subscribers!");
  } catch (error) {
    console.error("Error sending emails to some recipients:", error);
  }
};

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.getAllPrograms();
    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programs" });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.getProgramById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving program" });
  }
};

const createProgram = async (req, res) => {
  try {
    const { name, description, imagePath } = req.body;

    // Assuming `Program.createProgram` takes in these properties and returns the programID
    const programID = await Program.createProgram({ name, description, imagePath });

    // Prepare email content for the new program
    const subject = `New Program: ${name}`;
    const text = `
    Dear Valued Customer,

    We are excited to announce the launch of our new program: ${name}.

    Program Details:
    Program ID: ${programID}
    Description: ${description}
    Image Path: ${imagePath}
    
    Thank you for being part of our community!

    Best Regards,
    The Team
    `;

    // Send emails to all subscribers about the new program
    await sendEmailsToAllSubscribers(subject, text);

    res.status(201).json({ programID, message: "Program created successfully and email sent to all subscribers." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating program" });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { name, description, imagePath } = req.body;
    const programID = req.params.id;

    // Assuming `Program.updateProgram` takes in the `id` and the new data to update the program
    await Program.updateProgram(programID, { name, description, imagePath });

    // Prepare email content for the updated program
    const subject = `Updated Program: ${name}`;
    const text = `
    Dear Valued Customer,

    We are pleased to inform you that the program "${name}" has been updated.

    Program Details:
    Program ID: ${programID}
    Description: ${description}
    Image Path: ${imagePath}
    
    Thank you for your continued support!

    Best Regards,
    The Team
    `;

    // Send emails to all subscribers about the program update
    await sendEmailsToAllSubscribers(subject, text);

    res.json({ message: "Program updated successfully and email sent to all subscribers." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating program" });
  }
};

const deleteProgram = async (req, res) => {
  try {
    await Program.deleteProgram(req.params.id);
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting program" });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
