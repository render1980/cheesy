import { getRandomCubeNumber, shuffle } from "./mechanics.js";
// Table objects
var pantry = [];
var deck = [];
var discard = [];
var cubeValue = 0;

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
// states
var cubePressed = false;

main();

function main() {
  prepareTable();
  console.log(pantry);
  console.log(deck);
  drawDeck();

  var cubeNumber = getRandomCubeNumber();
  drawCube(cubeNumber);

  drawPantry();
  addEventListeners();
}

function addEventListeners() {
  document.addEventListener("mousedown", onCubeMouseClick, false);
}

function prepareTable() {
  var cards = shuffle();
  // first 6 -> Pantry
  pantry = cards.slice(0, 6);
  // others -> Deck
  deck = cards.slice(6, cards.length);
}

function drawDeck() {
  const DECK_X = 10;
  const DECK_Y = 10;
  const DECK_OFFSET = 5;
  drawCard(DECK_X, DECK_Y, getRandomCubeNumber());
  drawCard(DECK_X + DECK_OFFSET, DECK_Y + DECK_OFFSET, getRandomCubeNumber());
}

function drawCube(num) {
  ctx.clearRect(CUBE_X, CUBE_Y, CUBE_WIDTH, CUBE_LENGTH);
  var img = new Image(CUBE_WIDTH, CUBE_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, CUBE_X, CUBE_Y);
    ctx.beginPath();
    ctx.stroke();
  };
  img.src = "./images/cube" + num + ".png";
}

function drawPantry() {
  const PANTRY_X = CUBE_X + CUBE_WIDTH + 50;
  const PANTRY_Y = CUBE_Y;
  const PANTRY_OFFSET = 10;
  var x = PANTRY_X;
  for (var i = 0; i < PANTRY_SIZE; i++) {
    drawCard(x, PANTRY_Y, pantry[i].value);
    x = x + CARD_WIDTH + PANTRY_OFFSET;
  }
}

function drawCard(x, y, num) {
  var img = new Image(CARD_WIDTH, CARD_LENGTH);
  img.onload = function () {
    ctx.drawImage(img, x, y);
    ctx.beginPath();
    ctx.stroke();
  };
  img.src = "./images/card" + num + ".png";
}

function onCubeMouseClick(e) {
  cubePressed = true;
  var cubeNumber = getRandomCubeNumber();
  drawCube(cubeNumber);
}
