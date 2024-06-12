const express = require("express");
const { reservation } = require("../Controller/reservationCon"); // Import the reservation controller

const router = express.Router();

// Define the reservation route
router.post("/reserve", reservation);

module.exports = router;
