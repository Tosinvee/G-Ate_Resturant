const database = require("../Config/database"); // Import the connectDB function
const EmailSender = require("../Utils/email"); // Import the EmailSender function

async function reservation(req, res, next) {
  try {
    // Extract reservation details from the request body
    const { name, no_of_people, date, phonenumber, email } = req.body;

    // Get the database connection
    const db = await database.connect("Users");

    // Insert the reservation details into the collection
    await db.insertOne({ name, no_of_people, date, phonenumber, email });

    // Prepare the email message content for the admin
    const adminMessage = {
      sender: "feranmhioluwatosin@gmail.com",
      email: "feranmhioluwatosin@gmail.com",
      subject: "New Reservation",
      html: `<h1>New Reservation</h1>
             <p>Name: ${name}</p>
             <p>Number of People: ${no_of_people}</p>
             <p>Date: ${date}</p>
             <p>Phone Number: ${phonenumber}</p>
             <p>Email: ${email}</p>`,
    };

    // Prepare the email message content for the user
    const userMessage = {
      sender: "admin@example.com", // Admin's email address
      email: email, // User's email address
      subject: "Reservation Confirmation",
      html: `<h1>Reservation Confirmation</h1>
             <p>Thank you, ${name}, for your reservation at G-Ate Resturant</p>
             <p>Details:</p>
             <p>Number of People: ${no_of_people}</p>
             <p>Date: ${date}</p>
             <p>Phone Number: ${phonenumber}</p>
             <p>Email: ${email}</p>`,
    };

    // Send the email to the admin
    await EmailSender(adminMessage);

    // Send the email to the user
    await EmailSender(userMessage);

    // Respond to the client with a success message
    res
      .status(200)
      .json({ message: "Reservation successful and emails sent." });
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during reservation:", error);
    next(error); // Pass the error to the next middleware for error handling
  }
}

module.exports = { reservation };
