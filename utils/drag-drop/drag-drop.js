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




    const el = document.elementFromPoint(draggableItemCenter.x, draggableItemCenter.y).closest('.item');
    

    // console.log([...selectedElem.parentElement.childNodes].filter(v => v === selectedElem));
    // console.log([...selectedElem.parentElement.childNodes].indexOf([...selectedElem.parentElement.childNodes].find(v => v === selectedElem)))
    const itemsArr = [...selectedElem.parentElement.childNodes];
    const selectedElemIdx = itemsArr.indexOf(selectedElem);
    const elIdx = itemsArr.indexOf(el);
    console.log('el: ', elIdx);
    console.log('sel: ', selectedElemIdx)

    if(el) {
      if(selectedElemIdx > elIdx) {
        selectedElem.insertAdjacentElement('afterend', el)
      } else if(selectedElemIdx < elIdx) {
        selectedElem.insertAdjacentElement('beforebegin', el);
      } else if(el < 0) {
        console.log('err')
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
