// Takes two positions and return every unit in a straight line between those two positions
const getUnitsInStraightLine = (fromPos, toPos) => {
  const units = Game.combatTimeline.filter((ele) => {
    return (
      (ele.position.y - fromPos.y) * (ele.position.y - toPos.y) <= 0 &&
      (ele.position.x - fromPos.x) * (ele.position.x - toPos.x) <= 0
    );
  });
  return units;
};
