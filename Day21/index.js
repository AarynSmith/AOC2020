"use strict";

const parseList = (input) => {
  return input.filter(v => v !== '').map(line => {
    let [_, i, a] = line.match(/([\w\s]+)\(contains ([\w\s,]+)\)/)
      .map(v => v.replace(/,/g, '')
        .split(' ')
        .filter(v => v !== ''));
    return {i: i, a: a}
  });
}
const findAllergens = (lists) => {
  const aMap = {}
  const aToI = {};

  for (const list of lists) {
    for (const a of list.a) {
      if (!(a in aMap)) {
        aMap[a] = new Set();
        list.i.forEach(i => aMap[a].add(i));
      } else {
        for (const possible of aMap[a].keys())
          if (!list.i.includes(possible)) aMap[a].delete(possible);
      }
    }
  }

  while (Object.keys(aMap).length > 0) {
    for (const a in aMap)
      if (aMap[a].size === 1) {
        const allergen = [...aMap[a].values()][0];
        aToI[allergen] = a;
        delete aMap[a];
        for (const b in aMap) aMap[b].delete(allergen)
      }
  }
  return aToI
}

function part1(input) {
  const lists = parseList(input)
  const AllergensToIngredient = findAllergens(lists);
  const allAllergens = Object.keys(AllergensToIngredient);
  return lists.reduce((a, v) => {a.push(...v.i); return a}, [])
    .filter(v => !allAllergens.includes(v)).length;
}

function part2(input) {
  const lists = parseList(input)
  const AllergensToIngredient = findAllergens(lists);
  return Object.entries(AllergensToIngredient).sort((a, b) => {
    if (a[1] < b[1]) {return -1;}
    if (a[1] > b[1]) {return 1;}
  }).map(v => v[0]).join(',');
}

module.exports = {part1, part2};