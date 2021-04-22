import {
  getRandomCubeNumber,
  prepareTable,
  getPantry,
  getDeck,
  getCubePressed,
  getCurrentText,
  getCurrentState,
  pressCube,
  chooseTakeOrRemove,
  newRound,
  resetState,
} from "./mechanics.js";

var canvas = document.getElementById("cheesyCanvas");
var ctx = canvas.getContext("2d");
var hintsEnabled = true;
// objects parameters
const PANTRY_SIZE = 6;
const CUBE_X = 10;
const CUBE_Y = 150;
const CUBE_WIDTH = 40;
const CUBE_LENGTH = 40;
const CARD_WIDTH = 60;
const CARD_LENGTH = 80;
const PANTRY_OFFSET = 10;

main();

function main() {
  prepareTable();
  console.log(getPantry());
  console.log(getDeck());

  drawDeck();
  drawCube(getRandomCubeNumber());
  drawPantry();
  drawText(getCurrentText());

  addDocumentEventListeners();
}

function addDocumentEventListeners() {
  document.addEventListener("mousedown", onMouseClick, false);
  document.addEventListener("keydown", onKeydown, false);
}

function drawText(text) {
  if (!hintsEnabled) {
    return;
  }
  document.getElementById("text").innerText = text;
}

function drawDeck() {
  const DECK_X = 10;
  const DECK_Y = 10;
  const DECK_OFFSET = 5;
  drawCardNum(DECK_X, DECK_Y, getRandomCubeNumber());
  drawCardNum(
    DECK_X + DECK_OFFSET,
    DECK_Y + DECK_OFFSET,
    getRandomCubeNumber()
  );
}

function drawCube(num) {
  ctx.clearRect(CUBE_X, CUBE_Y, CUBE_WIDTH, CUBE_LENGTH);
  var img = new Image(CUBE_WIDTH, CUBE_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, CUBE_X, CUBE_Y);
    ctx.beginPath();
    ctx.strokeRect(CUBE_X, CUBE_Y, CUBE_WIDTH, CUBE_LENGTH);
  };

  img.src = "./images/cube" + num + ".png";
}

function drawPantry() {
  const PANTRY_X = CUBE_X + CUBE_WIDTH + 50;
  const PANTRY_Y = CUBE_Y;
  var x = PANTRY_X;
  for (var i = 0; i < PANTRY_SIZE; i++) {
    drawCardNum(x, PANTRY_Y, getPantry()[i].value);
    x = x + CARD_WIDTH + PANTRY_OFFSET;
  }
}

function drawCardNum(x, y, num) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, CARD_WIDTH, CARD_LENGTH);
  };
  img.src = "./images/card" + num + ".png";
}

function drawCardNumHighlighted(x, y, num) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.strokeRect(x, y, CARD_WIDTH, CARD_LENGTH);
  };
  img.src = "./images/card" + num + ".png";
}

function drawCardBottom(x, y, isCatch) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.strokeRect(x, y, CARD_WIDTH, CARD_LENGTH);
  };
  var name;
  if (isCatch) {
    name = "catch";
  } else {
    name = "cheese";
  }
  img.src = "./images/card_" + name + ".png";
}

// HANDLERS
function onMouseClick() {
  if (getCubePressed()) {
    return;
  }
  drawCube(pressCube());
  drawText(getCurrentText());
}

function onKeydown(event) {
  let num = event.keyCode - 48;
  if (num < 1 || num > 6) {
    return;
  }
  next(num);
}

function next(num) {
  let curState = getCurrentState();
  switch (curState) {
    case 1:
      watchCard(num);
      drawText(resetState());
      break;
    case 2:
      drawText(chooseTakeOrRemove(num));
      break;
    case 3:
      takeToHand(num);
      break;
    case 4:
      remove(num);
      break;
  }
}

function watchCard(num) {
  let pantryCards = getPantry();
  let cardIdxToWatch = num - 1;
  let cardToWatch = pantryCards[cardIdxToWatch];
  // get card coordinates
  const PANTRY_X = CUBE_X + CUBE_WIDTH + 50;
  const PANTRY_Y = CUBE_Y;
  let cardX =
    PANTRY_X + CARD_WIDTH * cardIdxToWatch + PANTRY_OFFSET * cardIdxToWatch;
  setTimeout(function () {
    drawCardNumHighlighted(cardX, PANTRY_Y, cardToWatch.value);
  }, 2000);

  setTimeout(function () {
    drawCardBottom(cardX, PANTRY_Y, cardToWatch.catch);
  }, 3000);

  setTimeout(function () {
    drawCardNum(cardX, PANTRY_Y, cardToWatch.value);
  }, 1000);
}

function takeToHand(num) {
  let pantryCards = getPantry();
  let cardIdxToTake = num - 1;
  let cardToTake = pantryCards[cardIdxToTake];
  // calc coordinates of the card in pantry
  // clear card in pantry
  // draw card in a hand space
  // playerCard += this card
  // pantry cards -= this card
  // reset state -> 0
}

function remove(num) {
  let pantryCards = getPantry();
  let cardIdxToTake = num - 1;
  let cardToRemove = pantryCards[cardIdxToTake];
  // calc coordinates of the card in pantry
  // clear card in pantry
  // discard += this card
  // pantry cards -= this card
  // reset state -> 0
}
