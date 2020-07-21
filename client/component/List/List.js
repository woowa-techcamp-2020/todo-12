import Item from "../Item/Item.js";

const config = {
  CONTENT_LIMIT: 500,
  WARNING_TYPE: {
    EMPTY: "EMPTY",
    TOO_LONG: "TOO_LONG",
  },
  WARNING_MESSAGE: {
    EMPTY: "내용을 입력해주세요.",
    TOO_LONG: "500자 미만으로 입력해주세요.",
  },
};

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
            <span><span class="char-counter">0</span>/${config.CONTENT_LIMIT}</span>
          </div>
        </div>
        <div class="item-create__btns">
          <button class="add-btn">Add</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </section>
      <section class="items"></section>
    `;

    const listTitle = list.querySelector(".list-title");
    const textarea = list.querySelector("textarea");
    const addItemToListBtn = list.querySelector("header .add-btn");
    const deleteListBtn = list.querySelector("header .del-btn");
    const createItemBtn = list.querySelector(".item-creation .add-btn");
    const cancelItemCreationBtn = list.querySelector(
      ".item-creation .cancel-btn"
    );

    listTitle.addEventListener(
      "dblclick",
      this.handleListTitleClick.bind(this)
    );

    textarea.addEventListener(
      "input",
      this.handleTextareaInputEvent.bind(this)
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

    deleteListBtn.addEventListener(
      "click",
      this.handleDeleteListBtnClick.bind(this)
    );

    return list;
  }

  cancelTitleChange(input) {
    const titleSpan = input.closest(".list-title");
    input.remove();
    titleSpan.innerText = this.title;
  }

  changeTitle(input) {
    const newTitle = input.value;
    const titleSpan = input.closest(".list-title");
    input.remove();
    titleSpan.innerText = newTitle;
    this.title = newTitle;
  }

  handleSubmitTitle(input) {
    if (input.value) this.changeTitle(input);
    else this.cancelTitleChange(input);
  }

  handlePreSubmitTitle(e) {
    const input = e.target;
    // esc
    if (e.keyCode === 27) {
      this.cancelTitleChange(input);
      return;
    }

    if (e.keyCode === 13) {
      this.handleSubmitTitle(input);
    }
  }

  handleListTitleClick({ target: titleSpan }) {
    const currTitle = titleSpan.innerText;
    titleSpan.innerText = "";
    const titleInput = document.createElement("input");
    titleInput.value = currTitle;
    titleSpan.appendChild(titleInput);

    titleInput.addEventListener("keyup", this.handlePreSubmitTitle.bind(this));
  }

  handleTextareaInputEvent({ target: textarea }) {
    const charCountContainer = textarea.parentElement.querySelector(
      ".char-counter"
    );
    const content = textarea.value;
    charCountContainer.innerText = content.length;
    if (content.length === 1) {
      this.removeWarning(textarea, config.WARNING_TYPE.TOO_LONG);
    }
    if (content.length > config.CONTENT_LIMIT) {
      this.showWarning(textarea, config.WARNING_TYPE.TOO_LONG);
    } else {
      this.removeWarning(textarea, config.WARNING_TYPE.TOO_LONG);
    }
  }

  handleAddItemToListBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const itemCreationSection = list.querySelector("section.item-creation");
    itemCreationSection.classList.remove("hide");
  }

  showWarning(textarea, type) {
    textarea.classList.add("warning");
    const errorMsgContainer = textarea.parentElement.querySelector(
      ".error-msg"
    );
    const charCountContainer = textarea.parentElement.querySelector(
      ".char-counter"
    );
    errorMsgContainer.innerText = config.WARNING_MESSAGE[type];
    charCountContainer.classList.add("warning");
  }

  removeWarning(textarea, type) {
    textarea.classList.remove("warning");
    const errorMsgContainer = textarea.parentElement.querySelector(
      ".error-msg"
    );
    const charCountContainer = textarea.parentElement.querySelector(
      ".char-counter"
    );
    errorMsgContainer.innerText = "";
    charCountContainer.classList.remove("warning");
  }

  async handleCreateItemBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const textarea = list.querySelector("textarea");

    if (!textarea.value) {
      this.showWarning(textarea, config.WARNING_TYPE.EMPTY);
      return;
    } else {
      this.removeWarning(textarea, config.WARNING_TYPE.EMPTY);
    }

    const itemData = {
      content: textarea.value,
      position: 1,
      list_id: this.id,
      performer_id: 1,
      performer_username: "admin",
    };

    const itemInstance = new Item(itemData);
    await itemInstance.fetchCreate();
    const itemNode = itemInstance.renderItem();
    const itemsSection = list.querySelector("section.items");
    itemsSection.insertAdjacentElement("afterbegin", itemNode);
    textarea.value = "";
  }

  resetItemCreationSection(textarea) {
    textarea.value = "";
    this.removeWarning(textarea, config.WARNING_TYPE.EMPTY);
    textarea.parentElement.querySelector(".char-counter").innerText = 0;
    this.removeWarning(textarea, config.WARNING_TYPE.TOO_LONG);
  }

  handleCancelItemCreationBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const itemCreationSection = list.querySelector("section.item-creation");
    const textarea = itemCreationSection.querySelector("textarea");
    this.resetItemCreationSection(textarea);
    itemCreationSection.classList.add("hide");
  }

  handleDeleteListBtnClick({ target: btn }) {
    const list = btn.closest(".list");
    list.remove();
    // api 연동
  }
}
