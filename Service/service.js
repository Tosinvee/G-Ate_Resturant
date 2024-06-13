const database = require("../Config/database");
const EmailSender = require("../Utils/email");

async function getAllReservations() {
  const db = await database.connect("reservations");
  return db.find().toArray();
}

async function createReservation(reservationData) {
  const { name, no_of_people, date, phonenumber, email } = reservationData;
  const db = await database.connect("reservations");
  await db.insertOne({ name, no_of_people, date, phonenumber, email });
}

async function sendReservationEmails(
  name,
  no_of_people,
  date,
  phonenumber,
  email
) {
  const adminMessage = {
    sender: "admin@example.com",
    email: "admin@example.com",
    subject: "New Reservation",
    html: `<h1>New Reservation</h1>
             <p>Name: ${name}</p>
             <p>Number of People: ${no_of_people}</p>
             <p>Date: ${date}</p>
             <p>Phone Number: ${phonenumber}</p>
             <p>Email: ${email}</p>`,
  };

  const userMessage = {
    sender: "admin@example.com",
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

  await EmailSender(adminMessage);
  await EmailSender(userMessage);
}

module.exports = {
  getAllReservations,
  sendReservationEmails,
  createReservation,
};
