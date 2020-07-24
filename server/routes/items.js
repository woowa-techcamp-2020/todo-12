const express = require("express");
const itemController = require("../controller/item.js");

const router = express.Router();

router.post("", itemController.create);
router.put("/:itemId/content", itemController.updateContent);
router.patch("/:itemId/position", itemController.updatePosition);
router.delete("/:itemId", itemController.delete);

module.exports = router;
