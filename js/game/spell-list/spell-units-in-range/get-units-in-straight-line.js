// Takes two positions and return every unit in a straight line between those two positions
const getUnitsInStraightLine = (fromPos, toPos) => {
  const differencePos = { y: fromPos.y - toPos.y, x: fromPos.x - toPos.x };
  const units = Game.combatTimeline.filter((ele) => {
    if (differencePos.y < 0 || differencePos.x < 0) {
      return (
        (ele.position.y <= toPos.y && ele.position.y > fromPos.y) ||
        (ele.position.x <= toPos.x && ele.position.x > fromPos.x)
      );
    } else {
      return (
        (ele.position.y >= toPos.y && ele.position.y < fromPos.y) ||
        (ele.position.x >= toPos.x && ele.position.x < fromPos.x)
      );
    }
  });

  return units;
};
