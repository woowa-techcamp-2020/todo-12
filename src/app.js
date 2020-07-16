import { main } from "./mainService.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/users", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => console.log(JSON.stringify(json)));
});
