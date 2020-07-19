import "./scss/styles.scss";

import List from "../component/List/List.js";

const listCreationBtn = document.querySelector(".listCreationBtn");

const handleListCreationBtnClick = function () {
  const listData = {
    id: 1,
    title: "test list",
    position: 1,
    board_id: 1,
  };

  const listInstance = new List(listData);
  const listNode = listInstance.renderList();

  document.body.appendChild(listNode);
};

window.addEventListener("DOMContentLoaded", () => {
  listCreationBtn.addEventListener("click", handleListCreationBtnClick);
});
