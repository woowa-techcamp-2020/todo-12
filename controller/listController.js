const List = require("../model/listModel.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  // Create a List
  const list = new List({
    title: req.body.title,
    position: req.body.position,
    created_at: timestamp,
    updated_at: timestamp,
    board_id: req.body.board_id,
  });

  // Save List in the database
  List.create(list, (err, data) => {
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
  List.delete(req.params.listId, (err, data) => {
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
