import UserWrapper from "./UserWrapper/UserWrapper.js";
import BoardWrapper from "./BoardWrapper/BoardWrapper.js";
import Log from "./Log/Log.js";

export default class Header {
  constructor({ target, boardId }) {
    const header = document.createElement("header");
    header.innerHTML = `
      <div class="col">To Do</div>  
      <div class="col selection">
      </div>
      <div class="menu">MENU</div>
    `;
    const selection = header.querySelector(".selection");

    this.header = header;
    this.userWrapper = new UserWrapper({ target: selection });
    this.boardWrapper = new BoardWrapper({ target: selection });
    this.log = new Log({ target: header, boardId });
    this.boardId = boardId;

    target.appendChild(header);
  }

  setState(boardId) {
    this.boardId = boardId;
    this.log.fetchLog(boardId);
  }

}
