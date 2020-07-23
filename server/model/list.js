const BaseModel = require("./base.js");

class List extends BaseModel {
  constructor(list) {
    super();
    this.title = list.title;
    this.position = list.position;
    this.board_id = list.board_id;
    this.created_at = list.created_at;
    this.updated_at = list.updated_at;
  }
}

module.exports = List;
