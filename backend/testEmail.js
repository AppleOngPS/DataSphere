require("dotenv").config(); // Load environment variables
const nodemailer = require("nodemailer");

// Ensure environment variables are loaded
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER; // Use EMAIL_USER if EMAIL_FROM is missing
const TEST_RECIPIENT = "jaydentohxm@gmail.com"; // Replace with your test email

if (!EMAIL_USER || !EMAIL_PASSWORD) {
  console.error("Missing EMAIL_USER or EMAIL_PASSWORD in .env file.");
  process.exit(1); // Exit if credentials are missing
}

const transporter = nodemailer.createTransport({
  service: "gmail", // Change if using another provider
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: EMAIL_FROM,
  to: TEST_RECIPIENT,
  subject: "Nodemailer Test",
  text: "This is a test email to verify EMAIL_USER and EMAIL_PASSWORD.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});
