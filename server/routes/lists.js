const express = require("express");
const listController = require("../controller/listController.js");

const router = express.Router();

router.post("", listController.create);
router.put("/:listId", listController.update);
router.delete("/:listId", listController.delete);

module.exports = router;
