function part1(adaptors) {
  const sortedAdaptors = adaptors.map(Number).sort((a, b) => a - b);
  sortedAdaptors.push(sortedAdaptors[sortedAdaptors.length - 1] + 3);
  const diffs = sortedAdaptors.reduce((acc, v, i) => {
    const diff = v - (sortedAdaptors[i - 1] || 0);
    return Object.assign(acc, {[diff]: acc[diff] + 1})
  }, {1: 0, 3: 0})
  return diffs[1] * diffs[3]
}

function part2(input) {
  const largest = Math.max(...input);
  input.push(0)
  input.push(largest + 3)
  const cache = {};
  const countChildren = (num) => {
    if (cache[num]) return cache[num];
    if (num === 0) return 1;
    let numChildren = 0;
    for (const i of [1, 2, 3]) {
      if (input.includes(num - i)) numChildren += countChildren(num - i);
    }
    cache[num] = numChildren;
    return numChildren;
  };
  return countChildren(largest + 3);
}

module.exports = {part1, part2};