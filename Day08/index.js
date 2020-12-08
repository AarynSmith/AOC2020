const parseBootCode = (bootCode) => {
  return bootCode.filter(v => v !== '').map(v => {
    [_, op, value] = v.match(/(\w+)\s([+-]\d+)/)
    return {
      op,
      value: Number(value),
      seen: false,
    }
  })
}

const vm = (code) => {
  let acc = 0;
  let ptr = 0;
  while (ptr < code.length && !code[ptr].seen) {
    code[ptr].seen = true
    switch (code[ptr].op) {
      case 'acc':
        acc += code[ptr].value;
        ptr++;
        break;
      case 'jmp':
        ptr += code[ptr].value;
        break;
      case 'nop':
        ptr++;
        break;
    }
  }
  return {acc, ptr}
}

function part1(bootCode) {
  const code = parseBootCode(bootCode)
  return vm(code).acc;
}

function part2(bootCode) {
  const code = parseBootCode(bootCode);
  for (i in code) {
    if (code[i].op === 'jmp' || code[i].op === 'nop') {
      const newCode = JSON.parse(JSON.stringify(code));
      newCode[i].op = code[i].op === 'jmp' ? 'nop' : 'jmp';
      const res = vm(newCode)
      if (res.ptr == code.length) {
        console.log("Found corrupted instruction at position", i)
        return res.acc
      }
    }
  }
}

module.exports = {part1, part2};