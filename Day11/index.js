class CellularMap {
  constructor(grid, visible = false, tolerance = 4) {
    this.Map = grid.map(v => v.split(''));
    this.Visible = visible;
    this.Tolerance = tolerance;
    this.h = this.Map.length;
    this.w = this.Map[0].length;
  }
  copy() {
    const newGrid = this.Map.map(v => v.join('')).slice()
    return newGrid.map(v => v.split(''));
  }
  serialize = () => this.Map.map(v => v.join('')).join('');
  step() {
    const next = this.copy();
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        switch (this.Map[y][x]) {
          case 'L':
            if (this.countOccupied(y, x) === 0) next[y][x] = '#'
            break;
          case '#':
            if (this.countOccupied(y, x) >= this.Tolerance) next[y][x] = 'L'
        }
      }
    }
    this.Map = next;
  }
  countOccupied(y, x) {
    let count = 0;
    if (this.Visible) {
      const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*[0,0]*/[0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      for (const dir of dirs) {
        let dy = y + dir[0],
          dx = x + dir[1];
        while (dy >= 0 && dy < this.h && dx >= 0 && dx < this.w) {
          if (this.Map[dy][dx] === '#') count++;
          if (this.Map[dy][dx] !== '.') break;
          dy += dir[0];
          dx += dir[1];
        }
      }
    } else {
      for (const dy of [y - 1, y, y + 1]) {
        for (const dx of [x - 1, x, x + 1]) {
          if (dy < 0 || dy > this.h ||
            dx < 0 || dx > this.w ||
            (dx === x && dy === y)) continue;
          if (this.Map[dy][dx] === '#') count++
        }
      }
    }
    return count;
  }
  count(type) {
    let count = 0;
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.Map[y][x] === type) count++
      }
    }
    return count;
  }
}

function part1(input) {
  const grid = new CellularMap(input);
  let s;
  while (s !== grid.serialize()) {
    s = grid.serialize();
    grid.step();
  }
  return grid.count('#');
}

function part2(input) {
  const grid = new CellularMap(input, true, 5);
  let s;
  while (s !== grid.serialize()) {
    s = grid.serialize();
    grid.step();
  }
  return grid.count('#');
}

module.exports = {part1, part2, CellularMap};