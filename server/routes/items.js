const express = require("express");
const itemController = require("../controller/item.js");

const router = express.Router();

router.post("", itemController.create);
router.put("/:itemId", itemController.update);
router.delete("/:itemId", itemController.delete);

module.exports = router;
