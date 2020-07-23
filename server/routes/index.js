const express = require("express");
const router = express.Router();

const userRouter = require("./users.js");
const boardRouter = require("./boards.js");
const listRouter = require("./lists.js");
const itemRouter = require("./items.js");
const logRouter = require("./logs.js")

router.use("/users", userRouter);
router.use("/boards", boardRouter);
router.use("/lists", listRouter);
router.use("/items", itemRouter);
router.use("/logs", logRouter);

module.exports = router;
