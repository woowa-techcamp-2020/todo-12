export default class Board {
  constructor({ target }) {
    const board = document.createElement("section");
    board.className = "board";
    target.appendChild(board);
  }
}
