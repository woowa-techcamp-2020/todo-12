const Item = require("../model/item.js");
const Log = require("../model/log.js");

exports.create = (req, res) => {
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
        action: "add",
        target_title: item.content,
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
    performer_id: req.body.performer_id,
    prev_content: req.body.prev_content,
    from_list: req.body.from_list,
    to_list: req.body.to_list
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
        target_title: req.body.prev_content,
        target_title_updated: item.content,
        from_list: req.body.from_list,
        to_list: req.body.to_list,
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
    content: req.body.content,
    list_id: req.body.list_id
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
            message: err.message || "Some error occurred while creating the Log."
          });
      });
      res.send(data);
    }
  });
};
