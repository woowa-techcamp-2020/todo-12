const sql = require("../db.js");
const BaseModel = require("./base.js");

class User extends BaseModel {
  constructor(user) {
    super();
    this.name = user.name;
    this.avatar = user.avatar || null;
  }

  static getAll(result) {
    sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("all users: ", res);
      result(null, res);
    });
  }

  static findById(userId, result) {
    sql.query(
      `
      SELECT u.id as user_id, u.name as user_name, b.id as board_id, b.name as board_name
      FROM user u LEFT JOIN board b ON u.id = b.user_id WHERE u.id = ${userId}
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

module.exports = User;
