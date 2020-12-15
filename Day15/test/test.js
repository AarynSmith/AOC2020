const expect = require('chai').expect;
const idx = require('../index');
const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8')
  .split(',')
  .map(Number)

suite.skip('other', function() {
  this.timeout(0)
  test('run other', function() {
    idx.other(input);
  })
});

suite('Stepped', () => {
  suite("0,3,6", () => {
    expected = {
      4: 0,
      5: 3,
      6: 3,
      7: 1,
      8: 0,
      9: 4,
      10: 0,
    }
    //1, 2, 3
    const inp = [0, 3, 6];
    for (const tc in expected) {
      test(String(expected[tc]), () => expect(idx.memoryGame(inp.slice(), tc)).to.equal(expected[tc]))
    }
  })

})

suite('Part 1', () => {
  suite("Examples", () => {
    tests = [
      [[0, 3, 6], 436],
      [[1, 3, 2], 1],
      [[2, 1, 3], 10],
      [[1, 2, 3], 27],
      [[2, 3, 1], 78],
      [[3, 2, 1], 438],
      [[3, 1, 2], 1836],
    ]
    for (const [testCase, expected] of tests) {
      test(`should return ${expected}`, () => {
        expect(idx.part1(testCase)).to.equal(expected);
      });
    }
  });
  suite("Input", () => {
    test("Part 1", () => {
      part1 = idx.part1(input);
      console.log("Part 1:", part1);
      expect(part1).to.equal(870);
    });
  });
});

suite('Part 2', function() {
  this.timeout(0)
  suite("Examples", function() {
    tests = [
      [[0, 3, 6], 175594],
      [[1, 3, 2], 2578],
      [[2, 1, 3], 3544142],
      [[1, 2, 3], 261214],
      [[2, 3, 1], 6895259],
      [[3, 2, 1], 18],
      [[3, 1, 2], 362],
    ]
    for (const [testCase, expected] of tests) {
      test(`should return ${expected}`, function() {
        expect(idx.part2(testCase)).to.equal(expected);
      });
    }
  })
  suite("Input", function() {
    test("Part 2", function() {
      part2 = idx.part2(input);
      console.log("Part 2:", part2);
      expect(part2).to.equal(9136) // Fill this in
    });
  });
});
