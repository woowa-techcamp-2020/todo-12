import List from "../List/List.js";
import Item from "../Item/Item.js";

export default class {
  constructor(board) {
    this.id = board.board_id;
    this.name = board.board_name;
  }

  render() {
    const board = document.createElement("article");
    board.classList.add("board-icon");
    board.innerHTML = `
      <span>${this.name}</span>
    `;

    board.addEventListener("click", this.getBoardDetail.bind(this));
    return board;
  }

  getBoardDetail() {
    const board = document.querySelector("#board");
    fetch(`http://localhost:3000/boards/${this.id}`)
      .then((res) => res.json())
      .then((data) => {
        const lists = data.lists;
        lists.forEach((list) => {
          const listData = {
            id: list.list_id,
            title: list.list_title,
            position: list.list_position,
            board_id: this.id,
          };
          const listInstance = new List(listData);
          const listNode = listInstance.renderList();
          board.appendChild(listNode);

          const items = list.items;
          if (items.length === 0) return;
          items.forEach((item) => {
            const itemData = {
              id: item.item_id,
              content: item.item_content,
              position: item.item_position_in_list,
              list_id: listData.id,
              performer_id: 1,
              performer_username: "admin",
            };
            const itemInstance = new Item(itemData);
            const itemNode = itemInstance.renderItem();
            const itemContainer = listNode.querySelector(".items");
            itemContainer.insertAdjacentElement("afterbegin", itemNode);
          });
        });
      });
  }
}
