const sql = require("../db.js");

// constructor
const Board = function (board) {
  this.name = board.name;
  this.userId = board.userID;
};

Board.create = (newBoard, result) => {
  const currentTime = new Date();
  const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);
  sql.query(
    "INSERT INTO boards SET name = ?, created_at = ?, updated_at = ?, user_id = ?",
    [newBoard.name, timestamp, timestamp, newBoard.userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created board: ", { id: res.insertId, ...newBoard });
      result(null, { id: res.insertId, ...newBoard });
    }
  );
};

module.exports = Board;
