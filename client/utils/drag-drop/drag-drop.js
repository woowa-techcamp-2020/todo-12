export default function () {
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
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const createDraggableItem = function () {
    draggableItem = selectedElem.cloneNode(true);
    draggableItem.classList.add("dragging");
    draggableItem.style.top = originTop + "px";
    draggableItem.style.left = originLeft + "px";
    selectedElem.parentElement.appendChild(draggableItem);
  };

  const leaveSelectedItem = function () {
    selectedElem.classList.add("shadow");
  };

  const checkMovement = function () {
    const {
      data: { list, order },
    } = selectedElem;
    const originInfo = {
      list,
      order,
    };
    const currList = selectedElem.closest(".list");
    const currListItems = currList.querySelectorAll(".item");
    const currOrder = Array.from(currListItems).indexOf(selectedElem);
    const currentInfo = {
      list: currList.data.order,
      order: currOrder,
    };
    // 업데이트 api
    // dataset 변경
  };

  const handleMouseUp = function (e) {
    draggableItem.remove();
    selectedElem.classList.remove("shadow");
    reset();
    checkMovement();
  };

  const locator = function () {
    const draggableItemCoordinates = draggableItem.getBoundingClientRect();
    const draggableItemCenter = {
      x: draggableItemCoordinates.x + draggableItemCoordinates.width / 2,
      y: draggableItemCoordinates.y + draggableItemCoordinates.height / 2,
    };

    draggableItem.classList.add("hide");

    const targetItemElem = document
      .elementFromPoint(draggableItemCenter.x, draggableItemCenter.y)
      .closest(".item");
    const targetListElem = document
      .elementFromPoint(draggableItemCenter.x, draggableItemCenter.y)
      .closest(".list");

    draggableItem.classList.remove("hide");

    const targetListItems = targetItemElem
      ? [...targetItemElem.parentElement.childNodes]
      : [];
    const targetItemElemIdx = targetListItems.indexOf(targetItemElem);
    const selectedElemIdx = [...selectedElem.parentElement.childNodes].indexOf(
      selectedElem
    ); // 전역

    // console.log('targetItemElemIdx: ', targetItemElemIdx)
    // console.log('selectedElemIdx: ', selectedElemIdx)

    if (targetItemElemIdx >= 0) {
      if (selectedElemIdx >= targetItemElemIdx) {
        // 같은 경우
        targetItemElem.insertAdjacentElement("beforebegin", selectedElem);
      } else if (selectedElemIdx < targetItemElemIdx) {
        targetItemElem.insertAdjacentElement("afterend", selectedElem);
      }
    } else if (
      targetListElem &&
      targetListElem !== selectedElem.parentElement
    ) {
      targetListElem.appendChild(selectedElem);
    }
  };

  const handleMouseMove = function (e) {
    const diffX = e.pageX - originMouseX;
    const diffY = e.pageY - originMouseY;
    draggableItem.style.top = originTop + diffY + "px";
    draggableItem.style.left = originLeft + diffX + "px";
    locator();
  };

  const initDragNDrop = function (e) {
    selectedElem = e.target.closest(".item");
    if (selectedElem) {
      setInitialCoordinates();
      createDraggableItem();
      leaveSelectedItem();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };

  window.addEventListener("mousedown", initDragNDrop);
}
