function part1(input) {
  const memory = {};
  let mask;
  const maskValue = (val) => {
    val = Number(val).toString(2).padStart(36, 0).split('');
    for (idx in mask) val[idx] = mask[idx];
    val = parseInt(val.join(''), 2);
    return val;
  }
  for (line of input) {
    if (line.match(/^mask = /)) {
      mask = line.match(/^mask = ([X\d]+)$/)[1].split('').map((v, i) => {
        return {idx: i, val: v}
      }).filter(v => v.val !== 'X').reduce((acc, v) => {
        acc[v.idx] = Number(v.val)
        return acc
      }, {})
    }
    else if (line.match(/^mem\[\d+\] = /)) {
      let [_, addr, val] = line.match(/^mem\[(\d+)\] = (\d+)/);
      memory[addr] = maskValue(Number(val));
    }
  }
  return Object.values(memory).reduce((acc, v) => acc + v);
}

function part2(input) {
  const memory = {};
  let mask;
  const addrMask = (addr) => {
    addr = Number(addr).toString(2).padStart(36, 0).split('');
    let addresses = [''];
    mask.forEach((v, i) => {

      switch (v) {
        case ('0'): addresses = addresses.map(v => v + addr[i]); break;
        case ('1'): addresses = addresses.map(v => v + '1'); break;
        case ('X'): addresses = addresses.map(v => [v + '0', v + '1']).flat(1)
      }
    })
    return addresses.map(v => parseInt(v, 2))
  }

  for (line of input) {
    if (line.match(/^mask = /)) {
      mask = line.match(/^mask = ([X\d]+)$/)[1].split('');
    }
    else if (line.match(/^mem\[\d+\] = /)) {
      let [_, uAddr, val] = line.match(/^mem\[(\d+)\] = (\d+)/);
      for (addr of addrMask(uAddr)) {
        memory[addr] = Number(val);
      }
    }
  }
  return Object.values(memory).reduce((acc, v) => acc + v);
}
module.exports = {part1, part2};