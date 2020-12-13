function part1(input) {
  const earliestTs = Number(input[0]);
  const inService = input[1].split(',').filter(v => v !== 'x').map(Number);
  let time = earliestTs;
  while (time < earliestTs * 2) {
    time++;
    for (const bus of inService) {
      if (time % bus === 0) {
        return (time - earliestTs) * bus;
      }
    }
  }
}

function part2(input) {
  const absMod = (a, n) => {
    while (a < 0) a += n;
    return a % n;
  }

  const busSchedule = input[1].split(',')
    .map((id, i) => ({id: parseInt(id.trim()), i}))
    .filter(bus => !Number.isNaN(bus.id))
    .sort((b1, b2) => b2.id - b1.id)
    .map(bus => ({
      id: BigInt(bus.id),
      offset: BigInt(absMod(bus.id - bus.i, bus.id))
    }));

  let cN = busSchedule[0].id;
  let cA = busSchedule[0].offset;
  for (let i = 1; i < busSchedule.length; i++) {
    const bus = busSchedule[i];
    while (cA % bus.id !== bus.offset) {
      cA += cN;
    }
    cN *= bus.id;
  }
  return Number(cA);
}
module.exports = {part1, part2};