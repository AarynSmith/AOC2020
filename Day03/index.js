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

function part1(mapRows, slope = {x: 3, y: 1}) {
  const pos = {x: 0, y: 0};
  let treeCount = 0;
  const map = mapRows.map(v => v.split(''));
  while (pos.y + 1 < map.length) {
    pos.x += slope.x;
    pos.y += slope.y;
    if (map[pos.y][pos.x % map[pos.y].length] === '#') treeCount++;
  }
  return treeCount;
}

function part2(mapRows) {
  slopes = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
  ];
  return slopes.map(v => part1(mapRows, v)).reduce((acc, v) => acc * v);
}