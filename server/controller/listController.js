const List = require("../model/listModel.js");
const query = require("../query.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  const list = new List({
    title: req.body.title,
    position: req.body.position,
    created_at: timestamp,
    updated_at: timestamp,
    board_id: req.body.board_id,
  });

  query.create("list", list, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the List.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  const list = new List({
    title: req.body.title,
    updated_at: timestamp,
    position: req.body.position,
  });

  List.update(req.params.listId, list, (err, data) => {
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

exports.delete = (req, res) => {
  query.delete("list", req.params.listId, (err, data) => {
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
