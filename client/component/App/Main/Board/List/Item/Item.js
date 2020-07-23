export default class Item {
  constructor({ target }) {
    const item = document.createElement("article");
    item.className = "item";
    target.appendChild(item);
    this.item = item;
    this.data = null;
  }

  setState(item) {
    this.data = item;
  }
}
