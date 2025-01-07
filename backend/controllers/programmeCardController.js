
require('dotenv').config();  // Load environment variables from .env file

const nodemailer = require("nodemailer");
const ProgrammeCard = require("../models/ProgrammeCard");

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
    // Call the static method to fetch all ProgrammeCards
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
    const cardID = await ProgrammeCard.createProgrammeCard(req.body);
    res.status(201).json({ cardID, message: "Programme card created successfully" });
  } catch (error) {
    console.error("Error creating programme card:", error);
    res.status(500).json({ message: `Error creating programme card: ${error.message}` });
  }
};

const updateProgrammeCard = async (req, res) => {
  const { cardID } = req.params;  // Get cardID from URL params
  const updatedData = req.body;   // Get the updated data from the body of the request

  console.log("Updating cardID:", cardID);  // Debugging: log the cardID to make sure it's correct
  console.log("Updated data:", updatedData);  // Debugging: log the data to make sure it's correct

  // Validation - Ensure the required fields are present
  if (!updatedData.cardName || !updatedData.programPrice || !updatedData.duration || !updatedData.classSize) {
    return res.status(400).json({ message: "Required fields are missing: cardName, programPrice, duration, classSize" });
  }

  try {
    // Call the model function to update the ProgrammeCard
    await ProgrammeCard.updateProgrammeCard(cardID, updatedData);

    // Prepare email content
    const subject = `Programme Card Updated: ${updatedData.cardName}`;
    const text = `
      The following programme card has been updated:

      Card Name: ${updatedData.cardName}
      Program Price: ${updatedData.programPrice}
      Duration: ${updatedData.duration}
      Class Size: ${updatedData.classSize}
      

      Thank you for using our service!
    `;

    // Replace this with dynamic recipient email (e.g., fetched from the database)
    const recipientEmail = "ongapple1@gmail.com";  // Hardcoded email for now

    // Send email to the recipient
    await sendEmail(recipientEmail, subject, text);

    // Send success response after updating the database and sending the email
    res.status(200).json({ message: "Programme card updated successfully and email sent." });
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
