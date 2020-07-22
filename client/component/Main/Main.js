import Board from "../Board/Board.js";

export default class Main {
  constructor({ target }) {
    const main = document.createElement("main");
    target.appendChild(main);

    this.main = main;
    this.board = new Board({ target: main });
  }
}
