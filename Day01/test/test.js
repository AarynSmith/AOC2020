var assert = require('assert');
var idx = require('../index');

describe('Example', () => {
  const example = [1721, 979, 366, 299, 675, 1456]
  describe("Part 1", () => {
    it('should return 514579', () => {
      assert.strictEqual(idx.part1(example), 514579);
    })
  })
  describe("Part 2", () => {
    it('should return 241861950', () => {
      assert.strictEqual(idx.part2(example), 241861950);
    })
  })

})

