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

  const handleMouseMove = function (e) {
    const elem = e.currentTarget;
    const diffX = e.pageX - originMouseX;
    const diffY = e.pageY - originMouseY;
    elem.style.top = originTop + diffY + "px";
    elem.style.left = originLeft + diffX + "px";

    const draggableItemCenter = {
      x: draggableItem.getBoundingClientRect().x + (draggableItem.getBoundingClientRect().width / 2),
      y: draggableItem.getBoundingClientRect().y + (draggableItem.getBoundingClientRect().height / 2)
    }

    draggableItem.classList.add("hide")

    const el = document.elementFromPoint(draggableItemCenter.x, draggableItemCenter.y).closest('.item')
    const li = document.elementFromPoint(draggableItemCenter.x, draggableItemCenter.y).closest('.list')
    // const emptyListNode = e.target.closest('.list')
    
    const itemsArr = [...selectedElem.parentElement.childNodes];
    const elItemsArr = el ? [...el.parentElement.childNodes] : [];
    const selectedElemIdx = itemsArr.indexOf(selectedElem);
    const elIdx = elItemsArr.indexOf(el);
    // console.log('elIdx: ', elIdx);
    // console.log('selIdx: ', selectedElemIdx)
    // console.log('elItemsArr: ', elItemsArr)

    if(elIdx > 0) {
      if(selectedElemIdx > elIdx) {
        el.insertAdjacentElement('beforebegin', selectedElem);
      } else if(selectedElemIdx < elIdx) {
        el.insertAdjacentElement('afterend', selectedElem);
      } 
    } else {
        if(li && li !== selectedElem.parentElement) {
          li.appendChild(selectedElem)
        } 
      }
  
    draggableItem.classList.remove("hide")
  };

// 1. item position (data-position)
// 2. direction : up / down
// 3. 


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
