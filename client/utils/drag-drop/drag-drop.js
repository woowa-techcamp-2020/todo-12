export default function (event, droppableElementClass) {
  let selectedElem,
    draggableItem,
    originTop,
    originLeft,
    originMouseX,
    originMouseY;

  const ITEM_MARGIN_TOP = 8; 
  const ITEM_HEIGHT = 100;
  const ITEM_WIDTH = 330;

  const setInitialCoordinates = function () {
    originTop = selectedElem.offsetTop - ITEM_MARGIN_TOP;
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
    selectedElem.parentElement.appendChild(draggableItem);
  };

  const leaveSelectedItem = function () {
    selectedElem.classList.add("shadow");
  };

  const handleMouseUp = function (e) {
    e.currentTarget.remove();
    selectedElem.classList.remove("shadow");
    reset();
  };

  const locator = function () {
    const draggableItemCoordinates = draggableItem.getBoundingClientRect()
    const draggableItemCenter = {
      x: draggableItemCoordinates.x + (draggableItemCoordinates.width / 2),
      y: draggableItemCoordinates.y + (draggableItemCoordinates.height / 2)
    }

    draggableItem.classList.add("hide")

    const targetItemElem = document.elementFromPoint(draggableItemCenter.x, draggableItemCenter.y).closest('.item');
    const targetListElem = document.elementFromPoint(draggableItemCenter.x, draggableItemCenter.y).closest('.list');
    
    draggableItem.classList.remove("hide")

    const targetListItems = targetItemElem ? [...targetItemElem.parentElement.childNodes] : [];
    const targetItemElemIdx = targetListItems.indexOf(targetItemElem);
    const selectedElemIdx = [...selectedElem.parentElement.childNodes].indexOf(selectedElem); // 전역

    // console.log('targetItemElemIdx: ', targetItemElemIdx)
    // console.log('selectedElemIdx: ', selectedElemIdx)
    
    if(targetItemElemIdx >= 0) {
      if(selectedElemIdx >= targetItemElemIdx) {  // 같은 경우
        targetItemElem.insertAdjacentElement('beforebegin', selectedElem);
      } else if(selectedElemIdx < targetItemElemIdx) {
        targetItemElem.insertAdjacentElement('afterend', selectedElem);
      } 
    } 
    else if(targetListElem && targetListElem !== selectedElem.parentElement) {
        targetListElem.appendChild(selectedElem)
    } 
  }


  const handleMouseMove = function (e) {
    const elem = e.currentTarget;
    const diffX = e.pageX - originMouseX;
    const diffY = e.pageY - originMouseY;
    elem.style.top = originTop + diffY + "px";
    elem.style.left = originLeft + diffX + "px";
    locator()
  };


  const initDragNDropOnMouseDown = function () {
    selectedElem = event.currentTarget;
    setInitialCoordinates();
    createDraggableItem();
    leaveSelectedItem();
    draggableItem.addEventListener("mousemove", handleMouseMove);
    draggableItem.addEventListener("mouseup", handleMouseUp);
  };
  initDragNDropOnMouseDown();
}
