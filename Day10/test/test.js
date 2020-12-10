const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split('\n')
  .filter(v => v !== '')
  .map(Number);
const example1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const example2 = [
  28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24,
  23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35,
  8, 17, 7, 9, 4, 2, 34, 10, 3
];


suite('Part 1', () => {
  suite("Examples", () => {
    test('should return 35', () => {
      expect(idx.part1(example1)).to.equal(35);
    });
    test('should return 220', () => {
      expect(idx.part1(example2)).to.equal(220);
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
    test('should return 8', () => {
      expect(idx.part2(example1)).to.equal(8);
    })
    test('should return 19208', () => {
      expect(idx.part2(example2)).to.equal(19208);
    })
  })
  suite("Input", () => {
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
    });
  });
});
