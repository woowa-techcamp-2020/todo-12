const Board = require("../model/boardModel.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const board = new Board({
    // name: req.body.name,
    name: req.body.name,
    userId: 1, // 로그인 정보로 변경할 것
  });

  // Save Customer in the database
  Board.create(board, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Board.",
      });
    else res.send(data);
  });
};
