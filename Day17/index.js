class PocketDim {
  constructor(initialState, fourDim = false) {
    const state = initialState.split('\n').map(v => v.split(''));
    this.fourDim = fourDim;
    this.space = {}
    this.min = {
      w: 0, z: 0,
      y: -(state.length - 1) / 2,
      x: -(state[0].length - 1) / 2
    }
    this.max = {
      w: 0, z: 0,
      y: +(state.length - 1) / 2,
      x: +(state[0].length - 1) / 2
    }
    let z = 0
    let w = 0;
    for (let y in state) {
      y = Number(y)
      for (let x in state[y]) {
        x = Number(x)
        this.set(w, z, y + this.min.y, x + this.min.x, state[y][x])
      }
    }
  }

  get = (w, z, y, x, space = this.space) => {
    if (!space[w]) return '.'
    if (!space[w][z]) return '.'
    if (!space[w][z][y]) return '.'
    if (!space[w][z][y][x]) return '.'
    return space[w][z][y][x];
  }

  set = (w, z, y, x, value, space = this.space) => {
    if (!space[w]) space[w] = {}
    if (!space[w][z]) space[w][z] = {};
    if (!space[w][z][y]) space[w][z][y] = {};
    if (value === '.') delete (space[w][z][y][x])
    else {
      if (w > this.max.w) this.max.w = w;
      if (w < this.min.w) this.min.w = w;
      if (z > this.max.z) this.max.z = z;
      if (z < this.min.z) this.min.z = z;
      if (y > this.max.y) this.max.y = y;
      if (y < this.min.y) this.min.y = y;
      if (x > this.max.x) this.max.x = x;
      if (x < this.min.x) this.min.x = x;
      space[w][z][y][x] = value;
    }
    if (!Object.values(space[w][z][y]).some(v => v === '#'))
      delete space[w][z][y];
    if (!Object.values(space[w][z]).some(v =>
      Object.values(v).some(v => v === '#')))
      delete space[w][z];
    if (!Object.values(space[w]).some(v =>
      Object.values(v).some(v =>
        Object.values(v).some(v => v === '#'))))
      delete space[w];
  }


  step = () => {
    const newSpace = this.copySpace();
    for (let w = this.min.w - 1; w <= this.max.w + 1; w++) {
      if (!this.fourDim && w != 0) continue;
      for (let z = this.min.z - 1; z <= this.max.z + 1; z++) {
        for (let y = this.min.y - 1; y <= this.max.y + 1; y++) {
          for (let x = this.min.x - 1; x <= this.max.x + 1; x++) {
            const adj = this.countAdj(w, z, y, x);
            const curr = this.get(w, z, y, x);
            if (curr === '#' && adj !== 2 && adj !== 3)
              this.set(w, z, y, x, '.', newSpace);
            if (curr === '.' && adj === 3)
              this.set(w, z, y, x, '#', newSpace);
          }
        }
      }
    }
    this.space = newSpace;
  }

  countAdj = (w, z, y, x) => {
    let count = 0;
    for (let dw = w - 1; dw <= w + 1; dw++) {
      if (!this.fourDim && dw !== 0) continue;
      for (let dz = z - 1; dz <= z + 1; dz++)
        for (let dy = y - 1; dy <= y + 1; dy++)
          for (let dx = x - 1; dx <= x + 1; dx++) {
            if (dw === w && dz === z && dy === y && dx === x) continue
            if (this.get(dw, dz, dy, dx) === '#') count++;
          }
    }
    return count;
  }

  countCells = () => {
    let count = 0;
    for (let w = this.min.w; w <= this.max.w; w++)
      for (let z = this.min.z; z <= this.max.z; z++)
        for (let y = this.min.y; y <= this.max.y; y++)
          for (let x = this.min.x; x <= this.max.x; x++)
            if (this.get(w, z, y, x) === '#') count++;
    return count
  }

  copySpace = () => {
    const newSpace = {};
    for (const w in this.space) {
      if (newSpace[w] === undefined) newSpace[w] = {}
      for (const z in this.space[w]) {
        if (newSpace[w][z] === undefined) newSpace[w][z] = {}
        for (const y in this.space[w][z]) {
          if (newSpace[w][z][y] === undefined) newSpace[w][z][y] = {}
          newSpace[w][z][y] = {...this.space[w][z][y]}
        }
      }
    }
    return newSpace;
  }

  toString = (space) => {
    let str = ""
    for (let w = this.min.w; w <= this.max.w; w++) {
      for (let z = this.min.z; z <= this.max.z; z++) {
        str += "z=" + z + " w=" + w + "\n";
        for (let y = this.min.y; y <= this.max.y; y++) {
          for (let x = this.min.x; x <= this.max.x; x++)
            str += this.get(z, y, x, space);
          str += "\n";
        }
        str += "\n"
      }
    }
    return str;
  }
}
function part1(input) {
  const pocket = new PocketDim(input);
  for (let i = 0; i < 6; i++) {
    pocket.step();
  }
  return pocket.countCells();
}

function part2(input) {
  const pocket = new PocketDim(input, true);
  for (let i = 0; i < 6; i++) {
    pocket.step();
  }
  return pocket.countCells();
}
module.exports = {part1, part2};