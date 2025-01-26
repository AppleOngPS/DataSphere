require('dotenv').config();  // Load environment variables from .env file

const nodemailer = require("nodemailer");
const ProgrammeCard = require("../models/ProgrammeCard");
const { getAllEmail } = require('../models/ProgrammeCard');  // Assuming getAllEmail is in ProgrammeCard model

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
    throw new Error("Failed to send email");
  }
};

// Controller functions
const getAllCardsByProgramId = async (req, res) => {
  try {
    const cards = await ProgrammeCard.getCardsByProgramId(req.params.programID);
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme cards" });
  }
};

const getAllProgrammeCards = async (req, res) => {
  try {
    const programmeCards = await ProgrammeCard.getAllProgrammeCards();
    res.json(programmeCards); // Respond with the retrieved records
  } catch (error) {
    console.error("Error retrieving programme cards:", error);
    res.status(500).json({ message: "Error retrieving programme cards" });
  }
};

const getProgrammeCardById = async (req, res) => {
  try {
    const card = await ProgrammeCard.getProgrammeCardById(req.params.cardID);
    if (!card)
      return res.status(404).json({ message: "Programme card not found" });
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme card" });
  }
};

const createProgrammeCard = async (req, res) => {
  try {
    // Create a new ProgrammeCard
    const card = await ProgrammeCard.createProgrammeCard(req.body);
    
    // Prepare email content for the new card
    const subject = `New Programme: ${req.body.cardName}`;
    const text = `
    Dear Valued Customer,

    We’re excited to announce the launch of our new program: ${req.body.cardName}.

    Here are the details:
    Program ID: ${req.body.programID}
    Price: $${req.body.programPrice}
    Class Size: ${req.body.classSize}
    Duration: ${req.body.duration}
    Description: ${req.body.description}

    Thank you for using our service!

    Best Regards,
    The Team
    `;

    // Fetch all subscribed email addresses (subscribe = 1)
    const emailAddresses = await getAllEmail(); // This will now return only subscribed users

    // Loop through all email addresses and send the email to each
    for (let subscriber of emailAddresses) {
      const recipientEmail = subscriber.email;

      await sendEmail(recipientEmail, subject, text);
    }

    // Respond with a success message
    res.status(201).json({
      cardID: card.cardID,
      message: "Programme card created successfully and email sent to all subscribed users.",
    });
  } catch (error) {
    console.error("Error creating programme card:", error);
    res.status(500).json({ message: `Error creating programme card: ${error.message}` });
  }
};

const updateProgrammeCard = async (req, res) => {
  const { cardID } = req.params;  
  const updatedData = req.body;  

  console.log("Updating cardID:", cardID); 
  console.log("Updated data:", updatedData);  

  // Validation - Ensure the required fields are present
  if (!updatedData.cardName || !updatedData.programPrice || !updatedData.duration || !updatedData.classSize) {
    return res.status(400).json({ message: "Required fields are missing: cardName, programPrice, duration, classSize" });
  }

  try {
    // Call the model function to update the ProgrammeCard
    await ProgrammeCard.updateProgrammeCard(cardID, updatedData);

    // Prepare email content
    const subject = `Update Programme: ${updatedData.cardName}`;
    const text = `
    Dear Valued Customer,

    We are pleased to inform you that our programme has been updated: ${updatedData.cardName}.
    The following programme card has been updated:

    Program Price: ${updatedData.programPrice}
    Duration: ${updatedData.duration}
    Class Size: ${updatedData.classSize}
    Description: ${updatedData.description}

    Thank you for using our service!

    Best Regards,
    The Team
    `;

    // Fetch all subscribed email addresses (subscribe = 1)
    const emailAddresses = await getAllEmail();  // This will now return only subscribed users

    // Loop through all email addresses and send the email to each
    for (let subscriber of emailAddresses) {
      const recipientEmail = subscriber.email;

      await sendEmail(recipientEmail, subject, text);
    }

    // Send success response after updating the database and sending the email
    res.status(200).json({ message: "Programme card updated successfully and email sent to all subscribed users." });
  } catch (error) {
    console.error('Error updating programme card:', error);
    res.status(500).json({ message: "Error updating programme card", error: error.message });
  }
};

const deleteProgrammeCard = async (req, res) => {
  const cardID = req.params.cardID;  // Get cardID from the URL parameter

  try {
    const result = await ProgrammeCard.deleteProgrammeCard(cardID);

    // Send success response
    res.json(result);
  } catch (error) {
    console.error("Error deleting programme card and related records:", error);
    res.status(500).json({ message: "Error deleting programme card", error: error.message });
  }
};

module.exports = {
  getAllCardsByProgramId,
  getProgrammeCardById,
  getAllProgrammeCards,
  createProgrammeCard,
  updateProgrammeCard,
  deleteProgrammeCard,
};
