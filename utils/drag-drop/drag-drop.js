export default function (event, droppableElementClass) {
  let selectedElem,
    draggableItem,
    originTop,
    originLeft,
    originMouseX,
    originMouseY;

  const setInitialCoordinates = function () {
    originTop = selectedElem.offsetTop;
    originLeft = selectedElem.offsetLeft;
    originMouseX = event.pageX;
    originMouseY = event.pageY;
  };

  const reset = function () {
    selectedElem = null;
    draggableItem = null;
    originTop = null;
    originLeft = null;
    originMouseX = null;
    originMouseY = null;
  };

  const createDraggableItem = function () {
    draggableItem = selectedElem.cloneNode(true);
    draggableItem.classList.add("dragging");
    draggableItem.style.top = originTop + "px";
    draggableItem.style.left = originLeft + "px";
    document.body.appendChild(draggableItem);
  };

  const leaveSelectedItem = function () {
    selectedElem.classList.add("shadow");
  };

  const handleMouseUp = function (e) {
    e.currentTarget.remove();
    selectedElem.classList.remove("shadow");
    reset();
  };

  const initDragNDropOnMouseDown = function () {
    selectedElem = event.currentTarget;
    setInitialCoordinates();
    createDraggableItem();
    leaveSelectedItem();
    draggableItem.addEventListener("mouseup", handleMouseUp);
  };

  initDragNDropOnMouseDown();
}
