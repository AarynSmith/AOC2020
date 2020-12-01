const fs = require('fs');

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split('\n').map(Number);
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));

});

function part1(expenses) {
  for (x of expenses) {
    for (y of expenses) {
      if (x + y === 2020) return x * y;
    }
  }
}
function part2(expenses) {
  for (x of expenses) {
    for (y of expenses) {
      for (z of expenses) {
        if (x + y + z === 2020) return x * y * z
      }
    }
  }
}