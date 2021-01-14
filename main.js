import {shuffle} from './mechanics.js';

var pantry = [];
var deck = [];
var discard = [];
var cubeValue = 0;

var canvas = document.getElementById("cheesyCanvas");
var ctx = canvas.getContext("2d");

prepareTable();
console.log(pantry);
console.log(deck);

function prepareTable() {
  var cards = shuffle();
  // first 6 -> Pantry
  pantry = cards.slice(0, 6);
  // others -> Deck
  deck = cards.slice(6, cards.length);
}
