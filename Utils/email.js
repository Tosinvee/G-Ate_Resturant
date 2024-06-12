const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendEmail(payload) {
  const mailOptions = {
    from: payload.sender ? payload.sender : process.env.EMAIL, // Sender's email address
    to: payload.email, // Recipient's email address
    subject: payload.subject, // Subject of the email
    html: payload.html, // HTML body content
  };

  try {
    let info = await transporter.sendMail(mailOptions); // Send the email
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

module.exports = sendEmail;
