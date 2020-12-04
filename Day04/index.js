const fs = require('fs');

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split('\n')//.filter(v => v !== '');
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));

});

function part1(batchFile) {
  reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let valid = 0;
  let currRecord = {}
  batchFile.forEach(line => {
    if (line === '') {
      const v = currRecord;
      currRecord = {};
      if (reqFields.some(f => v[f] === undefined)) return
      valid++;
      return;
    }
    const record = line.split(' ').map(v => v.split(':'));
    record.forEach(([k, v]) => currRecord[k] = v);
  });
  return valid;
}

function part2(batchFile) {
  reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  let valid = 0;
  let currRecord = {}
  const validate = (r) => {
    currRecord = {};
    if (reqFields.some(f => r[f] === undefined)) return;
    if (r.byr < 1920 || r.byr > 2002) return;
    if (r.iyr < 2010 || r.iyr > 2020) return;
    if (r.eyr < 2020 || r.eyr > 2030) return;

    let m = r.hgt.match(/(\d+)(cm|in)/)
    if (m && m[2] === 'in') {
      if (m[1] < 59 || m[1] > 76) return;
    } else if (m && m[2] === 'cm') {
      if (m[1] < 150 || m[1] > 193) return;
    } else return;

    if (!r.hcl.match(/#[0-9a-f]{6}/)) return;
    if (!validEcl.some(v => v === r.ecl)) return;
    if (!r.pid.match(/^\d{9}$/)) return;

    valid++;
  }
  batchFile.forEach(line => {
    if (line === '') validate(currRecord);
    const record = line.split(' ').map(v => v.split(':'));
    record.forEach(([k, v]) => currRecord[k] = v);
  });
  validate(currRecord);
  return valid;
}