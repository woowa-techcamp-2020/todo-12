export default class BoardWrapper {
  constructor({ target }) {
    const boardWrapper = document.createElement("div");
    boardWrapper.className = "board-wrapper";
    target.appendChild(boardWrapper);
  }
}
