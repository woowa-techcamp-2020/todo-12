export default class BoardSelected {
  constructor({ target }) {
    const boardSelected = document.createElement("div");
    boardSelected.className = "board-selected";
    target.appendChild(boardSelected);
  }
}
