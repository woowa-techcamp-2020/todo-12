export default class Item {
  constructor({ target }) {
    const item = document.createElement("article");
    item.className = "item";
    target.appendChild(item);
    this.item = item;
    this.data = null;

    item.innerHTML = ``;
  }

  setState(data) {
    this.data = data;
    this.render();
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
  }
}
