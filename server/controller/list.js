const List = require("../model/list.js");
const Log = require("../model/log.js");


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const list = new List({
    title: req.body.title,
    position: req.body.position,
    board_id: req.body.board_id,
    performer_id: req.body.performer_id
  });

  List.create("list", list, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the List.",
      });
    else {

      const log = new Log({
        target_type: "list",
        action: "add",
        target_title: list.title,
        board_id: list.board_id,
        performer_id: list.performer_id, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });

      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const list = new List({
    title: req.body.title,
    position: req.body.position,
    board_id: req.body.board_id,
  });

  List.update("list", req.params.listId, list, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found List with id ${req.params.listId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving List with id " + req.params.listId,
        });
      }
    } else {
      const log = new Log({
        target_type: "list",
        action: "update",
        target_title: "이전 리스트 타이틀", // list.title
        target_title_updated: list.title,
        board_id: list.board_id,
        performer_id: 1, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });
      
      res.send(data);
    };
  });
};

exports.delete = (req, res) => {
  List.delete("list", req.params.listId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found List with id ${req.params.listId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving List with id " + req.params.listId,
        });
      }
    } else res.send(data);
  });
};
