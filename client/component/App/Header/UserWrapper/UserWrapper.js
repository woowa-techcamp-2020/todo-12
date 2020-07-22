import UserSelection from "./UserSelection/UserSelection.js";
import UserSelected from "./UserSelected/UserSelected.js";

export default class UserWrapper {
  constructor({ target }) {
    const userWrapper = document.createElement("div");
    userWrapper.className = "user-wrapper";
    target.appendChild(userWrapper);

    this.userWrapper = userWrapper;
    this.userSelection = new UserSelection({ target: userWrapper });
    this.userSelected = new UserSelected({ target: userWrapper });
  }
}
