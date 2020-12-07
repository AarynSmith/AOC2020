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

const parseRule = (rule) => {
  if (rule === '') return;
  const [_, outerBag] = rule.match(/(\w+\s\w+)\sbags\scontain/);
  let innerBags = rule.match(/(\d?)\s(\w+\s\w+)\sbags?/g);
  innerBags = innerBags.map(v => {
    const [_, count, color] = v.match(/(\d?)\s(\w+\s\w+)\sbags?/)
    if (color === 'no other') return null
    return {count: Number(count), color}
  })
  return {[outerBag]: innerBags}
}

function part1(bagRules) {
  let rules = {}
  const bags = new Set;
  bagRules.forEach(rule => rules = Object.assign(rules, parseRule(rule)));
  const recur = (color) => {
    for (key of Object.keys(rules)) {
      if (rules[key][0] !== null && rules[key].some(v => v.color === color)) {
        bags.add(key);
        recur(key)
      }
    }
  }
  recur('shiny gold');
  return bags.size;
}

function part2(bagRules) {
  let rules = {}
  bagRules.forEach(rule => rules = Object.assign(rules, parseRule(rule)));
  const recur = (color) => {
    let sum = 0
    if (rules[color][0] === null) return 0;
    sum = rules[color].map(v => {
      const c = recur(v.color)
      if (c === 0)
        return {color: v.color, count: v.count}
      return {color: v.color, count: v.count + v.count * c}
    });
    return Number(sum.reduce((acc, v) => acc + v.count, 0))
  }
  return recur('shiny gold');
}