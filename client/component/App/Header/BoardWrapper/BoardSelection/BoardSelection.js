export default class BoardSelection {
  constructor({ target }) {
    const boardSelection = document.createElement("div");
    boardSelection.className = "board-selection";
    target.appendChild(boardSelection);
  }
}
