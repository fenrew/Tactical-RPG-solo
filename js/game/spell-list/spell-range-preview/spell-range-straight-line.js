const calculateSpellRangeStraightLine = (map, spellInfo, position) => {
  let yPos = position.y;
  let xPos = position.x;
  let spellRangeMap = map.map((y) => {
    return y.map(() => {
      return 0;
    });
  });

  for (let y = spellInfo.minRange; y <= spellInfo.maxRange; y++) {
    if (checkIfInsideOfMap(spellRangeMap, xPos, yPos + y)) {
      spellRangeMap[yPos + y][xPos] = spellInfo.damage;
    }
    if (checkIfInsideOfMap(spellRangeMap, xPos, yPos - y)) {
      spellRangeMap[yPos - y][xPos] = spellInfo.damage;
    }
    if (checkIfInsideOfMap(spellRangeMap, xPos + y, yPos)) {
      spellRangeMap[yPos][xPos + y] = spellInfo.damage;
    }
    if (checkIfInsideOfMap(spellRangeMap, xPos - y, yPos)) {
      spellRangeMap[yPos][xPos - y] = spellInfo.damage;
    }
  }

  return spellRangeMap;
};
