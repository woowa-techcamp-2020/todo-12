export default class {
  constructor(user) {
    this.id = user.ID;
    this.username = user.NAME;
    this.avatar = user.AVATAR;
  }

  render() {
    const user = document.createElement("article");
    user.classList.add("user");
    user.innerHTML = `
      <span>${this.username}</span>
    `;
    return user;
  }
}
