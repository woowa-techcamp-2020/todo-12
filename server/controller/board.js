const Board = require("../model/board.js");
const Log = require("../model/log.js");
const { boardDetailParser } = require("../utils/parser.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const board = new Board({
    name: req.body.name,
    user_id: 1, // 로그인 정보로 변경할 것
  });

  Board.create("board", board, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Board.",
      });
    else {

      const log = new Log({
        target_type: "board",
        action: "add",
        target_title: board.name,
        board_id: data.id,
        performer_id: 1, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });

      res.send(data)
    }
  })

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

  Board.update("board", req.params.boardId, board, (err, data) => {
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
      const log = new Log({
        target_type: "board",
        action: "update",
        target_title: "이전 보드 이름", // 이전 board name 받아올 것
        target_title_updated: board.name,
        board_id: req.params.boardId,
        performer_id: 1, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });
      
      res.send(data)};
  });
};

exports.delete = (req, res) => {
  Board.delete("board", req.params.boardId, (err, data) => {
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
