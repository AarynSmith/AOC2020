class XMAS {
  constructor(preambleLength) {
    this.pLen = preambleLength;
    this.window = [];
    this.history = [];
  }

  add(number) {
    if (this.window.length === this.pLen && !this.candidates[number])
      return false;
    this.window.push(number)
    this.history.push(number)
    if (this.window.length > this.pLen) this.window = this.window.slice(1);
    if (this.window.length === this.pLen) this.findNext();
    return true;
  }
  findNext() {
    this.candidates = {};
    for (const i in this.window) {
      for (const j in this.window) {
        if (i < j) {
          const sum = this.window[i] + this.window[j];
          this.candidates[sum] = [this.window[i], this.window[j]];
        }
      }
    }
  }
  findWeakness(target) {
    for (let i = 0; i < this.history.length; i++) {
      for (let l = 2; l <= this.history.length - i; l++) {
        const window = this.history.slice(i, i + l);
        const sum = window.reduce((a, v) => a + v);
        if (sum > target) break;
        if (sum === target) {
          return Math.min(...window) + Math.max(...window);
        }
      }
    }
  }
}

function part1(preambleLength, values) {
  const xmas = new XMAS(preambleLength);
  for (const v of values.map(Number)) {
    if (!xmas.add(v)) return v
  }
}

function part2(preambleLength, values) {
  const xmas = new XMAS(preambleLength);
  for (const v of values.map(Number)) {
    if (!xmas.add(v)) {
      return xmas.findWeakness(v);
    }
  }
}

module.exports = {part1, part2};