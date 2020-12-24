const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
const example = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew
`.split('\n');

suite('Splitting Directions', () => {
  const tTable = [
    ['e', ['e']],
    ['sw', ['sw']],
    ['ee', ['e', 'e']],
    ['esw', ['e', 'sw']],
    ['see', ['se', 'e']],
    ['nenwewsesw', ['ne', 'nw', 'e', 'w', 'se', 'sw']]
  ];
  for (const [dir, expected] of tTable) {
    test(dir, () => {
      expect(idx.splitDir(dir)).to.deep.equal(expected);
    })
  }
});

suite('Parsing Test', () => {
  suite('Cardinal Directions', () => {
    const tTable = [
      [['e'], {x: 1, z: 0, y: -1}],
      [['se'], {x: 0, z: 1, y: -1}],
      [['sw'], {x: -1, z: 1, y: 0}],
      [['w'], {x: -1, z: 0, y: 1}],
      [['nw'], {x: 0, z: -1, y: 1}],
      [['ne'], {x: 1, z: -1, y: 0}],
    ];
    for (const [dir, expected] of tTable) {
      test(dir.join(','), () => {
        expect(idx.dirToHex(dir)).to.deep.equal(expected);
      })
    }
  });
});

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 10;
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(469);
    });
  });
});

suite('Part 2', () => {
  suite("Daily", () => {
    const testTable = [
      [0, 10],
      [1, 15],
      [2, 12],
      [3, 25],
      [4, 14],
      [5, 23],
      [6, 28],
      [7, 41],
      [8, 37],
      [9, 49],
      [10, 37],
      [20, 132],
      [30, 259],
      [40, 406],
      [50, 566],
      [60, 788],
      [70, 1106],
      [80, 1373],
      [90, 1844],
      [100, 2208],

    ];
    for (const [days, num] of testTable) {
      test(`${days} => ${num}`, () => {
        expect(idx.part2(example, days)).to.equal(num);
      })
    }
  })
  suite("Examples", () => {
    const expected = 2208;
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(4353);
    });
  });
});
