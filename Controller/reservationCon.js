const reservationService = require("../Service/service");

async function reservation(req, res, next) {
  try {
    const { name, no_of_people, date, phonenumber, email } = req.body;
    await reservationService.createReservation({
      name,
      no_of_people,
      date,
      phonenumber,
      email,
    });
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
    console.error("Error occurred during reservation:", error);
    next(error);
  }
}

async function getAllReservations(req, res, next) {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error occurred while retrieving reservations:", error);
    next(error);
  }
}

module.exports = { reservation, getAllReservations };
