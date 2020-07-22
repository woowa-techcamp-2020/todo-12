const sql = require("../db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.avatar = user.avatar || null;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("all users: ", res);
    result(null, res);
  });
};

User.findById = (userId, result) => {
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

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

User.update = (userId, updatedUser, result) => {
  sql.query(
    `UPDATE user SET ? WHERE id = ${userId}`,
    updatedUser,
    (err, res) => {
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

      console.log(`userId ${userId} was updated`);
      result(null, { updatedId: userId });
      return;
    }
  );
};

User.delete = (userId, result) => {
  sql.query(`DELETE FROM user WHERE id = ${userId}`, (err, res) => {
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

    console.log(`userid ${userId} was deleted`);
    result(null, { deletedId: userId });
    return;
  });
};

module.exports = User;
