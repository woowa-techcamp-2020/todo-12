const express = require("express");
const userController = require("./controller/userController.js");
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
// app.get('/boards/:boardId', controller)

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
