export default class UserSelection {
  constructor({ target }) {
    const userSelected = document.createElement("div");
    userSelected.className = "user-selected";
    target.appendChild(userSelected);
  }
}
