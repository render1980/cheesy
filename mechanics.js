const cards = [
    {"value": 1, "catch": true},
    {"value": 1, "catch": true},
    {"value": 1, "catch": false},
    {"value": 1, "catch": false},
    {"value": 1, "catch": false},
    {"value": 1, "catch": false},
    {"value": 2, "catch": true},
    {"value": 2, "catch": true},
    {"value": 2, "catch": false},
    {"value": 2, "catch": false},
    {"value": 2, "catch": false},
    {"value": 2, "catch": false},
    {"value": 3, "catch": true},
    {"value": 3, "catch": true},
    {"value": 3, "catch": true},
    {"value": 3, "catch": false},
    {"value": 3, "catch": false},
    {"value": 3, "catch": false},
    {"value": 4, "catch": true},
    {"value": 4, "catch": true},
    {"value": 4, "catch": true},
    {"value": 4, "catch": false},
    {"value": 4, "catch": false},
    {"value": 4, "catch": false},
    {"value": 5, "catch": true},
    {"value": 5, "catch": true},
    {"value": 5, "catch": false},
    {"value": 5, "catch": false},
    {"value": 5, "catch": false},
    {"value": 5, "catch": false},
    {"value": 6, "catch": true},
    {"value": 6, "catch": true},
    {"value": 6, "catch": false},
    {"value": 6, "catch": false},
    {"value": 6, "catch": false},
    {"value": 6, "catch": false},
]

function getCards() {
  return cards
}

function shuffle() {
  let shuffledCards = getCards().sort(() => Math.random() - 0.666)
  console.log(shuffledCards)
  return shuffledCards
}

function getRandomCubeNumber() {
  return Math.floor(Math.random() * Math.floor(6));
}

export {shuffle, getRandomCubeNumber};
