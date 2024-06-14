const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const reservationRoute = require("./Routes/userRoute");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));

// console.log(`DB_PORT: ${process.env.DB_PORT}`);
// console.log(`DB_HOST: ${process.env.DB_HOST}`);
// console.log(`DB_PROTOCOL: ${process.env.DB_PROTOCOL}`);
// console.log(`DATABASENAME: ${process.env.DATABASENAME}`);

// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("HELLO TOSIN");
});

app.use("/api", reservationRoute);

port = 3030;
app.listen(port, () => console.log(`server listening on  ${port}`));
