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

Item.create = (newItem, result) => {
  sql.query("INSERT INTO item SET ?", newItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created item: ", { id: res.insertId, ...newItem });
    result(null, { id: res.insertId, ...newItem });
  });
};

Item.update = (itemId, updatedItem, result) => {
  sql.query(
    `UPDATE item SET content = ?, position = ?, updated_at = ? WHERE id = ${itemId}`,
    [updatedItem.content, updatedItem.position, updatedItem.updated_at],
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

      console.log(`itemId ${itemId} was updated`);
      result(null, { updatedId: itemId });
      return;
    }
  );
};

Item.delete = (itemId, result) => {
  sql.query(`DELETE FROM item WHERE id = ${itemId}`, (err, res) => {
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

    console.log(`itemId ${itemId} was deleted`);
    result(null, { deletedId: itemId });
    return;
  });
};

module.exports = Item;