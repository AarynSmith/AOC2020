const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')

suite('Part 1', () => {
  suite("Examples", () => {
    const Tests = [
      [['1 + 2 * 3 + 4 * 5 + 6'], 71],
      [['1 + (2 * 3) + (4 * (5 + 6))'], 51],
      [['2 * 3 + (4 * 5)'], 26],
      [['5 + (8 * 3 + 9 + 3 * 4 * 3)'], 437],
      [['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'], 12240],
      [['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'], 13632],
    ]
    for (const [example, expected] of Tests) {
      test(`${example} should return ${expected}`, () => {
        expect(idx.part1(example)).to.equal(expected);
      });
    }
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(45283905029161);
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const Tests = [
      [['1 + (2 * 3) + (4 * (5 + 6))'], 51],
      [['1 + 2 * 3 + 4 * 5 + 6'], 231],
      [['2 * 3 + (4 * 5)'], 46],
      [['5 + (8 * 3 + 9 + 3 * 4 * 3)'], 1445],
      [['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'], 669060],
      [['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'], 23340],
    ]
    for (const [example, expected] of Tests) {
      test(`${example} should return ${expected}`, () => {
        expect(idx.part2(example)).to.equal(expected);
      });
    }
  });
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(216975281211165)
    });
  });
});
