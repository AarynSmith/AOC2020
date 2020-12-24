const cupGame = (rounds = 100, cups) => {
  let idx = 0;
  const maxCup = cups.reduce((max, v) => max < v ? v : max, -Infinity);
  for (let round = 1; round <= rounds; round++) {
    const curCup = cups[idx];
    const pickup = cups.splice(idx + 1, 3)
    if (pickup.length < 3) pickup.push(...cups.splice(0, 3 - pickup.length));
    let destIdx = null;
    let nextDest = curCup - 1;
    if (nextDest === 0) nextDest = maxCup;
    while (!cups[destIdx]) {
      destIdx = cups.indexOf(nextDest);
      if (!cups[destIdx]) nextDest -= 1;
      if (nextDest === 0) nextDest = maxCup;
    }
    cups = cups.slice(0, destIdx + 1).concat(pickup).concat(cups.slice(destIdx + 1))
    idx = cups.indexOf(curCup) + 1;
    if (idx >= cups.length) idx = 0;
  }
  return cups;
}

const advCupGame = (rounds = 100, cupArr) => {
  const cups = {};
  let last = null;
  for (const cup of cupArr) {
    cups[cup] = {val: cup, next: null}
    if (last) cups[last].next = cups[cup]
    last = cup;
  }
  cups[last].next = cups[cupArr[0]]

  let currCup = cups[cupArr[0]];
  for (let round = 1; round <= rounds; round++) {
    const pickup = [currCup.next];
    pickup[1] = pickup[0].next;
    pickup[2] = pickup[1].next;

    let destination = currCup.val - 1
    while (destination <= 0 ||
      pickup.map(v => v.val).includes(destination)) {
      if (destination <= 0) destination = last;
      else destination -= 1;
    }
    let prev = cups[destination]
    let oldNext = prev.next
    let next = pickup[2].next
    currCup.next = pickup[2].next
    prev.next = pickup[0]
    pickup[2].next = oldNext
    currCup = next
  }
  return [cups[1].next.val, cups[1].next.next.val];
}

function part1(input, rounds = 100) {
  cups = cupGame(rounds, input.split('').map(Number));
  while (cups.indexOf(1) !== 0) cups.push(cups.shift());
  return Number(cups.slice(1).join(''));
}

function part2(input, rounds = 10000000) {
  let cups = input.split('').map(Number);
  for (let i = Math.max(...cups) + 1; i <= 1000000; i++)
    cups.push(i);
  cups = advCupGame(rounds, cups);
  return cups.reduce((a, v) => a * v);
}

module.exports = {part1, part2};