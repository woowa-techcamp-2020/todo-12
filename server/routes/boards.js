const express = require("express");
const boardController = require("../controller/board.js");

const router = express.Router();

router.get("", boardController.findAll);
router.post("", boardController.create);
router.get("/:boardId", boardController.findOne);
router.put("/:boardId", boardController.update);
router.delete("/:boardId", boardController.delete);

module.exports = router;
