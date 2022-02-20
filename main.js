import {
  getRandomCubeNumber,
  prepareTable,
  getPantry,
  getDeck,
  getCubePressed,
  getCubeValue,
  getCurrentText,
  getCurrentState,
  pressCube,
  chooseTakeOrRemove,
  newRound,
  takeToHand,
  removeFromPantry,
  checkGameOver,
} from "./mechanics.js";

var canvas = document.getElementById("cheesyCanvas");
var ctx = canvas.getContext("2d");
var hintsEnabled = true;
// objects parameters

const CUBE_X = 10;
const CUBE_Y = 150;
const CUBE_WIDTH = 40;
const CUBE_LENGTH = 40;
const PANTRY_SIZE = 6;
const PANTRY_Y = CUBE_Y;
const PANTRY_X = CUBE_X + CUBE_WIDTH + 50;
const PANTRY_OFFSET = 10;
const CARD_WIDTH = 60;
const CARD_LENGTH = 80;
const HIGHLIGHTED_CARD_BORDER_WIDTH = 4;
const HAND_Y = CUBE_Y * 2 + CARD_LENGTH;
const HAND_X = PANTRY_X;
const HAND_CARDS_OFFSET = CARD_WIDTH + PANTRY_OFFSET;

main();

function main() {
  prepareTable();
  console.log(getPantry());
  console.log(getDeck());

  drawDeck();
  drawCube(getRandomCubeNumber());
  drawPantry();
  drawText(
    "Let's play cheesy!\nHere will be hints.\nFirst, please roll the dice! Press mouse to do it."
  );

  addDocumentEventListeners();
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
  var x = PANTRY_X;
  for (var i = 0; i < PANTRY_SIZE; i++) {
    drawCardNum(x, PANTRY_Y, getPantry()[i].value);
    x = x + CARD_WIDTH + PANTRY_OFFSET;
  }
}

function drawCardNum(x, y, num) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    drawClearCard(x, y);
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, CARD_WIDTH, CARD_LENGTH);
  };
  img.src = "./images/card" + num + ".png";
}

function drawCardNumHighlighted(x, y, num) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.lineWidth = HIGHLIGHTED_CARD_BORDER_WIDTH;
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

function drawClearCard(x, y) {
  ctx.clearRect(
    x - 2,
    y - 2,
    CARD_WIDTH + HIGHLIGHTED_CARD_BORDER_WIDTH,
    CARD_LENGTH + HIGHLIGHTED_CARD_BORDER_WIDTH
  );
}

function drawWatchCard(num) {
  let pantryCards = getPantry();
  let cardIdxToWatch = num - 1;
  let cardToWatch = pantryCards[cardIdxToWatch];

  let cardX =
    PANTRY_X + CARD_WIDTH * cardIdxToWatch + PANTRY_OFFSET * cardIdxToWatch;
  setTimeout(function () {
    drawCardNumHighlighted(cardX, PANTRY_Y, cardToWatch.value);
  }, 1000);

  setTimeout(function () {
    drawCardBottom(cardX, PANTRY_Y, cardToWatch.catch);
  }, 3000);

  setTimeout(function () {
    drawCardNum(cardX, PANTRY_Y, cardToWatch.value);
  }, 5000);
}

function drawTakeToHand(num) {
  let pantryCards = getPantry();
  let cardIdxToTake = num - 1;
  let cardToTake = pantryCards[cardIdxToTake];

  if (cardToTake.value != getCubeValue()) {
    return;
  }

  // calc coordinates of the card in pantry
  let cardX =
    PANTRY_X + CARD_WIDTH * cardIdxToTake + PANTRY_OFFSET * cardIdxToTake;
  setTimeout(function () {
    drawCardNumHighlighted(cardX, PANTRY_Y, cardToTake.value);
  }, 1000);
  setTimeout(function () {
    drawClearCard(cardX, PANTRY_Y);
  }, 3000);

  setTimeout(function () {
    drawOnHand(cardToTake);
  }, 5000);

  //takeToHand(cardIdxToTake);
  let deck = getDeck();
  let newCard = deck[deck.length - 1];
  setTimeout(function () {
    drawCardNum(cardX, PANTRY_Y, newCard.value);
  }, 7000);
  takeToHand(cardIdxToTake);
  drawText(getCurrentText());
}

function drawOnHand(cardToTake) {
  if (cardToTake.catch) {
    drawCardBottom(HAND_X, HAND_Y, cardToTake.catch);
  } else {
    drawCardBottom(HAND_X + HAND_CARDS_OFFSET, HAND_Y, cardToTake.catch);
  }
}

function drawRemove(num) {
  let pantryCards = getPantry();
  let cardIdxToRemove = num - 1;
  let cardToRemove = pantryCards[cardIdxToRemove];

  if (cardToRemove.value != getCubeValue()) {
    return;
  }

  let cardX =
    PANTRY_X + CARD_WIDTH * cardIdxToRemove + PANTRY_OFFSET * cardIdxToRemove;
  setTimeout(function () {
    drawCardNumHighlighted(cardX, PANTRY_Y, cardToRemove.value);
  }, 1000);
  setTimeout(function () {
    drawClearCard(cardX, PANTRY_Y);
  }, 3000);
  removeFromPantry(cardIdxToRemove);
  let deck = getDeck();
  let newCard = deck[deck.length - 1];
  setTimeout(function () {
    drawCardNum(cardX, PANTRY_Y, newCard.value);
  }, 5000);
  drawText(getCurrentText());
}

// HANDLERS
function addDocumentEventListeners() {
  document.addEventListener("mousedown", onMouseClick, false);
  document.addEventListener("keydown", onKeydown, false);
}

function onMouseClick() {
  if (getCurrentState() == 5) {
    main();
    newRound();
    return;
  }

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
  let curState = getCurrentState();
  let gameOver = false;
  switch (curState) {
    case 1:
      drawWatchCard(num);
      newRound();
      drawText(getCurrentText());
      break;
    case 2:
      drawText(chooseTakeOrRemove(num));
      break;
    case 3:
      drawTakeToHand(num);
      gameOver = checkGameOver();
      if (gameOver) {
        drawText(getCurrentText());
      }
      break;
    case 4:
      drawRemove(num);
      gameOver = checkGameOver();
      if (gameOver) {
        drawText(getCurrentText());
      }
      break;
  }
}
