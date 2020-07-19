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
        <textarea></textarea>
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

  handleCancelItemCreationBtnClick({ currentTarget: btn }) {
    const list = btn.closest(".list");
    const itemCreationSection = list.querySelector("section.item-creation");
    const textarea = itemCreationSection.querySelector("textarea");
    textarea.value = "";
    itemCreationSection.classList.add("hide");
  }
}
