const BaseModel = require("./base.js");

class Item extends BaseModel {
  constructor(item) {
    super();
    this.content = item.content;
    this.position = item.position;
    this.board_id = item.board_id;
    this.list_id = item.list_id;
    this.performer_id = item.performer_id;
  }
}

module.exports = Item;
