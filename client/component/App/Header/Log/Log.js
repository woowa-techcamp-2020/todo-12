import { api } from "../../../../api.js";

export default class Log {
  constructor({ target, boardId }) {
    const log = document.createElement("section");
    log.className = "log";
    target.appendChild(log);
    this.log = log;
    this.data = null;
    this.boardId = boardId;
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  async fetchLog(boardId) {
    try {
      await api.get.log(boardId).then((data) => {
        this.setState(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  

  render() {
    const currEnv = this;
    const logDom = document.querySelector('.log');
    const menuBtn = document.querySelector('.menu');

    menuBtn.addEventListener('click', function(e) {
      currEnv.fetchLog(currEnv.boardId);
      logDom.classList.add('menu-button-clicked');  
      logDom.classList.remove('x-button-clicked');
    });

    const logItems = this.data;
    this.log.innerHTML =  `
    <header class="log-header">
        <div class="x-button">❌</div>
    </header>
    <section class="log-list"></section>
    `
    const xBtn = document.querySelector('.x-button');
    xBtn.addEventListener('click', function(e) {
        logDom.classList.add('x-button-clicked');
        logDom.classList.remove('menu-button-clicked');
    });

    const logList = document.querySelector('.log-list');

    logItems.forEach(item => {
        const {
            ID,
            BOARD_ID,
            PERFORMER_ID,
            TARGET_TYPE,
            ACTION,
            TARGET_TITLE,
            TARGET_TITLE_UPDATED,
            FROM_LIST,
            TO_LIST,
            CREATED_AT,
        } = item;



        let action;
        if(ACTION === 'add') {
            action = '추가하였습니다.';
        } else if(ACTION === 'delete') {
            action = '삭제하였습니다.';
        } else if(ACTION === 'update') {
            action = `<span class="highlight">${TARGET_TITLE_UPDATED.substr(0,10)}</span>로 수정하였습니다.`;
        } else if(ACTION === 'move') {
            action = `<span class="highlight">${FROM_LIST}</span>에서 ${TO_LIST}</span>로 이동하였습니다.`
        }

        const logItem = document.createElement('div');
        logItem.className = "log-item";
        logItem.innerHTML = `
            <div class= "log-text">칼럼 <span class="highlight">${FROM_LIST}</span>의 <span class="highlight">${TARGET_TITLE.substr(0,10)}</span>을(를) ${action}</div>
        `;
        logList.appendChild(logItem);
    });
  }
}