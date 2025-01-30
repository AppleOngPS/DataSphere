const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendConfirmationEmail = async (email, bookingId, roomUrl) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Your Coaching Session Confirmation",
    html: `
      <h2>Booking Confirmed!</h2>
      <p><strong>Session Link:</strong></p>
      <a href="${
        process.env.FRONTEND_URL
      }/video/${bookingId}?email=${encodeURIComponent(email)}">
        Join Coaching Session
      </a>
      <p>Or use this direct video link: ${roomUrl}</p>
    `,
  };

  await sgMail.send(msg);
};
