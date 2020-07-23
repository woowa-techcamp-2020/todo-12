const Log = require("../model/log.js");

exports.findAll = (req, res) => {
    Log.getAll(3, (err, data) => {
      // 첫번째 매개변수로 로그인 정보(user_id)
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Logs.",
        });
      else res.send(data);
    });
  };
  