const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
const example = ``.split('\n');

suite('Part 1', () => {
  suite("Examples", () => {
    const expected = '' // Fill this in
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(); // Fill this in
    });
  });
});

suite('Part 2', () => {
  suite("Examples", () => {
    const expected = '' // Fill this in
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal() // Fill this in
    });
  });
});
