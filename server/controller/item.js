const Item = require("../model/item.js");
const Log = require("../model/log.js");
const currentTime = new Date();
const timestamp = currentTime.toISOString().replace("T", " ").slice(0, 19);



exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const item = new Item({
    content: req.body.content,
    position: req.body.position,
    created_at: timestamp,
    updated_at: timestamp,
    board_id: req.body.board_id,
    list_id: req.body.list_id,
    performer_id: req.body.performer_id,
  });

  Item.create("item", item, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    else {

      const log = new Log({
        target_type: "item",
        action: "create",
        target_title: item.content,
        created_at: item.created_at,
        board_id: item.board_id,
        performer_id: 1, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });

      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const item = new Item({
    content: req.body.content,
    position: req.body.position,
    board_id: req.body.board_id,
    list_id: req.body.list_id,
    created_at: timestamp,
    updated_at: timestamp,
    performer_id: req.body.performer_id,
  });

  Item.update("item", req.params.itemId, item, (err, data) => {
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
        target_type: "list",
        action: "update",
        target_title: "이전 아이템 content",
        target_title_updated: item.content,
        from_list: "이전 아이템 list",
        to_list: item.list_id,
        created_at: item.updated_at,
        board_id: item.board_id,
        performer_id: item.performer_id, //로그인 정보로 수정할 것
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });

      res.send(data);
    }
  });
};

exports.delete = (req, res) => {

  const item = new Item({
    content: req.body.content
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
        action: "delete",
        target_title: item.content,
        from_list: "이전 아이템 list",
        created_at: timestamp,
      });
    
      Log.create("log", log, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
          });
      });
      res.send(data);
    }
  });
};
