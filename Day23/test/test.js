const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
const example = `389125467`;

suite('Part 1', () => {
  suite("Example Short", () => {
    const expected = 92658374;
    test(`should return ${expected}`, () => {
      expect(idx.part1(example, 10)).to.equal(expected);
    })
  })
  suite("Examples", () => {
    const expected = 67384529;
    test(`should return ${expected}`, () => {
      expect(idx.part1(example)).to.equal(expected);
    });
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(96342875);
    });
  });
});

suite('Part 2', function() {
  this.timeout(0);
  suite("Examples", () => {
    const expected = 149245887792
    test(`should return ${expected}`, () => {
      expect(idx.part2(example)).to.equal(expected);
    });
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(563362809504);
    });
  });
});
