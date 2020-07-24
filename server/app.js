const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const PORT = 3000;

const router = require("./routes");

const setHeader = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  next();
};

app.use(setHeader);
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
