const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
// .filter(v => v !== '')
const example = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`.split('\n');

suite('Adjacency', () => {
  suite("2 adjacent, 8 visible", () => {
    const example = ".......#.|...#.....|.#.......|.........|..#L....#|....#....|.........|#........|...#.....".split('|');
    const pos = [4, 3];
    test("Adjacent", () => {
      const grid = new idx.CellularMap(example, false);
      expect(grid.countOccupied(...pos, '#')).to.equal(2)
    })
    test("Visible", () => {
      const grid = new idx.CellularMap(example, true);
      expect(grid.countOccupied(...pos, '#')).to.equal(8)
    })
  })
  suite("0 adjacent, 0 visible", () => {
    const example = ".............|.L.L.#.#.#.#.|.............".split('|');
    const pos = [1, 1];
    test("Adjacent", () => {
      const grid = new idx.CellularMap(example, false);
      expect(grid.countOccupied(...pos, '#')).to.equal(0)
    })
    test("Visible", () => {
      const grid = new idx.CellularMap(example, true);
      expect(grid.countOccupied(...pos, '#')).to.equal(0)
    })
  })
  suite("0 adjacent, 0 visible", () => {
    const example = ".##.##.|#.#.#.#|##...##|...L...|##...##|#.#.#.#|.##.##.".split('|');
    const pos = [3, 3];
    test("Adjacent", () => {
      const grid = new idx.CellularMap(example, false);
      expect(grid.countOccupied(...pos, '#')).to.equal(0)
    })
    test("Visible", () => {
      const grid = new idx.CellularMap(example, true);
      expect(grid.countOccupied(...pos, '#')).to.equal(0)
    })
  })
})

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 37
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const expected = 26
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
    });
  });
});
