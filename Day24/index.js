"use strict";

const splitDir = (list) => {
  const dirs = [];
  while (list.length > 0) {
    if (['e', 'w'].includes(list[0])) {
      dirs.push(list[0]);
      list = list.substr(1);
    } else {
      dirs.push(list.substr(0, 2));
      list = list.substr(2);
    }
  }
  return dirs;
}

const dirToHex = (dirList) => {
  const ref = {x: 0, z: 0, y: 0};
  for (const dir of dirList) {
    switch (dir) {
      case 'e': ref.x += 1; ref.y -= 1; break;
      case 'w': ref.x -= 1; ref.y += 1; break;
      case 'ne': ref.x += 1; ref.z -= 1; break;
      case 'sw': ref.x -= 1; ref.z += 1; break;
      case 'nw': ref.z -= 1; ref.y += 1; break;
      case 'se': ref.z += 1; ref.y -= 1; break;
      default: console.log("Unknown Direction", dir);

    }
  }
  return ref;
}

const stringify = hex => `(${hex.x},${hex.z},${hex.y})`

function part1(input) {
  const onTiles = new Set()
  for (const path of input.filter(v => v !== '')) {
    const dirs = splitDir(path);
    const tile = stringify(dirToHex(dirs));
    if (onTiles.has(tile)) onTiles.delete(tile)
    else onTiles.add(tile);
  }
  return onTiles.size
}

class FloorTiles {
  constructor() {
    this.tiles = {};
  }

  setTile(tile, status = false) {
    if (!this.tiles[tile.z]) this.tiles[tile.z] = {};
    if (!this.tiles[tile.z][tile.y]) this.tiles[tile.z][tile.y] = {};
    if (status)
      this.tiles[tile.z][tile.y][tile.x] = tile;
    else
      delete this.tiles[tile.z][tile.y][tile.x];
  }

  toggleTile(tile) {
    if (!this.tiles[tile.z]) this.tiles[tile.z] = {};
    if (!this.tiles[tile.z][tile.y]) this.tiles[tile.z][tile.y] = {};
    if (this.tiles[tile.z][tile.y][tile.x]) delete this.tiles[tile.z][tile.y][tile.x];
    else this.tiles[tile.z][tile.y][tile.x] = tile;
  }

  isActive(z, y, x) {
    return !(!this.tiles[z] || !this.tiles[z][y] || !this.tiles[z][y][x])
  }
  isActiveTile(tile) {
    return this.isActive(tile.z, tile.y, tile.x);
  }

  activeTiles() {
    const tiles = [];
    for (const z in this.tiles)
      for (const y in this.tiles[z])
        for (const x in this.tiles[z][y])
          tiles.push(this.tiles[z][y][x]);
    return tiles;
  }

  adjTiles(tile) {
    const dirs = [
      {x: 1, z: 0, y: -1},// ne
      {x: 1, z: -1, y: 0},// e
      {x: 0, z: -1, y: 1},// se
      {x: -1, z: 0, y: 1},// sw
      {x: -1, z: +1, y: 0},// w
      {x: 0, z: 1, y: -1},// nw
    ]
    return dirs.map(v => {
      v.z += tile.z
      v.y += tile.y
      v.x += tile.x
      return v;
    })
  }
}

function part2(input, days = 100) {
  const floor = new FloorTiles();

  for (const path of input.filter(v => v !== '')) {
    const dirs = splitDir(path);
    const tile = dirToHex(dirs);
    floor.toggleTile(tile);
  }

  for (let day = 0; day < days; day++) {
    const checkedTiles = new Map();
    for (const onTile of floor.activeTiles()) {
      for (const tile of [onTile, ...floor.adjTiles(onTile)]) {
        const tileStr = stringify(tile);
        if (!checkedTiles.has(tileStr)) {
          const status = floor.isActiveTile(tile);
          const neighborCount = floor.adjTiles(tile)
            .map(v => floor.isActiveTile(v) ? 1 : 0)
            .reduce((a, v) => a + v);
          let newStatus = null;
          if (status &&
            neighborCount === 0 ||
            neighborCount > 2) newStatus = false;
          if (!status &&
            neighborCount === 2) newStatus = true;
          checkedTiles.set(tileStr, {tile, newStatus})
        }
      }
    }
    for (const change of checkedTiles.values())
      if (change.newStatus !== null)
        floor.setTile(change.tile, change.newStatus)
  }
  return floor.activeTiles().length
}
module.exports = {part1, part2, dirToHex, splitDir};