import UserWrapper from "./UserWrapper/UserWrapper.js";
import BoardWrapper from "./BoardWrapper/BoardWrapper.js";

export default class Header {
  constructor({ target }) {
    const header = document.createElement("header");
    header.innerHTML = `
      <div class="col">To Do</div>  
      <div class="col selection"></div>
    `;
    const selection = header.querySelector(".selection");

    this.header = header;
    this.userWrapper = new UserWrapper({ target: selection });
    this.boardWrapper = new BoardWrapper({ target: selection });

    target.appendChild(header);
  }
}
