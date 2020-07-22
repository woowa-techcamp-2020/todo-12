const sql = require("../db.js");

const List = function (list) {
  this.title = list.title;
  this.position = list.position;
  this.created_at = list.created_at;
  this.updated_at = list.updated_at;
  this.board_id = list.board_id;
};

module.exports = List;
