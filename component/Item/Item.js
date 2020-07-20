import dragNDrop from "../../utils/drag-drop/drag-drop.js";

export default class {
  constructor(item) {
    this.id = null;
    this.content = item.content;
    this.position = item.position;
    this.list_id = item.list_id;
    this.performer_id = item.performer_id;
    this.performer_username = item.performer_username;
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

    // 더블클릭하는 경우와 드래그 하는 경우 분리 필요
    // item.addEventListener("mousedown", this.handleDragNDropInit.bind(this));
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

  handleDragNDropInit(e) {
    dragNDrop(e, "list");
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
