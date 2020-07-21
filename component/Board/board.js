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
    return board;
  }
}
