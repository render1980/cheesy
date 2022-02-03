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

const texts = [
  "New round has started!\n\
  Roll the dice! Press mouse to do it.",

  "Great! Now you can take any card from pantry and watch it.\n\
  Please, press a keyboard button [1..6] that is the target card position (from the left).",

  "Great! There is at least one card in pantry which value is related to the cube value. \
  You can choose any of two options: \n\
  1. Take such card to your hand. \n\
  2. Remove such card from the game. \n\
  Please, press a keyboard button [1..2] to choose the action.",

  "Please, press a keyboard button [1..6] that is the position (from the left)\n\
  of the card you want to take to your hand.",

  "Please, press a keyboard button [1..6] that is the position (from the left)\n\
  of the card you want to remove from the game."
];

const PANTRY_CARDS_COUNT = 6;

/**
* 0 - Beginning of the round
* 1 - Watch a card from entry
* 2 - Take to the hand / remove a card from the game
* 3 - Take a card to the hand
* 4 - Remove a card from the game
*/
var curState = 0;
// Table objects
var pantry = [];
var deck = [];
var discard = [];
var hand = [];
// State
var cubePressed = false;
var cubeValue = 0;


function prepareTable() {
  var cards = shuffle();
  // first 6 -> Pantry
  pantry = cards.slice(0, 6);
  // others -> Deck
  deck = cards.slice(6, cards.length);
}

function newRound() {
  curState = 0;
  cubePressed = false;
  // if pantry hasn't got enough cards => put required amount of cards to the pantry
  let pantryCards = getPantry();
  if (pantryCards.length < PANTRY_CARDS_COUNT) {
    for (var i = 0; i < PANTRY_CARDS_COUNT - pantryCards.length; i++) {
      let newCard = deck.pop();
      pantry.push(newCard);
    }
  }
}

function getCurrentText() {
  return texts[curState];
}

function getCurrentState() {
  return curState;
}

function getCards() {
  return cards;
}

function getPantry() {
  return pantry;
}

function getCardFromPantry(idx) {
  return pantry[idx];
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

function setCubeValue(value) {
  cubeValue = value;
}

function getCubeValue() {
  return cubeValue;
}

function pressCube() {
  setCubePressed(true);
  let cubeValue = getRandomCubeNumber()
  setCubeValue(cubeValue);
  //setPlayerCubeNumber(cubeNumber);
  // When cube is pressed, check if any card with {cubeNumber} in pantry exists
  let pantryCardsWithCubeValue = getPantry().filter(v => v.value == cubeValue);
  if (pantryCardsWithCubeValue.length > 0) {
    // Player can take related card to hand or remove it from the game
    curState += 2;
  } else {
    // Player should take any card from pantry and watch it
    curState += 1;
  }
  return cubeValue;
}

function shuffle() {
  let shuffledCards = getCards().sort(() => Math.random() - 0.666);
  console.log(shuffledCards);
  return shuffledCards;
}

function getRandomCubeNumber() {
  return Math.floor(Math.random() * Math.floor(7));
}

function chooseTakeOrRemove(num) {
  if (num == 1 || num == 2) {
    curState += num;
  }
  return texts[curState];
}

function takeToHand(cardIdx) {
  let card = pantry.splice(cardIdx, 1);
  hand.push(card);
  newRound();
}

function removeFromPantry(cardIdx) {
  console.log('pantry before removing: %o', pantry);
  let card = pantry.splice(cardIdx, 1);
  console.log('remove from pantry: %o', card);
  console.log('pantry after removing: %o', pantry);
  newRound();
  console.log('deck after new round: %o', deck);
}

export {
  getRandomCubeNumber,
  prepareTable,
  getPantry,
  getDeck,
  getCubePressed,
  pressCube,
  getCurrentText,
  getCurrentState,
  chooseTakeOrRemove,
  newRound,
  takeToHand,
  removeFromPantry,
  getCubeValue
};
