import List from "./List/List.js";

export default class Board {
  constructor({ target }) {
    const board = document.createElement("section");
    board.className = "board";
    target.appendChild(board);
    this.board = board;
    this.data = null;
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    const { lists } = this.data;
    if (lists.length) {
      lists.forEach((list) => {
        if (list.list_id) {
          const listI = new List({ target: this.board });
          listI.setState({ ...list, board_id: this.data.board_id });
        }
      });
    }
  }
}
