const sql = require("../db.js");

// constructor
const Board = function (board) {
  this.name = board.name;
  this.userId = board.userId;
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

Board.findById = (boardId, result) => {
  sql.query(
    `SELECT
      b.id as board_id,
      l.id as list_id,
      l.title as list_title,
      l.position as list_position,
      i.id as item_id,
      i.content as item_content,
      i.position as item_position_in_list,
      u.name as item_performer_name
    FROM boards b
    INNER JOIN lists l
      ON b.id = l.board_id
        AND b.id = ${boardId}
    INNER JOIN items i
      ON l.id = i.list_id
    INNER JOIN users u
      ON i.performer_id = u.id;
    `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res);
        result(null, res);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Board.delete = (boardId, result) => {
  sql.query(`DELETE FROM boards WHERE id = ${boardId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (!res.affectedRows) {
      console.log("not_found");
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`boardId ${boardId} was deleted`);
    result(null, { deletedId: boardId });
    return;
  });
};

module.exports = Board;
