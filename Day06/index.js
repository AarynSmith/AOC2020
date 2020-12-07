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

function part1(customsForms) {
  let group = {}
  let sum = 0;
  customsForms.forEach(form => {
    if (form === '') {
      sum += Object.keys(group).length;
      group = {};
      return;
    }
    form.split('').forEach(question => group[question] = true)
  })
  sum += Object.keys(group).length;
  return sum;
}

function part2(customsForms) {
  let group = []
  let sum = 0;
  customsForms.forEach(form => {
    if (form === '') {
      for (key of Object.keys(group[0] || {})) {
        if (group.every(v => v[key] !== undefined)) sum++;
      }
      group = [];
      return;
    }
    group.push(
      form.split('').reduce((acc, v) => {
        acc[v] = true
        return acc
      }, {})
    )

  })

  for (key of Object.keys(group[0])) {
    if (group.every(v => v[key] !== undefined)) sum++;
  }
  return sum;
}