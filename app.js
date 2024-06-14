const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const reservationRoute = require("./Routes/userRoute");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// console.log(`DB_PORT: ${process.env.DB_PORT}`);
// console.log(`DB_HOST: ${process.env.DB_HOST}`);
// console.log(`DB_PROTOCOL: ${process.env.DB_PROTOCOL}`);
// console.log(`DATABASENAME: ${process.env.DATABASENAME}`);

app.get("/", (req, res) => {
  res.send("HELLO TOSIN");
});

app.use("/api", reservationRoute);

port = 3030;
app.listen(port, () => console.log(`server listening on  ${port}`));
