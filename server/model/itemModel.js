const sql = require("../db.js");

// constructor
const Item = function (item) {
  this.content = item.content;
  this.position = item.position;
  this.created_at = item.created_at;
  this.updated_at = item.updated_at;
  this.list_id = item.list_id;
  this.performer_id = item.performer_id;
};

module.exports = Item;