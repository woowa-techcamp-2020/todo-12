const sql = require("./db.js");

// constructor
const User = function(user) {
  this.name = user.name;
};

User.getAll = result => {
  sql.query("SELECT * FROM USER", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("USER: ", res);
    result(null, res);
  });
};

module.exports = User;