import { shuffle, getRandomCubeNumber } from "./mechanics.js";

const CUBE_X = 10;
const CUBE_Y = 150;
const CUBE_WIDTH = 40;
const CUBE_LENGTH = 40;
const CARD_WIDTH = 60;
const CARD_LENGTH = 80;

var pantry = [];
var deck = [];
var discard = [];
var cubeValue = 0;

var canvas = document.getElementById("cheesyCanvas");
var ctx = canvas.getContext("2d");

main();

function main() {
  prepareTable();
  console.log(pantry);
  console.log(deck);
  cubeNumber = getRandomCubeNumber()
  drawDeck();
  drawCube(cubeNumber);
  drawPantry();
}

function prepareTable() {
  var cards = shuffle();
  // first 6 -> Pantry
  pantry = cards.slice(0, 6);
  // others -> Deck
  deck = cards.slice(6, cards.length);
}

function drawCard(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, CARD_WIDTH, CARD_LENGTH);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";

  // TODO: + border
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawPantry() {
  const PANTRY_X = CUBE_X + CUBE_WIDTH + 50;
  const PANTRY_Y = 150;
  const PANTRY_OFFSET = 10;
  var x = PANTRY_X;
  for (var i = 0; i < 6; i++) {
    drawCard(x, PANTRY_Y);
    x = x + CARD_WIDTH + PANTRY_OFFSET;
  }
}

function drawDeck() {
  const DECK_X = 10;
  const DECK_Y = 10;
  const DECK_OFFSET = 5;
  drawCard(DECK_X, DECK_Y);
  drawCard(DECK_X + DECK_OFFSET, DECK_Y + DECK_OFFSET);
}

function drawCube(num) {
  ctx.beginPath();
  ctx.rect(CUBE_X, CUBE_Y, CUBE_LENGTH, CUBE_WIDTH);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";

  // TODO: + cube points
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
