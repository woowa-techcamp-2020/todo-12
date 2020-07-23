import Item from "./Item/Item.js";

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

export default class List {
  constructor({ target }) {
    const list = document.createElement("section");
    list.className = "list";
    target.appendChild(list);
    this.list = list;
    this.data = null;
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  handleListClick({ target: { classList, tagName } }) {
    const classes = Array.from(classList);
    if (classes.includes("item-add-btn")) {
      this.openItemCreationSection();
      return;
    }
    if (classes.includes("cancel-btn")) {
      this.resetItemCreationSection();
      this.closeItemCreationSection();
    }
    if (classes.includes("confirm-btn")) {
      this.handleItemSubmission();
    }
    if (tagName === "TEXTAREA") {
      this.list
        .querySelector("textarea")
        .addEventListener("input", this.handleInputChange.bind(this));
    }
  }

  handleItemSubmission() {
    const textarea = this.list.querySelector("textarea");
    const inputLength = textarea.value.length;
    if (inputLength === 0) {
      this.showWarning(textarea, config.WARNING_TYPE.EMPTY);
    } else {
      this.removeWarning(textarea, config.WARNING_TYPE.EMPTY);
    }
  }

  handleInputChange({ target }) {
    const inputLength = target.value.length;
    this.list.querySelector(".char-counter").innerText = inputLength;
    this.toggleConfirmBtn(inputLength);
    this.handleErrorMsg(target, inputLength);
  }

  toggleConfirmBtn(length) {
    if (length === 0) {
      this.list.querySelector(".confirm-btn").seßtAttribute("disabled", "");
    } else {
      this.list.querySelector(".confirm-btn").removeAttribute("disabled");
    }
  }

  handleErrorMsg(target, length) {
    if (length === 1) {
      this.removeWarning(target, config.WARNING_TYPE.TOO_LONG);
    }
    if (length >= config.CONTENT_LIMIT) {
      this.showWarning(target, config.WARNING_TYPE.TOO_LONG);
    } else {
      this.removeWarning(target, config.WARNING_TYPE.TOO_LONG);
    }
  }

  showWarning(target, type) {
    target.classList.add("warning");
    const errorMsgContainer = target.parentElement.querySelector(".error-msg");
    const charCountContainer = target.parentElement.querySelector(
      ".char-counter"
    );
    errorMsgContainer.innerText = config.WARNING_MESSAGE[type];
    charCountContainer.classList.add("warning");
  }

  removeWarning(target, type) {
    target.classList.remove("warning");
    const errorMsgContainer = target.parentElement.querySelector(".error-msg");
    const charCountContainer = target.parentElement.querySelector(
      ".char-counter"
    );
    errorMsgContainer.innerText = "";
    charCountContainer.classList.remove("warning");
  }

  openItemCreationSection() {
    this.list.querySelector(".item-creation").classList.remove("hide");
  }

  closeItemCreationSection() {
    this.list.querySelector(".item-creation").classList.add("hide");
  }

  resetItemCreationSection() {
    this.list.querySelector("textarea").value = "";
  }

  resetNcloseItemCreationSection() {
    this.resetItemCreationSection(this.list.querySelector("textarea"));
    this.closeItemCreationSection();
  }

  render() {
    const { list_id: id, list_title: title, list_position: order } = this.data;

    this.list.dataset.id = id;
    this.list.dataset.order = order;

    this.list.innerHTML = `
      <header>
        <div class="col">
          <div class="counter">3</div>
          <span class="title">${title}</span>
        </div>
        <div class="col">
          <button class="item-add-btn">➕</button>
          <button class="list-del-btn">❌</button>
        </div>
      </header>
      <section class="item-creation hide">
        <div class="textarea-wrapper">
          <textarea maxlength="500" placeholder="내용을 입력하세요."></textarea>
          <div class="textarea-msg">
            <span class="error-msg warning"></span>
            <span><span class="char-counter">0</span>/${config.CONTENT_LIMIT}</span>
          </div>
        </div>
        <div class="item-creation__btns">
          <button class="confirm-btn" disabled>Add</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </section>
      <section class="items"></section>
    `;

    this.list.addEventListener("click", this.handleListClick.bind(this));

    const { items } = this.data;

    const itemContainer = this.list.querySelector(".items");
    items.forEach((item) => {
      if (item.item_id) {
        const itemI = new Item({ target: itemContainer });
        itemI.setState(item);
      }
    });
  }
}
