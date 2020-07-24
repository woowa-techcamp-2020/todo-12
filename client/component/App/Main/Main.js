import Board from "./Board/Board.js";
import { api } from "../../../api.js";

export default class Main {
  constructor({ target }) {
    const main = document.createElement("main");
    target.appendChild(main);
    this.main = main;
    this.board = new Board({ target: main });
  }

  setState(boardId) {
    this.fetchBoard(boardId);
  }


  async fetchBoard(boardId) {
    try {
      await api.get.board(boardId).then((data) => {
        this.board.setState(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }
}
