const database = require("../Config/database");
const EmailSender = require("../Utils/email");
require("dotenv").config();

async function createReservation(reservationData) {
  const { name, no_of_people, date, phonenumber, email } = reservationData;

  if (!name || !no_of_people || !date || !phonenumber || !email) {
    throw new Error("Validation Error: All fields are required.");
  }

  try {
    const db = await database.connect("reservations");
    await db.insertOne({ name, no_of_people, date, phonenumber, email });
  } catch (error) {
    throw new Error("Database Error: Failed to create reservation.");
  }
}

//To send a reservation email
async function sendReservationEmails(
  name,
  no_of_people,
  date,
  phonenumber,
  email
) {
  try {
    const adminMessage = {
      sender: process.env.EMAIL,
      email: process.env.EMAIL,
      subject: "New Reservation",
      html: `<h1>New Reservation</h1>
             <p>Name: ${name}</p>
             <p>Number of People: ${no_of_people}</p>
             <p>Date: ${date}</p>
             <p>Phone Number: ${phonenumber}</p>
             <p>Email: ${email}</p>`,
    };

    const userMessage = {
      sender: process.env.EMAIL,
      email: email,
      subject: "Reservation Confirmation",
      html: `<h1>Reservation Confirmation</h1>
             <p>Thank you, ${name}, for your reservation.</p>
             <p>Details:</p>
             <p>Number of People: ${no_of_people}</p>
             <p>Date: ${date}</p>
             <p>Phone Number: ${phonenumber}</p>
             <p>Email: ${email}</p>`,
    };
    //The logic in the utils folder are being implemented here
    await EmailSender(adminMessage);
    await EmailSender(userMessage);
  } catch (error) {
    throw new Error("Email Error: Failed to send emails.");
  }
}

async function getAllReservations() {
  try {
    const db = await database.connect("reservations");
    return await db.find().toArray();
  } catch (error) {
    throw new Error("Database Error: Failed to retrieve reservations.");
  }
}

module.exports = {
  createReservation,
  sendReservationEmails,
  getAllReservations,
};
