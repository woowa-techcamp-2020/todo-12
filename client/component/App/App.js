import Header from "../Header/Header.js";
import Main from "../Main/Main.js";

export default class App {
  constructor(target) {
    this.app = target;
    this.header = new Header({ target: app });
    this.main = new Main({ target: app });
  }
}
