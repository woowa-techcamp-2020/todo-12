const express = require("express");
const userController = require("../controller/user.js");

const router = express.Router();

router.get("", userController.findAll);
router.post("", userController.create);
router.get("/:userId", userController.findOne);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.delete);

module.exports = router;
