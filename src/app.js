import "./scss/styles.scss";

import User from "../component/User/User.js";
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

const fetchUser = function () {
  fetch(`http://localhost:3000/users`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((userData) => {
        const user = new User(userData);
        const userNode = user.render();
        const container = document.querySelector(".collection");
        container.appendChild(userNode);
      });
    });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchUser();
  listCreationBtn.addEventListener("click", handleListCreationBtnClick);
});
