import { main } from "./mainService.js";

const getList = function (id) {
  const board = document.querySelector(".board");
  const lists = board.querySelectorAll(".list");
  return Array.from(lists).filter(
    (list) => parseInt(list.dataset.id) === id
  )[0];
};

const drawList = function (id) {
  const board = document.querySelector(".board");
  const list = document.createElement("div");
  list.classList.add("list");
  list.dataset.id = id;
  list.innerText = `no. ${id} list`;
  board.appendChild(list);
  return list;
};

const handleListDrawing = function (data) {
  data.forEach((elem) => {
    let list = getList(elem.list_id);
    if (!list) {
      list = drawList(elem.list_id);
    }
  });
};

const drawBoard = function (data) {
  const app = document.querySelector("#app");
  const board = document.createElement("div");
  board.classList.add("board");
  board.innerText = `no. ${data[0].board_id} board`;
  app.appendChild(board);
  handleListDrawing(data);
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
