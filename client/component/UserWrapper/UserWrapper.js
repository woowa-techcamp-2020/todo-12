export default class UserWrapper {
  constructor({ target }) {
    const userWrapper = document.createElement("div");
    userWrapper.className = "user-wrapper";
    target.appendChild(userWrapper);
  }
}
