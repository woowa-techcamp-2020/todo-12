const express = require("express");
const userController = require("./controller/userController.js");
const boardController = require("./controller/boardController.js");
const listController = require("./controller/listController.js");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));

// user
app.get("/users", userController.findAll);
app.post("/users", userController.create);
app.get("/users/:userId", userController.findOne);
app.delete("/users/:userId", userController.delete);

// board
app.post("/boards", boardController.create);
app.get("/boards/:boardId", boardController.findOne);
app.delete("/boards/:boardId", boardController.delete);

// list
app.post("/lists", listController.create);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
