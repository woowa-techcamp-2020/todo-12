const sql = require("../db.js");

// constructor
const Board = function (board) {
  this.name = board.name;
  this.created_at = board.created_at;
  this.updated_at = board.updated_at;
  this.user_id = board.user_id;
};

Board.getAll = (userId, result) => {
  sql.query(`SELECT * FROM boards WHERE user_id = ${userId}`, (err, res) => {
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

    // not found Board with the id
    result({ kind: "not_found" }, null);
  });
};

Board.findById = (boardId, result) => {
  sql.query(
    `SELECT
        b.id as board_id,
        b.name as board_name,
        l.id as list_id,
        l.title as list_title,
        l.position as list_position,
        i.id as item_id,
        i.content as item_content,
        i.position as item_position_in_list,
        u.name as item_performer_name
      FROM boards b
      LEFT JOIN lists l
        ON b.id = l.board_id
      LEFT JOIN items i
        ON l.id = i.list_id
      LEFT JOIN users u
        ON i.performer_id = u.id
      WHERE b.id = ${boardId}
      ORDER BY list_position, item_position_in_list DESC;
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

      // not found Board with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Board;