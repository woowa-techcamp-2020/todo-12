import dragNDrop from "../../utils/drag-drop/drag-drop.js";

export default class {
  constructor(item) {
    this.id = null;
    this.content = item.content;
    this.position = item.position;
    this.list_id = item.list_id;
    this.performer_id = item.performer_id;
    this.performer_username = item.performer_username;
    this.clickedBefore = false;
    this.timer = null;
  }

  renderItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    item.dataset.id = this.id;
    item.innerHTML = `
      <div class="item__show">
        <div class="item__col">logo</div>
        <div class="item__col">
          <span class="item__content">${this.content}</span>
          <span class="item__creator">Added by ${this.performer_username}</span>
        </div>
        <div class="item__col"><button class="item__close-btn">X</button></div>
      </div>
      <div class="item__update hide">
        <textarea></textarea>
        <div class="item__update-btns">
          <button class="update-btn">Update</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
      `;

    item.addEventListener("mousedown", this.handleMouseDown.bind(this));
    const closeBtn = item.querySelector(".item__close-btn");
    closeBtn.addEventListener("click", this.preDelete.bind(this));
    const cancelBtn = item.querySelector(".cancel-btn");
    cancelBtn.addEventListener(
      "click",
      this.handleUpdateCancelBtnClick.bind(this)
    );
    return item;
  }

  async fetchCreate() {
    await fetch("http://localhost:3000/items", {
      method: "POST",
      body: JSON.stringify(this),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.id = data.id;
      })
      .catch((err) => console.error(err));
  }

  handleMouseDown(e) {
    if (["BUTTON", "TEXTAREA"].includes(e.target.tagName)) return;
    if (Array.from(e.currentTarget.classList).includes("updating")) return;
    // 더블클릭
    if (this.clickedBefore) {
      this.handleDoubleClick(e);
      if (this.timer) clearTimeout(this.timer);
    } else {
      this.timer = setTimeout(() => {
        this.clickedBefore = false;
      }, 500);
      dragNDrop(e, "list");
    }
    this.clickedBefore = !this.clickedBefore;
  }

  handleUpdateCancelBtnClick({ currentTarget: cancelBtn }) {
    const item = cancelBtn.closest(".item");
    const contentDiv = item.querySelector(".item__show");
    const updateDiv = item.querySelector(".item__update");
    item.classList.remove("updating");
    contentDiv.classList.remove("hide");
    updateDiv.classList.add("hide");
  }

  handleDoubleClick({ currentTarget: item }) {
    const contentDiv = item.querySelector(".item__show");
    const updateDiv = item.querySelector(".item__update");
    item.classList.add("updating");
    contentDiv.classList.add("hide");
    updateDiv.classList.remove("hide");
    const textarea = updateDiv.querySelector("textarea");
    textarea.innerText = this.content;
  }

  fetchUpdate() {}

  async preDelete(e) {
    // console.log(`item "${this.content}" : delete button clicked`);
    // 삭제 컨펌 엘리먼트를 보여주고 삭제 확인을 선택한 경우에만, this.delete() 실행하도록 수정 필요
    await this.fetchDelete();
    this.delete(e);
  }

  delete({ target: btn }) {
    const item = btn.closest(".item");
    item.remove();
    // 위에 있는 아이템들의 position -= 1
  }

  async fetchDelete() {
    await fetch(`http://localhost:3000/items/${this.id}`, {
      method: "DELETE",
    }).catch((err) => console.error(err));
  }
}
