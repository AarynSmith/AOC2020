class pki {
  constructor(publicKey, sni = 7) {
    this.sni = sni;
    this.publicKey = publicKey;
    this.loopSize = this.guessLoop();
  }

  guessLoop() {
    let loop = 1;
    let val = 1;
    while (true) {
      val = val * this.sni;
      val = val % 20201227
      if (val === this.publicKey) return loop;
      loop++
    }
  }
  transform(subjectNumber) {
    let val = 1;
    for (let i = 1; i <= this.loopSize; i++) {
      val = val * subjectNumber;
      val = val % 20201227;
    }
    return val;
  }
}

function part1(input) {
  devices = input.filter(v => v !== '').map(v => new pki(Number(v)))
  return devices[1].transform(devices[0].publicKey);
}

module.exports = {part1};