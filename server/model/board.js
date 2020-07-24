const sql = require("../db.js");
const BaseModel = require("./base.js");

class Board extends BaseModel {
  constructor(board) {
    super();
    this.name = board.name;
    this.user_id = board.user_id;
  }

  static getAll(userId, result) {
    sql.query(`SELECT * FROM board WHERE user_id = ${userId}`, (err, res) => {
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

      result({ kind: "not_found" }, null);
    });
  }

  static findById(boardId, result) {
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
        FROM board b
        LEFT JOIN list l
          ON b.id = l.board_id
        LEFT JOIN item i
          ON l.id = i.list_id
        LEFT JOIN user u
          ON i.performer_id = u.id
        WHERE b.id = ${boardId}
        ORDER BY list_position DESC, item_position_in_list DESC;
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

        result({ kind: "not_found" }, null);
      }
    );
  }
}

module.exports = Board;
