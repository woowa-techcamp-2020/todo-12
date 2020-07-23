export default class Item {
  constructor({ target }) {
    const item = document.createElement("article");
    item.className = "item";
    target.appendChild(item);
    this.item = item;
    this.data = null;
    this.timer = null;
    this.clickedBefore = false;
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  handleItemDoubleClick() {
    this.item.querySelector(".usual").classList.add("hide");
    this.item.querySelector(".update").classList.remove("hide");
  }

  handleItemClick({ target: { classList } }) {
    const classes = Array.from(classList);
    if (classes.includes("close-btn")) {
      console.log("close btn click");
    }
    if (classes.includes("update-btn")) {
      console.log("update btn click");
    }
    if (classes.includes("cancel-btn")) {
      console.log("cancel btn click");
    }
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  handleItemMouseDown(e) {
    if (e.currentTarget.querySelector(".usual").classList.contains("hide")) {
      e.stopPropagation();
    }
    if (e.target.tagName === "BUTTON") {
      e.stopPropagation();
      e.target.addEventListener("mouseup", this.handleItemClick.bind(this));
    }
    if (this.clickedBefore) {
      e.stopPropagation();
      this.clickedBefore = false;
      this.clearTimer();
      this.handleItemDoubleClick();
    } else {
      this.clickedBefore = true;
      this.timer = setTimeout(() => {
        this.clickedBefore = false;
        this.clearTimer();
      }, 500);
    }
  }

  render() {
    const {
      item_id: id,
      item_content: content,
      item_position_in_list: order,
      item_performer_name: performer,
    } = this.data;

    this.item.dataset.id = id;
    this.item.dataset.order = order;

    this.item.innerHTML = `
      <div class="usual">
        <div class="col">...</div>
        <div class="col">
          <div class="content">${content}</div>
          <span class="creator">Added by ${performer}</span>
        </div>
        <div class="col">
          <button class="close-btn">X</button>
        </div>
      </div>
      <div class="update hide">
        <textarea maxlength="500" placeholder="내용을 입력하세요."></textarea>
        <div class="update-btns">
          <button class="update-btn">Update</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    this.item.addEventListener(
      "mousedown",
      this.handleItemMouseDown.bind(this)
    );
  }
}
