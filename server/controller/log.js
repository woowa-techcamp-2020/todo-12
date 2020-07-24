const Log = require("../model/log.js");

exports.findAll = (req, res) => {
    Log.getAll(req.params.boardId, (err, data) => {
      // 첫번째 매개변수로 board_id
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Logs.",
        });
      else res.send(data);
    });
  };
