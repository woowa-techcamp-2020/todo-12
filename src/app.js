import { main } from "./mainService.js";

const isExist = function ({ list_id }) {
  const board = document.querySelector(".board");
  const lists = board.querySelectorAll(".list");
  return Array.from(lists).some(
    (list) => parseInt(list.dataset.id) === list_id
  );
  return false;
};

const drawList = function (data) {
  const board = document.querySelector(".board");
  // debugger;
  data.forEach((elem) => {
    if (isExist(elem)) return;
    const list = document.createElement("div");
    list.classList.add("list");
    list.dataset.id = elem.list_id;
    list.innerText = `no. ${elem.list_id} list`;
    board.appendChild(list);
  });
};

const drawBoard = function (data) {
  const app = document.querySelector("#app");
  const board = document.createElement("div");
  board.classList.add("board");
  board.innerText = `no. ${data[0].board_id} board`;
  app.appendChild(board);
  drawList(data);
};

const handleData = function (data) {
  if (!data.length) return;
  drawBoard(data);
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/boards/3", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => handleData(json));
});
