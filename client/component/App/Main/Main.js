import Board from "./Board/Board.js";
import Log from "./Log/Log.js";
import { api } from "../../../api.js";

export default class Main {
  constructor({ target }) {
    const main = document.createElement("main");
    target.appendChild(main);
    this.main = main;
    this.board = new Board({ target: main });
    this.log = new Log({ target: main });
  }

  setState(boardId) {
    this.fetchBoard(boardId);
  }

  // 메뉴 클릭시 fetchLog 및 애니매이션 실행 부분 - 팀장님이 짜주신 구조랑 어떻게 연결시켜야할지 잘 모르겠음 ㅠㅠ 
  // const menuBtn = document.querySelector('.menu');
  // menuBtn.addEventListener('click', function(e) {
  //   this.log.fetchLog(boardId) 
  //     e.target.closest('.log').classList.add('menu-button-clicked');
  // });


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
