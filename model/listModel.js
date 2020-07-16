const sql = require("../db.js");

const List = function (list) {
  this.title = list.title;
  this.position = list.position;
  this.created_at = list.created_at;
  this.updated_at = list.updated_at;
  this.board_id = list.board_id;
};

List.create = (newList, result) => {
  sql.query("INSERT INTO lists SET ?", newList, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created list: ", { id: res.insertId, ...newList });
    result(null, { id: res.insertId, ...newList });
  });
};

List.delete = (listId, result) => {
  sql.query(`DELETE FROM lists WHERE id = ${listId}`, (err, res) => {
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

    console.log(`listId ${listId} was deleted`);
    result(null, { deletedId: listId });
    return;
  });
};

module.exports = List;
