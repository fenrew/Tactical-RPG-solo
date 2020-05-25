// calculated the spell range from position and returns a matrix of where it can be cast from
const calculateSpellRangeFreeCells = (map, spellInfo, position) => {
  let spellRangeMap = map.map((y) => y.map(() => 0));

  for (let y = 0; y <= spellInfo.maxRange; y++) {
    let minRange = spellInfo.minRange - y;
    if (minRange < 0) minRange = 0;

    for (let x = minRange; x <= spellInfo.maxRange - y; x++) {
      if (checkIfInsideOfMap(spellRangeMap, position.y + y, position.x + x)) {
        spellRangeMap[position.y + y][position.x + x] = spellInfo.damage;
      }
      if (checkIfInsideOfMap(spellRangeMap, position.y + y, position.x - x)) {
        spellRangeMap[position.y + y][position.x - x] = spellInfo.damage;
      }
      if (checkIfInsideOfMap(spellRangeMap, position.y - y, position.x + x)) {
        spellRangeMap[position.y - y][position.x + x] = spellInfo.damage;
      }
      if (checkIfInsideOfMap(spellRangeMap, position.y - y, position.x - x)) {
        spellRangeMap[position.y - y][position.x - x] = spellInfo.damage;
      }
    }
  }

  return spellRangeMap;
};
