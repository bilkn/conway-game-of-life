const grid = document.querySelector('.grid');
const btn = document.querySelector(".btn");
btn.addEventListener("click", prepareActions);
let arr = [];
function fillArray(count) {
  for (let row = 0; row < count; row++) {
    let innerArr = [];
    for (let col = 0; col < count; col++) {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      innerArr.push(input);
    }
    arr.push(innerArr);
  }
  return arr;
}

function populateGridByArray(arr, count) {
  arr.flat().forEach((element, i) => {
    if (i % count == 0) grid.appendChild(elt('br'));
    grid.appendChild(element);
  });
}

function elt(node) {
  const element = document.createElement(node);
  return element;
}

function prepareActions() {
  let willCheckedBoxes = [];
  let willUncheckedBoxes = [];
  for (let row = 0; row < arr.length; row++) {
    let innerArr = arr[row];
    for (let col = 0; col < innerArr.length; col++) {
      let box = innerArr[col];
      let neighboursCount = countNeighbours(row, col);
      if (
        (neighboursCount == 0 ||
          neighboursCount == 1 ||
          neighboursCount >= 4) &&
        box.checked
      )
        willUncheckedBoxes.push(box);
      else if (neighboursCount == 3 && !box.checked) willCheckedBoxes.push(box);
    }
  }
  let renderArr = [];
  renderArr.push(willCheckedBoxes, willUncheckedBoxes);
  updateGrid(renderArr);
}

function countNeighbours(row, col) {
  let count = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (
        arr[row + x] &&
        arr[row + x][col + y] &&
        (x != 0 || y != 0) &&
        arr[row + x][col + y].checked
      )
        count++;
    }
  }
  return count;
}

function updateGrid(renderArr) {
  renderArr[0].forEach((box) => {
    box.checked = true;
  });
  renderArr[1].forEach((box) => {
    box.checked = false;
  });
}

populateGridByArray(fillArray(40), 40);