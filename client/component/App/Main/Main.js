import Board from "./Board/Board.js";
import { api } from "../../../api.js";

export default class Main {
  constructor({ target }) {
    const main = document.createElement("main");
    target.appendChild(main);
    this.main = main;
    this.data = null;
    this.board = new Board({ target: main });
  }

  setState(boardId) {
    this.fetchBoard(boardId);
    // this.render()
  }

  async fetchBoard(boardId) {
    try {
      await api.get.board(boardId).then((data) => {
        this.data = data;
      });
    } catch {}
  }
}
