export default class Header {
  constructor({ target }) {
    const header = document.createElement("header");
    target.appendChild(header);
  }
}
