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
} from "./mechanics.js";

var canvas = document.getElementById("cheesyCanvas");
var ctx = canvas.getContext("2d");
// objects parameters
const PANTRY_SIZE = 6;
const CUBE_X = 10;
const CUBE_Y = 150;
const CUBE_WIDTH = 40;
const CUBE_LENGTH = 40;
const CARD_WIDTH = 60;
const CARD_LENGTH = 80;

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
  const PANTRY_OFFSET = 10;
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

// HANDLERS
function onMouseClick() {
  if (getCubePressed()) {
    return;
  }
  drawCube(pressCube());
  drawText(getCurrentText());
}

function onKeydown(event) {
  num = event.code - 48;
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
      break;
    case 2:
      chooseTakeOrRemove(num);
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
  drawBorder(x, y, cardIdxToWatch);
  // sleep 2
  drawBottom(x, y, cardToWatch);
  // sleep 3
  drawCardNum(x, y, cardToWatch.value);
}

function drawBorder(x, y, idx) {
  // calculate coordinates of the card and draw a border around it
}

function drawBottom(x, y, card) {
  let isCatch = card.catch;
  if (isCatch) {
    // draw a card with catch
  } else {
    // draw a card without catch
  }
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
