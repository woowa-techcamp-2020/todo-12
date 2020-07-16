import { main } from "./mainService.js";

window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");
  app.innerHTML = `I'm from ${main()}`;
});
