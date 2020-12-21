const parseRules = (rules) => {
  const ruleMap = rules.map(r => r.split(": "))
    .reduce(
      (acc, [num, rule]) => {
        if (rule[0] === '"') {
          acc.set(Number(num), rule[1]);
        } else {
          acc.set(Number(num), rule.split(" | ").map(n => n.split(" ").map(Number)))
        }
        return acc;
      },
      new Map()
    );
  return ruleMap;
}

const isValid = (msg, map, [rule, ...rest]) => {
  if (!(rule && msg)) return !!rule ^ !msg;
  const next = map.get(rule);
  return next instanceof Array
    ? next.some(r => isValid(msg, map, r.concat(rest)))
    : msg[0] === next && isValid(msg.slice(1), map, rest);
};

function part1(input) {
  const rules = input.match(/\d+:.+/g);
  const messages = input.match(/[^"][a-zA-Z]+/g).map(v => v.replace('\n', ''));
  const ruleMap = parseRules(rules);
  return messages
    .map(msg => ruleMap.get(0).some(r => isValid(msg, ruleMap, r)))
    .filter(Boolean).length;
}

function part2(input) {
  const rules = input.match(/\d+:.+/g);
  const messages = input.match(/[^"][a-zA-Z]+/g).map(v => v.replace('\n', ''));
  const ruleMap = parseRules(rules);
  ruleMap.set(8, [[42], [42, 8]]);
  ruleMap.set(11, [[42, 31], [42, 11, 31]])
  return messages
    .map(msg => ruleMap.get(0).some(r => isValid(msg, ruleMap, r)))
    .filter(Boolean).length;
}
module.exports = {part1, part2, parseRules};