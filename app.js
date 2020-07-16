const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const userController = require("./controller/userController.js");
const boardController = require("./controller/boardController.js");
const listController = require("./controller/listController.js");
const itemController = require("./controller/itemController.js");

const app = express();
const PORT = 3000;

const setHeader = function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
};

app.use(setHeader);
app.use(logger("dev"));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));

// user
app.get("/users", userController.findAll);
app.post("/users", userController.create);
app.get("/users/:userId", userController.findOne);
app.put("/users/:userId", userController.update);
app.delete("/users/:userId", userController.delete);

// board
app.get("/boards", boardController.findAll);
app.post("/boards", boardController.create);
app.get("/boards/:boardId", boardController.findOne);
app.put("/boards/:boardId", boardController.update);
app.delete("/boards/:boardId", boardController.delete);

// list
app.post("/lists", listController.create);
app.delete("/lists/:listId", listController.delete);

// item
app.post("/items", itemController.create);
app.delete("/items/:itemId", itemController.delete);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
