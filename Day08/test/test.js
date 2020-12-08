var chai = require('chai');
var expect = require('chai').expect;
var idx = require('../index');

suite('Example', () => {
  const example = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6',
  ]
  suite("Part 1", () => {
    test('should return 5', () => {
      expect(idx.part1(example)).to.equal(5);
    })
  })
  suite("Part 2", () => {
    test('should return 8', () => {
      expect(idx.part2(example)).to.equal(8);
    })
  })
})

suite('Input', () => {
  suite('should run the actual input', () => {
    const fs = require('fs');
    const input = fs.readFileSync('./input', 'utf8').split('\n');
    // console.log("🚀 ~ file: test.js ~ line 33 ~ suite ~ input", input)

    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
    })
    test("Part 2", () => {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
    })

  })
})

