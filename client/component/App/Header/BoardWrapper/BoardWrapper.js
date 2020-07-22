import BoardSelection from "./BoardSelection/BoardSelection.js";
import BoardSelected from "./BoardSelected/BoardSelected.js";

export default class BoardWrapper {
  constructor({ target }) {
    const boardWrapper = document.createElement("div");
    boardWrapper.className = "board-wrapper";
    target.appendChild(boardWrapper);

    this.boardWrapper = boardWrapper;
    this.boardSelection = new BoardSelection({ target: boardWrapper });
    this.boardSelected = new BoardSelected({ target: boardWrapper });
  }
}
