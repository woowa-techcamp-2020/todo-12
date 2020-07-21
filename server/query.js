const sql = require("./db.js");

exports.create = (table, newObj, result) => {
  sql.query(`INSERT INTO ${table} SET ?`, newObj, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`created ${table}: `, { id: res.insertId, ...newObj });
    result(null, { id: res.insertId, ...newObj });
  });
};
