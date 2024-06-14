const reservationService = require("../Service/reserveService");

async function reservation(req, res) {
  try {
    const { name, no_of_people, date, phonenumber, email } = req.body;
    await reservationService.createReservation({
      name,
      no_of_people,
      date,
      phonenumber,
      email,
    });
    //after the data has been inuted in the database it automatically sends an email
    await reservationService.sendReservationEmails(
      name,
      no_of_people,
      date,
      phonenumber,
      email
    );
    res
      .status(200)
      .json({ message: "Reservation successful and emails sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllReservations(req, res) {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { reservation, getAllReservations };
