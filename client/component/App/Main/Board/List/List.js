import Item from "./Item/Item.js";

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
    const { items } = this.data;
    items.forEach((item) => {
      if (item.item_id) {
        const itemI = new Item({ target: this.list });
        itemI.setState(item);
      }
    });
  }
}
