const Item = require("../model/item.js");
const Log = require("../model/log.js");

exports.create = async (req, res) => {
  const {
    content,
    position,
    board_id,
    list_id,
    performer_id,
    from_list,
  } = req.body;
  const itemData = {
    content,
    position,
    list_id,
    performer_id,
  };
  const insertedItem = await Item.create("item", itemData);
  const logData = {
    target_type: "item",
    action: "add",
    target_title: content,
    from_list,
    board_id,
    performer_id,
  };
  const insertedLog = await Log.create("log", logData);
  res.send({ insertedItem, insertedLog });
};

exports.update = async (req, res) => {
  const {
    content,
    position,
    list_id,
    performer_id,
    new_content,
    from_list,
    to_list,
    board_id,
  } = req.body;
  const itemData = {
    content: new_content,
    position,
    list_id,
    performer_id,
  };
  const logData = {
    target_type: "item",
    action: "update",
    target_title: content,
    target_title_updated: new_content,
    from_list,
    to_list,
    board_id,
    performer_id,
  };

  const updatedItem = await Item.update("item", req.params.itemId, itemData);
  const insertedLog = await Log.create("log", logData);
  res.send({ updatedItem, insertedLog });
};

exports.delete = (req, res) => {
  const item = new Item({
    content: req.body.content,
    list_id: req.body.list_id,
  });
  Item.delete("item", req.params.itemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Item with id " + req.params.itemId,
        });
      }
    } else {
      const log = new Log({
        target_type: "item",
        action: "remove",
        target_title: item.content,
        from_list: "이전 아이템 list", //item.list_id
      });

      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Log.",
          });
      });
      res.send(data);
    }
  });
};
