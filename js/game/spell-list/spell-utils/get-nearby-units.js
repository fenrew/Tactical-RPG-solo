// Returns an array of units within range of the unit (player/npc class)

const getUnitsInFreeRange = (unit, range, minRange = 0) => {
  const nearbyUnits = [];
  const { y, x } = unit.position;

  for (let i = 0; i <= range; i++) {
    for (let j = minRange; j <= range - i; j++) {
      nearbyUnits.push(
        checkIfPositionIsUnit(Game.activeMap, {
          y: y + i,
          x: x + j,
        })
      );
      nearbyUnits.push(
        checkIfPositionIsUnit(Game.activeMap, {
          y: y + i,
          x: x - j,
        })
      );
      nearbyUnits.push(
        checkIfPositionIsUnit(Game.activeMap, {
          y: y - i,
          x: x + j,
        })
      );
      nearbyUnits.push(
        checkIfPositionIsUnit(Game.activeMap, {
          y: y - i,
          x: x - j,
        })
      );
    }
  }

  // Remove the unit (arg) and duplicates
  return nearbyUnits
    .filter((ele) => ele && ele.position !== unit.position)
    .reduce((acc, val) => (acc.indexOf(val) > -1 ? acc : [...acc, val]), []);
};
