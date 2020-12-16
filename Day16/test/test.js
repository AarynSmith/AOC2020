const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')

suite('Part 1', () => {
  suite("Examples", () => {
    const example = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`.split('\n');
    const expected = 71
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(27850); // Fill this in
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const example = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`.split('\n');
    const rowSeat = 11 * 13
    test(`should return ${rowSeat}`, () => {
      expect(idx.part2(example, /row|seat/)).to.equal(rowSeat);
    });
    const allThree = 11 * 12 * 13
    test(`should return ${allThree}`, () => {
      expect(idx.part2(example)).to.equal(allThree);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input, /departure/);
      console.log("Part 2:", part2);
      expect(part2).to.equal(491924517533)
    });
  });
});
