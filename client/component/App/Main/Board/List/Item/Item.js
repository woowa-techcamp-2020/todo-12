export default class Item {
  constructor({ target }) {
    const item = document.createElement("article");
    item.className = "item";
    target.appendChild(item);
    this.item = item;
    this.data = null;

    this.render();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.item.innerHTML = `
      <div class="usual">
        <div class="col">...</div>
        <div class="col">
          <div class="content">${this.content}</div>
          <span class="creator">Added by ${this.performer_username}</span>
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
  }
}
