const express = require("express");
const logController = require("../controller/log.js");

const router = express.Router();

router.get("/:boardId", logController.findAll);

module.exports = router;