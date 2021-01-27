const cards = [
  { value: 1, catch: true },
  { value: 1, catch: true },
  { value: 1, catch: false },
  { value: 1, catch: false },
  { value: 1, catch: false },
  { value: 1, catch: false },
  { value: 2, catch: true },
  { value: 2, catch: true },
  { value: 2, catch: false },
  { value: 2, catch: false },
  { value: 2, catch: false },
  { value: 2, catch: false },
  { value: 3, catch: true },
  { value: 3, catch: true },
  { value: 3, catch: true },
  { value: 3, catch: false },
  { value: 3, catch: false },
  { value: 3, catch: false },
  { value: 4, catch: true },
  { value: 4, catch: true },
  { value: 4, catch: true },
  { value: 4, catch: false },
  { value: 4, catch: false },
  { value: 4, catch: false },
  { value: 5, catch: true },
  { value: 5, catch: true },
  { value: 5, catch: false },
  { value: 5, catch: false },
  { value: 5, catch: false },
  { value: 5, catch: false },
  { value: 6, catch: true },
  { value: 6, catch: true },
  { value: 6, catch: false },
  { value: 6, catch: false },
  { value: 6, catch: false },
  { value: 6, catch: false },
];

// Table objects
var pantry = [];
var deck = [];
var discard = [];
var cubeValue = 0;
// states
var cubePressed = false;

function prepareTable() {
  var cards = shuffle();
  // first 6 -> Pantry
  pantry = cards.slice(0, 6);
  // others -> Deck
  deck = cards.slice(6, cards.length);
}

function getCards() {
  return cards;
}

function getPantry() {
  return pantry;
}

function getDeck() {
  return deck;
}

function getCubePressed() {
  return cubePressed;
}

function setCubePressed(pressed) {
  cubePressed = pressed;
}

function shuffle() {
  let shuffledCards = getCards().sort(() => Math.random() - 0.666);
  console.log(shuffledCards);
  return shuffledCards;
}

function getRandomCubeNumber() {
  return Math.floor(Math.random() * Math.floor(7));
}

export {
  shuffle,
  getRandomCubeNumber,
  prepareTable,
  getPantry,
  getDeck,
  getCubePressed,
  setCubePressed
};
