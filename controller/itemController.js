const Item = require("../model/itemModel.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  // Create a Customer
  const item = new Item({
    content: req.body.content,
    position: req.body.position,
    created_at: timestamp,
    updated_at: timestamp,
    list_id: req.body.list_id,
    performer_id: req.body.performer_id,
  });

  // Save Customer in the database
  Item.create(item, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Item.delete(req.params.itemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Item with id " + req.params.itemId,
        });
      }
    } else res.send(data);
  });
};