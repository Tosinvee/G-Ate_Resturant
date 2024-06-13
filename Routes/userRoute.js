const express = require("express");
const {
  reservation,
  getAllReservations,
} = require("../Controller/reservationCon"); // Import the reservation controller

const router = express.Router();

// Define the reservation route
router.post("/reserve", reservation);
router.get("/reservations", getAllReservations);

module.exports = router;
