const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
const example = `939
7,13,x,x,59,x,31,19
`.split('\n');


suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 295
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(2406);
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const expected = 1068781
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(225850756401039)
    });
  });
});
