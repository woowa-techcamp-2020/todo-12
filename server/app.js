const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const userRouter = require("./routes/users.js");
const boardRouter = require("./routes/boards.js");
const listRouter = require("./routes/lists.js");
const itemRouter = require("./routes/items.js");

const app = express();
const PORT = 3000;

const setHeader = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
};

app.use(setHeader);
app.use(logger("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello"));

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/lists", listRouter);
app.use("/items", itemRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
