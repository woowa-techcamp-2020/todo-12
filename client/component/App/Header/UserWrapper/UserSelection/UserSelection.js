export default class UserSelection {
  constructor({ target }) {
    const userSelection = document.createElement("div");
    userSelection.className = "user-selection";
    target.appendChild(userSelection);
  }
}
