import Header from "../Header/Header.js";
import Main from "../Main/Main.js";

export default class App {
  constructor(target) {
    this.target = target;
    this.main = new Main({ target });
    this.header = new Header({ target });
  }
}
