import "./scss/styles.scss";
import App from "../component/App/App.js";
import dragNDrop from "../utils/drag-drop/drag-drop.js";

new App(document.querySelector("#app"));

window.addEventListener("DOMContentLoaded", dragNDrop);
