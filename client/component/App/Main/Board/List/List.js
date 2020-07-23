import Item from "./Item/Item.js";

export default class List {
  constructor({ target }) {
    const list = document.createElement("section");
    list.className = "list";
    target.appendChild(list);
    this.list = list;
    this.data = [];
  }

  setState(items) {
    items.forEach((item) => {
      const itemI = new Item({ target: this.list });
      itemI.setState(item);
      this.data.shift(itemI);
    });
    // console.log(this.data);
  }
}
