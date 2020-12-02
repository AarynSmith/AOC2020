const fs = require('fs');

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const input = data.split('\n').filter(v => v !== '');
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));

});

function part1(passwords) {
  let valid = 0;
  passwords.map(v => v.split(':')).forEach(([policy, password]) => {
    const [_, min, max, char] = policy.match(/(\d+)-(\d+)\s(\w)/);
    let charCount = password.split('').filter(v => v === char).length;
    if (charCount >= min && charCount <= max) valid++;
  })
  return valid;
}

function part2(passwords) {
  let valid = 0;
  passwords.map(v => v.split(':')).forEach(([policy, password]) => {
    const [_, first, second, char] = policy.match(/(\d+)-(\d+)\s(\w)/);

    let charCount = password.split('')[first] === char ? 1 : 0;
    charCount += password.split('')[second] === char ? 1 : 0;

    if (charCount === 1) valid++;
  })
  return valid;
}