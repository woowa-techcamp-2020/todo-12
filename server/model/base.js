const sql = require("../db.js");

class BaseModel {
  static async create(table, newObj) {
    try {
      const result = await sql.query(`INSERT INTO ${table} SET ?`, newObj);
      return {
        id: result[0].insertId,
        ...newObj,
      };
    } catch (err) {
      console.error(err.message);
    }
  }

  static delete(table, id, result) {
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
  }

  static update(table, id, newData, result) {
    sql.query(`UPDATE ${table} SET ? WHERE id = ${id}`, newData, (err, res) => {
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

      console.log(`${table} Id : ${id} was updated`);
      result(null, { updatedId: id });
      return;
    });
  }
}

module.exports = BaseModel;
