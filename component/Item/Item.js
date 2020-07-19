export default class {
  constructor(item) {
    this.content = item.content;
    this.position = item.position;
    this.list_id = item.list_id;
    this.performer_id = item.performer_id;
    this.performer_username = item.performer_username;
  }

  renderItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
      <div class="item__show">
        <div class="item__col">logo</div>
        <div class="item__col">
          <span class="item__content">${this.content}</span>
          <span class="item__creator">Added by ${this.performer_username}</span>
        </div>
        <div class="item__col"><span class="item__close-btn">X</span></div>
      </div>
      <div class="item__update hide">
        <textarea></textarea>
        <div class="item__update-btns">
          <button class="update-btn">Update</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
      `;

    item.addEventListener("dblclick", this.handleDoubleClick.bind(this));
    const closeBtn = item.querySelector(".item__close-btn");
    closeBtn.addEventListener("click", this.preDelete.bind(this));
    const cancelBtn = item.querySelector(".cancel-btn");
    cancelBtn.addEventListener(
      "click",
      this.handleUpdateCancelBtnClick.bind(this)
    );
    return item;
  }

  handleUpdateCancelBtnClick({ currentTarget: cancelBtn }) {
    const item = cancelBtn.closest(".item");
    const contentDiv = item.querySelector(".item__show");
    const updateDiv = item.querySelector(".item__update");
    contentDiv.classList.remove("hide");
    updateDiv.classList.add("hide");
  }

  handleDoubleClick({ currentTarget: item }) {
    const contentDiv = item.querySelector(".item__show");
    const updateDiv = item.querySelector(".item__update");
    contentDiv.classList.add("hide");
    updateDiv.classList.remove("hide");
  }

  fetchUpdate() {}

  preDelete() {
    console.log(`item "${this.content}" : delete button clicked`);
  }

  fetchDelete() {}
}
