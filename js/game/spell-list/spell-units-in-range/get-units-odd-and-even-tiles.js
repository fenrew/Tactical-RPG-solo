// Returns an object with keys (even, odd) that is arrays of units on even or odd tiles from a position
const getUnitsOddAndEvenTiles = (position = { y: 0, x: 0 }) => {
  const units = { even: [], odd: [] };

  const oddOrEven = (position.y + position.x) % 2;

  const evenUnits = Game.combatTimeline.filter(
    (ele) => (ele.position.x + ele.position.y) % 2 === oddOrEven
  );

  const oddUnits = Game.combatTimeline.filter(
    (ele) => !evenUnits.includes(ele)
  );

  return { even: evenUnits, odd: oddUnits };
};
