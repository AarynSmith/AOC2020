"use strict";
const parseInput = (input) => {
  const rules = [];
  const ruleMap = {};
  for (const ruleLine of input.join('\n').match(/.+:\s\d+-\d+\sor\s\d+-\d+/g)) {
    const type = ruleLine.match(/^(?<type>.+):/).groups.type;
    rules.push({
      type, ranges: ruleLine.match(/(\d+-\d+)/g)
        .map(v => v.match(/(\d+)/g).map(Number))
    });
    ruleMap[type] = ruleLine.match(/(\d+-\d+)/g)
      .map(v => v.match(/(\d+)/g).map(Number));
  }

  const ticket = input[input.indexOf('your ticket:') + 1]
    .split(',')
    .map(Number);
  const otherTickets = input.slice(input.indexOf('nearby tickets:') + 1)
    .filter(v => v != '')
    .map(v => v.split(',').map(Number));
  return {rules, ruleMap, ticket, otherTickets};
}

const checkValidTicket = (ticket, rules) => {
  const invalidValues = [];
  for (const value of ticket) {
    let valid = false;
    for (const rule of rules) {
      if (valid) break;
      for (const range of rule.ranges) {
        if (valid) break;
        if (value >= range[0] && value <= range[1]) valid = true;
      }
    }
    if (!valid) invalidValues.push(value);
  }
  return {
    valid: invalidValues.length <= 0,
    invalidValues
  }
}

function part1(input) {
  input = parseInput(input)
  const invalidValues = []
  for (const ticket of input.otherTickets) {
    invalidValues.push(...checkValidTicket(ticket, input.rules).invalidValues)
  }
  return invalidValues.reduce((a, v) => a + v);
}

function part2(input, fieldRegex) {
  input = parseInput(input);
  const wantedFields = input.rules
    .filter(v => v.type.match(fieldRegex)).map(v => v.type);
  const allTickets = [input.ticket, ...input.otherTickets.filter(v => checkValidTicket(v, input.rules).valid)]
  let candidates = Array(allTickets[0].length)
    .fill(input.rules.map(v => v.type));
  for (let idx = 0; idx < allTickets[0].length; idx++) {
    const values = allTickets.map(v => v[idx]);
    for (const c of candidates[idx]) {
      const valid = values.every(v => {
        for (const [min, max] of input.ruleMap[c])
          if (v >= min && v <= max) return true;
        return false;
      });
      if (!valid) candidates[idx] = candidates[idx].filter(v => v !== c);
    }
  }
  const canDistill = (array) => array.some(v => {
    if (typeof v === 'object') return v.length === 1
    return false;
  });
  const distill = (array) => {
    const singles = array.filter(v => typeof v === 'string' || v.length === 1)
      .flat(1);
    return array.map(v => {
      if (typeof v === 'string') return v
      if (v.length === 1) return v[0];
      return v.filter(v => !singles.includes(v));
    })
  }
  while (canDistill(candidates)) candidates = distill(candidates);

  let prod = 1;
  for (const f of wantedFields) prod *= input.ticket[candidates.indexOf(f)];
  return prod;
}
module.exports = {part1, part2};