import Header from "./Header/Header.js";
import Main from "./Main/Main.js";

export default class App {
  constructor(target) {
    this.app = target;
    this.boardId = 1;
    this.header = new Header({ target: app, boardId: this.boardId });
    this.main = new Main({ target: app });

    this.setState(1);
  }

  setState(selectedBoardId) {
    this.boardId = selectedBoardId;
    this.main.setState(selectedBoardId);
    this.header.setState(selectedBoardId);
  }
}
