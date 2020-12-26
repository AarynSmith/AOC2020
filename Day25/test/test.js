const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
const example = `5764801
17807724`.split('\n');

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = 14897079;
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(3286137);
    });
  });
});
