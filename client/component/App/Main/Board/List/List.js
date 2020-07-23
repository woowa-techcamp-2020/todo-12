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
          <button class="confirm-btn">Add</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </section>
      <section class="items"></section>
    `;

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
