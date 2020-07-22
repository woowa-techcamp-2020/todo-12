const Board = require("../model/boardModel.js");
const query = require("../query.js");
const { boardDetailParser } = require("../parser.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  const board = new Board({
    name: req.body.name,
    created_at: timestamp,
    updated_at: timestamp,
    user_id: req.body.user_id, // 로그인 정보로 변경할 것
  });

  query.create("board", board, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Board.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Board.getAll(1, (err, data) => {
    // 첫번째 매개변수로 로그인 정보(user_id)
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Boards.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Board.findById(req.params.boardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Board with id ${req.params.boardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Board with id " + req.params.boardId,
        });
      }
    } else {
      const result = boardDetailParser(data);
      res.send(result);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const board = {
    name: req.body.name,
  };

  query.update("board", req.params.boardId, board, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Board with id ${req.params.boardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Board with id " + req.params.boardId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  query.delete("board", req.params.boardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Board with id ${req.params.boardId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Board with id " + req.params.boardId,
        });
      }
    } else res.send(data);
  });
};
