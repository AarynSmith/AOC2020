const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8');
const example = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10
`;

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 306;
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(34005);
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const expected = 291;
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Infinite Game", () => {
    const infExample = `Player 1:
43
19

Player 2:
2
29
14
`;
    const expected = 105
    test(`should return ${expected}`, () => {
      expect(idx.part2(infExample)).to.equal(expected);
    })
  })
  suite("Input", function() {
    this.timeout(0);
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(32731);
    });
  });
});
