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

  addList(e) {
    e.stopPropagation();
  }

  render() {
    this.board.innerHTML = `
      <div class="list-add">
        <span>+</span>
        <span>클릭하세요!</span>
      </div>`;

    const listAdd = this.board.querySelector(".list-add");
    if (this.data.lists.length >= 4 || !this.data) {
      listAdd.classList.add("hide");
    } else {
      listAdd.classList.remove("hide");
    }

    listAdd.addEventListener("click", this.addList.bind(this));

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
