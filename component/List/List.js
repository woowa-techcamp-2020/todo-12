import Item from "../Item/Item.js";
import { text } from "body-parser";

export default class {
  constructor(list) {
    this.id = list.id;
    this.title = list.title;
    this.position = list.position;
    this.board_id = list.board_id;
  }

  renderList() {
    const list = document.createElement("div");
    list.classList.add("list");
    list.innerHTML = `
      <header>
        <div class="col">
          <span class="item-count">3</span>
          <span class="list-title">${this.title}</span>
        </div>
        <div class="col">
          <span class="add-btn">➕</span>
          <span class="del-btn">❌</span>
        </div>
      </header>
      <section class="item-creation hide">
        <div class="textarea-wrapper">
          <textarea></textarea>
          <div class="textarea-msg">
            <span class="error-msg warning"></span>
            <span><span class="char-counter"></span>/500</span>
          </div>
        </div>
        <div class="item-create__btns">
          <button class="add-btn">Add</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </section>
      <section class="items"></section>
    `;

    const addItemToListBtn = list.querySelector("header .add-btn");
    const deleteListBtn = list.querySelector("header .del-btn");
    const createItemBtn = list.querySelector(".item-creation .add-btn");
    const cancelItemCreationBtn = list.querySelector(
      ".item-creation .cancel-btn"
    );

    addItemToListBtn.addEventListener(
      "click",
      this.handleAddItemToListBtnClick.bind(this)
    );
    createItemBtn.addEventListener(
      "click",
      this.handleCreateItemBtnClick.bind(this)
    );
    cancelItemCreationBtn.addEventListener(
      "click",
      this.handleCancelItemCreationBtnClick.bind(this)
    );

    return list;
  }

  handleAddItemToListBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const itemCreationSection = list.querySelector("section.item-creation");
    itemCreationSection.classList.remove("hide");
  }

  getContent(textarea) {
    return textarea.vaule;
  }

  showEmptyContentWarning(textarea) {
    textarea.classList.add("warning");
    const errorMsgContainer = textarea.parentElement.querySelector(
      ".error-msg"
    );
    errorMsgContainer.innerText = "내용을 입력해주세요.";
  }

  removeEmptyContentWarning(textarea) {
    textarea.classList.remove("warning");
    const errorMsgContainer = textarea.parentElement.querySelector(
      ".error-msg"
    );
    errorMsgContainer.innerText = "";
  }

  handleCreateItemBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const textarea = list.querySelector("textarea");
    const content = textarea.value;
    textarea.value = "";
    if (!content) {
      this.showEmptyContentWarning(textarea);
      return;
    } else {
      this.removeEmptyContentWarning(textarea);
    }
    const itemData = {
      content,
      position: 1,
      list_id: this.id,
      performer_id: 1,
      performer_username: "admin",
    };

    const itemInstance = new Item(itemData);
    const itemNode = itemInstance.renderItem();

    const itemsSection = list.querySelector("section.items");
    itemsSection.insertAdjacentElement("afterbegin", itemNode);
  }

  handleCancelItemCreationBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const itemCreationSection = list.querySelector("section.item-creation");
    const textarea = itemCreationSection.querySelector("textarea");
    textarea.value = "";
    this.removeEmptyContentWarning(textarea);
    itemCreationSection.classList.add("hide");
  }
}
