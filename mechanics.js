import { getCards } from './entities.js'

export function shuffle() {
  let shuffledCards = getCards().sort(() => Math.random() - 0.666)
  console.log(shuffledCards)
  return shuffledCards
}
