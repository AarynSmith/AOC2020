const fs = require('fs');

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split('\n').filter(v => v !== '');
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));

});

const parse = (code) => {
  const rowCode = code.substr(0, 7).split('');
  const seatCode = code.substr(7, 3).split('');

  let rows = new Array(128).fill(0).map((_, i) => i);
  for (id of rowCode) {
    if (id == "F") rows = rows.splice(0, rows.length / 2);
    else rows = rows.splice(rows.length / 2, rows.length);
  }

  let seats = new Array(8).fill(0).map((_, i) => i);
  for (id of seatCode) {
    if (id == "L") seats = seats.splice(0, seats.length / 2);
    else seats = seats.splice(seats.length / 2, seats.length);
  }
  return rows[0] * 8 + seats[0];
}

function part1(boardingPasses) {
  let max = 0;
  boardingPasses.forEach(pass => {
    const s = parse(pass)
    max = max < s ? s : max;
  })
  return max;
}

function part2(boardingPasses) {
  let min = Infinity;
  let max = -Infinity;
  const seats = {};
  boardingPasses.forEach(pass => {
    const sID = parse(pass);
    min = min < sID ? min : sID;
    max = max < sID ? sID : max;
    seats[sID] = pass;
  })
  for (let i = min; i <= max; i++) {
    if (seats[i] === undefined) return i;
  }
}