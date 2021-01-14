import {shuffle} from './mechanics.js';

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
  
  drawDeck();
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
  ctx.rect(x, y, 40, 50);
  ctx.fillStyle = "#FF0000";
  // TODO: + border
  ctx.fill();
  ctx.closePath();
}

function drawPantry() {

}

function drawDeck() {
  drawCard(40, 50);
  drawCard(45, 55);
}

function drawCube() {
  ctx.beginPath();
  ctx.rect(x, y, 20, 20);
  ctx.fillStyle = "#FFFFFF";
  // TODO: + cube points
  ctx.fill();
  ctx.closePath();  
}
