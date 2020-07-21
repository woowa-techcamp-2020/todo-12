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

exports.delete = (table, id, result) => {
  sql.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, res) => {
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

    console.log(`${table} id: ${id} was deleted`);
    result(null, { deletedId: id });
    return;
  });
};
