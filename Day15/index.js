const memoryGame = (input, numTurns) => {
  let last = input[input.length - 1];
  const numHist = new Map(input.map((v, i) => [v, i + 1]));
  for (let idx = input.length; idx < numTurns; idx++) {
    const next = numHist.has(last) ? idx - numHist.get(last) : 0;
    numHist.set(last, idx);
    last = next;
  }
  return last;
}

function part1(input) {
  return memoryGame(input, 2020);
}

function part2(input) {
  return memoryGame(input, 30000000);
}

module.exports = {part1, part2, memoryGame};