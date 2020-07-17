import { main } from "./mainService.js";
const buttons = document.querySelectorAll("button");

const getList = function (id) {
  const board = document.querySelector(".board");
  const lists = board.querySelectorAll(".list");
  return Array.from(lists).filter(
    (list) => parseInt(list.dataset.id) === id
  )[0];
};

const drawList = function (elem) {
  const board = document.querySelector(".board");
  const list = document.createElement("div");
  list.classList.add("list");
  list.dataset.id = elem.list_id;
  list.innerHTML = `<div class="content"><span>position: ${elem.list_position}</span><span>title: ${elem.list_title}</span></div>`;
  board.appendChild(list);
  return list;
};

const drawItem = function (list, elem) {
  if (!elem.item_id) return;
  const item = document.createElement("div");
  item.classList.add("item");
  item.dataset.id = elem.item_position_in_list;
  item.innerHTML = `<div class="content"><span>position: ${elem.item_position_in_list}</span><span>content: ${elem.item_content}</span></div>`;
  list.appendChild(item);
};

const handleListDrawing = function (data) {
  data.forEach((elem) => {
    if (!elem.list_id) return;
    let list = getList(elem.list_id);
    if (!list) {
      list = drawList(elem);
    }
    drawItem(list, elem);
  });
};

const drawBoard = function (data) {
  const app = document.querySelector("#app");
  const board = document.createElement("div");
  board.classList.add("board");
  board.innerHTML = `board ${data[0].board_id}`;
  app.appendChild(board);
  handleListDrawing(data);
};

const handleData = function (data) {
  if (!data.length) return;
  drawBoard(data);
};

const handleBoardBtnClick = function (e) {
  const board = document.querySelector(".board");
  if (board) board.remove();
  fetch(`http://localhost:3000/boards/${e.target.dataset.id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => handleData(json));
};

window.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) =>
    button.addEventListener("click", handleBoardBtnClick)
  );
});
