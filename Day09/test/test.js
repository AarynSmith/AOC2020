var chai = require('chai');
var expect = require('chai').expect;
var idx = require('../index');

suite('Example', () => {
  const example = [
    35, 20, 15, 25,
    47, 40, 62, 55,
    65, 95, 102, 117,
    150, 182, 127, 219,
    299, 277, 309, 576,
  ]
  suite("Part 1", () => {
    test('should return 127', () => {
      expect(idx.part1(5, example)).to.equal(127);
    })
  })
  suite("Part 2", () => {
    test('should return 62', () => {
      expect(idx.part2(5, example)).to.equal(62);
    })
  })
})

suite('Input', () => {
  suite('should run the actual input', () => {
    const fs = require('fs');
    const input = fs.readFileSync('./input', 'utf8').split('\n');

    test("Part 1", () => {
      part1 = idx.part1(25, input);
      console.log("Part 1:", part1);
    })
    test("Part 2", () => {
      part2 = idx.part2(25, input);
      console.log("Part 2:", part2);
    })

  })
})

