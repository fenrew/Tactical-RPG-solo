// Takes two positions and return every unit in a straight line between those two positions
const getUnitsInStraightLine = (fromPos, toPos) => {
  const differencePos = { y: fromPos.y - toPos.y, x: fromPos.x - toPos.x };
  const units = Game.combatTimeline.filter((ele) => {
    return ele.position.y;
  });
};
