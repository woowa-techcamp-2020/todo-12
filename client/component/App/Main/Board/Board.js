import List from "./List/List.js";

export default class Board {
  constructor({ target }) {
    const board = document.createElement("section");
    board.className = "board";
    target.appendChild(board);
    this.board = board;
    this.data = [];
  }

  setState(lists) {
    lists.forEach((list) => {
      console.log(list);
      if (list.list_id) {
        const listI = new List({ target: this.board });
        listI.setState(list.items);
        this.data.push(list);
      }
    });
    // console.log(this.data);
  }
}
