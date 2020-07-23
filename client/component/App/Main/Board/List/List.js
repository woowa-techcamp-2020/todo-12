export default class List {
  constructor({ target }) {
    const list = document.createElement("section");
    list.className = "list";
    target.appendChild(list);
    this.list = list;
    this.data = [];
  }

  setState(items) {
    items.forEach((item) => this.data.shift(item));
    console.log(this.data);
  }
}
