exports.parser = (data) => {
  if (data.length === 0) return;
  result = {};
  let lastList = {};
  result.board_id = data[0]["board_id"];
  result.board_name = data[0]["board_name"];
  result.lists = [];

  for (let idx = 0; idx < data.length; idx++) {
    if (lastList.list_id !== data[idx]["list_id"]) {
      if (Object.keys(lastList).length > 0) {
        result.lists.push(lastList);
        lastList = {};
      }

      lastList = {
        list_id: data[idx]["list_id"],
        list_title: data[idx]["list_title"],
        list_position: data[idx]["list_position"],
        items: [],
      };
    }

    const item = {
      item_id: data[idx]["item_id"],
      item_content: data[idx]["item_content"],
      item_position_in_list: data[idx]["item_position_in_list"],
      item_performer_name: data[idx]["item_performer_name"],
    };

    lastList.items.push(item);
  }
  result.lists.push(lastList);
  // console.log(result);
  return result;
};
