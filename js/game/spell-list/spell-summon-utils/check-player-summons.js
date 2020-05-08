// Takes a playerNumber and a summonNumber and returns the amount of summons he has active of this specific type
const checkSpecificSummonCount = (playerNumber, summonNumber) => {
  return Game.combatTimeline.filter(
    (ele) =>
      ele.playerNumber === summonNumber &&
      ele.owner.playerNumber === playerNumber
  ).length;
};
