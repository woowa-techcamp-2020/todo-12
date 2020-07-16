const List = require("../model/listModel.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);

  // Create a Customer
  const list = new List({
    title: req.body.title,
    position: req.body.position,
    created_at: timestamp,
    updated_at: timestamp,
    board_id: req.body.position,
  });

  // Save Customer in the database
  List.create(list, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Board.",
      });
    else res.send(data);
  });
};
