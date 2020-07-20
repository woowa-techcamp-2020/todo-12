export default function (event, droppableElementClass) {
  const selectedElem = event.currentTarget;
  let originTop, originLeft, originMouseX, originMouseY, draggableItem;

  const setInitialCoordinates = function () {
    originTop = selectedElem.offsetTop;
    originLeft = selectedElem.offsetLeft;
    originMouseX = event.pageX;
    originMouseY = event.pageY;
    console.log(originTop, originLeft, originMouseX, originMouseY);
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

  const initDragNDropOnMouseDown = function () {
    setInitialCoordinates();
    createDraggableItem();
    leaveSelectedItem();
  };

  initDragNDropOnMouseDown();
}
