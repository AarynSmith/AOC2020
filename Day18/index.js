"use strict";

const evalBasicExpr = (expr, i = 0) => {
  let acc = null
  let op = null;
  for (; i < expr.length; i++) {
    const char = expr[i]
    if (char.match(/\)/)) return [acc, i];
    if (char.match(/\(/)) {
      const [num, newI] = evalBasicExpr(expr, i + 1);
      switch (op) {
        case '+': acc += num; break;
        case '*': acc *= num; break;
        case null: acc = num;
      }
      i = newI;
      continue;
    }
    switch (char) {
      case '+': op = '+'; break;
      case '*': op = '*'; break;
      default:
        switch (op) {
          case '+': acc += Number(char); break;
          case '*': acc *= Number(char); break;
          case null: acc = Number(char);
        }
    }
  }
  return acc;
}

const evalAdvExpr = (expr) => {
  const exprParse = (expr) => {
    const str = '[' + expr.join(' ').replace(/\(/g, '[')
      .replace(/\)/g, ']')
      .replace(/\s+/g, ',')
      .replace(/\+/g, '"+"')
      .replace(/\*/g, '"*"') + ']'
    return JSON.parse(str)
  }
  const evalInnerExpr = (expr) => {
    if (typeof expr !== 'object') return Number(expr);

    if (expr.length === 3) {
      switch (expr[1]) {
        case '+': return evalInnerExpr(expr[0]) + evalInnerExpr(expr[2]);
        case '*': return evalInnerExpr(expr[0]) * evalInnerExpr(expr[2]);
      }
    }

    // Find Additions;
    while (expr.indexOf('+') > -1) {
      const idx = expr.indexOf('+')
      expr.splice(idx - 1, 3,
        evalInnerExpr(expr[idx - 1]) + evalInnerExpr(expr[idx + 1]));
    }

    while (expr.length > 1) {
      const idx = expr.indexOf('*')
      expr.splice(idx - 1, 3,
        evalInnerExpr(expr[idx - 1]) * evalInnerExpr(expr[idx + 1]));
    }
    return expr[0]
  }

  return evalInnerExpr(exprParse(expr));
}

function part1(input) {
  let sum = 0;
  for (let line of input) {
    line = line.replace(/\(/g, '( ');
    line = line.replace(/\)/g, ' )');
    sum += evalBasicExpr(line.split(' '));
  }
  return sum
}

function part2(input) {
  let sum = 0;
  for (let line of input.filter(v => v !== ''))
    sum += evalAdvExpr(line.split(' '));
  return sum
}
module.exports = {part1, part2};