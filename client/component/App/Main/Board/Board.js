export default class Board {
  constructor({ target }) {
    const board = document.createElement("section");
    board.className = "board";
    target.appendChild(board);
    this.board = board;
    this.data = [];
  }

  setState(data) {
    data.forEach((elem) => {
      if (elem.list_id) {
        this.data.push(elem);
      }
    });
    // console.log(this.data)
  }
}
