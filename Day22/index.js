"use strict";

function part1(input) {
  const [p1deck, p2deck] = input.split('\n\n').
    map(v => v.split('\n')
      .filter(v => v !== '' && !Number.isNaN(Number(v)))
      .map(Number));
  while (p1deck.length > 0 && p2deck.length > 0) {
    const [p1, p2] = [p1deck.shift(), p2deck.shift()];
    if (p1 > p2) p1deck.push(p1, p2);
    else p2deck.push(p2, p1);
  }
  return p1deck.concat(p2deck)
    .reduce((acc, v, i, arr) => acc + ((arr.length - i) * v), 0)
}

function part2(input) {
  const stringify = (p1Deck, p2Deck) => JSON.stringify({p1Deck, p2Deck})
  const playGame = (p1Deck, p2Deck) => {
    const gameCache = new Set();
    while (p1Deck.length > 0 && p2Deck.length > 0) {
      const gameString = stringify(p1Deck, p2Deck);
      if (gameCache.has(gameString)) return {winner: 1, p1Deck, p2Deck};
      gameCache.add(gameString);
      const p1 = p1Deck.shift();
      const p2 = p2Deck.shift();
      let winner = null;
      if (p1 <= p1Deck.length && p2 <= p2Deck.length) {
        winner = playGame(p1Deck.slice(0, p1), p2Deck.slice(0, p2)).winner;
      } else {
        winner = p1 > p2 ? 1 : 2;
      }

      switch (winner) {
        case 1: p1Deck.push(p1, p2); break;
        case 2: p2Deck.push(p2, p1); break;
        default: console.log("Error");
      }
    }

    return {winner: p1Deck.length !== 0 ? 1 : 2, p1Deck, p2Deck}
  }

  const [p1Deck, p2Deck] = input.split('\n\n').
    map(v => v.split('\n')
      .filter(v => v !== '' && !Number.isNaN(Number(v)))
      .map(Number));

  const results = playGame(p1Deck.slice(), p2Deck.slice())
  if (results.winner === 1)
    return results.p1Deck.reduce((acc, v, i, arr) => acc + ((arr.length - i) * v), 0)
  return results.p2Deck.reduce((acc, v, i, arr) => acc + ((arr.length - i) * v), 0)
}
module.exports = {part1, part2};