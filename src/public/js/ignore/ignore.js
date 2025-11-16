"use strict";

var gLevel1 = {
  SIZE: 10,
  mineCount: 15,
};
var gBoard;
var gOpenCellCount;
var gSignBOMB = "💣";
var gSignFlag = "🚩";
var timeInterval;
var gCountClick;

init();

function start() {
  gOpenCellCount = 0;
  gCountClick = 0;
  var elTimer = document.querySelector(".time");
  var second = 0;
  elTimer.innerHTML = second;
  gBoard = buildBoard();
  startMineCounter();
}

// creating a cell on the board
function createCell() {
  return {
    isMine: false,
    mineAround: 0,
    isOpen: false,
  };
}

// creating a game board
function buildBoard() {
  var size = gLevel1.SIZE;
  var field = [];
  for (var i = 0; i < size; i++) {
    field[i] = [];
    for (var j = 0; j < size; j++) {
      field[i][j] = createCell();
    }
  }
  var mineCount = gLevel1.mineCount;
  for (var i = 0; i < mineCount; ) {
    var x = getRandomInt(0, 10);
    var y = getRandomInt(0, 10);
    if (!field[x][y].isMine) {
      field[x][y].isMine = true;
      i++;
    }
  }
  console.table(field);
  return field;
}

// count mines around a certain cell
function mineAroundCounter(x, y) {
  var xStart = x > 0 ? x - 1 : x;
  var yStart = y > 0 ? y - 1 : y;
  var xEnd = x < gBoard.length - 1 ? x + 1 : x;
  var yEnd = y < gBoard.length - 1 ? y + 1 : y;
  var count = 0;
  for (var i = xStart; i <= xEnd; i++) {
    for (var j = yStart; j <= yEnd; j++) {
      // If middle cell or out of mat - continue;
      if (!(i === x && j === y) && gBoard[i][j].isMine) count++;
    }
  }
  gBoard[x][y].mineAround = count;
}

// count mines around on the game board
function startMineCounter() {
  var size = gLevel1.SIZE;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      mineAroundCounter(i, j);
    }
  }
}

//page interface

function init() {
  start();
  renderBoard();
}

// render board in browser
function renderBoard() {
  var strHtml = "";
  for (var i = 0; i < gBoard.length; i++) {
    strHtml += "<tr>";
    for (var j = 0; j < gBoard.length; j++) {
      var tdId = "cell-" + i + "-" + j;
      strHtml +=
        '<td id="' +
        tdId +
        '" oncontextmenu="lockCell(this, ' +
        i +
        ", " +
        j +
        ')" onclick="cellClicked(this, ' +
        i +
        ", " +
        j +
        ')"></td>';
    }
    strHtml += "</tr>";
  }
  var elMat = document.querySelector(".board");
  elMat.innerHTML = strHtml;
}

// open cell onclick
function cellClicked(elCell, i, j) {
  if (!gCountClick) {
    timeInterval = setInterval(timer, 1000);
    gCountClick++;
  }
  if (!elCell.classList.contains("lock")) {
    recurseOpen(i, j);
    console.log(gOpenCellCount);
  }
}

// lock and unlock cell
function lockCell(elCell, i, j) {
  if (!elCell.classList.contains("open")) {
    if (elCell.classList.contains("lock")) {
      elCell.classList.remove("lock");
    } else {
      elCell.classList.add("lock");
    }
  }
}

// open the whole cells around that contains zeros
function recurseOpen(x, y) {
  var elCell = document.getElementById("cell-" + x + "-" + y);
  if (gBoard.isOpen) return;
  if (gBoard[x][y].isMine) {
    elCell.innerHTML = gSignBOMB;
    elCell.classList.add("open");
    clearInterval(timeInterval);
    timeInterval = undefined;
    setTimeout(function () {
      alert("Game over!");
    }, 1000);
    setTimeout(start, 1500);
    setTimeout(renderBoard, 1600);
  } else if (!gBoard[x][y].isOpen) {
    if (gBoard[x][y].mineAround !== 0)
      elCell.innerHTML = gBoard[x][y].mineAround;
    gBoard[x][y].isOpen = true;
    elCell.classList.add("open");
    gOpenCellCount++;
    if (gBoard.length * gBoard.length - gLevel1.mineCount === gOpenCellCount) {
      clearInterval(timeInterval);
      timeInterval = undefined;
      alert("Congratulation, you are winner!!!");
      start();
      renderBoard();
    }
    if (gBoard[x][y].mineAround === 0) {
      for (var i = x > 0 ? x - 1 : x; i <= x + 1 && i < gBoard.length; i++) {
        for (var j = y > 0 ? y - 1 : y; j <= y + 1 && j < gBoard.length; j++) {
          recurseOpen(i, j);
        }
      }
    }
  }
}

function timer() {
  var elTimer = document.querySelector(".time");
  var second = +elTimer.innerHTML;
  second++;
  elTimer.innerHTML = second;
}
