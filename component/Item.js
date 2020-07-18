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
      <div class="item__col">logo</div>
      <div class="item__col">
        <span class="item__content">${this.content}</span>
        <span class="item__creator">Added by ${this.performer_username}</span>
      </div>
      <div class="item__col"><span class="item__close-btn">X</span></div>`;
    item.addEventListener("dblclick", this.handleDoubleClick);
    const closeBtn = item.querySelector(".item__close-btn");
    closeBtn.addEventListener("click", this.preDelete);
    return item;
  }

  handleDoubleClick() {
    console.log(`item "${this.content}" : double clicked`);
  }

  fetchUpdate() {}

  preDelete() {
    console.log(`item "${this.content}" : delete button clicked`);
  }

  fetchDelete() {}
}
