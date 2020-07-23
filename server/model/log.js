const sql = require("../db.js");
const BaseModel = require("./base.js");

class Log extends BaseModel {
    constructor(log) {
      super();
      this.target_type = log.target_type;
      this.action = log.action;
      this.target_title = log.target_title;
      this.target_title_updated = log.target_title_updated || null;
      this.from_list = log.from_list || null;
      this.to_list = log.to_list || null;
      this.board_id = log.board_id;
      this.performer_id = log.performer_id;
    }

    static getAll(boardId, result) {
        sql.query(`SELECT * FROM log WHERE board_id = ${boardId}`, (err, res) => {
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

}

module.exports = Log;