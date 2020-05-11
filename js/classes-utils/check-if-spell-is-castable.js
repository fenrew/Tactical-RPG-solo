// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player, spell, position) => {
  const { spellInfo, userSpellInfo } = spell;
  const { conditionsRequirements } = spellInfo;
  const { combatstats, conditions } = player;

  if (!userSpellInfo.learned) {
    console.log("spell is not learned");
    return false;
  }

  if (combatstats.currentMana < spellInfo.manaCost) {
    console.log("insufficient mana");
    return true;
  }

  if (conditionsRequirements.disarmed && conditions.disarmed) {
    console.log("disarmed");
    return true;
  }

  if (conditionsRequirements.silenced && conditions.silenced) {
    console.log("silenced");
    return true;
  }

  if (
    spellInfo.noTargetRequired &&
    (position.playerNumber ||
      !checkIfMapGridIsAvailable(Game.activeMap, {
        ...position,
      }))
  ) {
    console.log("No target required and map grid must be available");
    return true;
  }

  if (
    spellInfo.maxActiveSummon &&
    checkSpecificSummonCount(
      player.player.playerNumber,
      spellInfo.playerNumber
    ) >= spellInfo.maxActiveSummon
  ) {
    console.log(
      "Can only have " + spellInfo.maxActiveSummon + " of this summon"
    );
    return true;
  }

  if (
    !position.playerNumber &&
    position.playerNumber !== 0 &&
    !spellInfo.castOnNoTarget
  ) {
    console.log("No target");
    return true;
  }

  if (userSpellInfo.currentCooldown) {
    console.log(
      `${spell.name} is on cooldown for ${userSpellInfo.currentCooldown} turns`
    );
    return true;
  }

  if (!userSpellInfo.canBeCast) {
    console.log("spell can't be cast");
    return true;
  }

  return false;
};
