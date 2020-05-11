// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player, spell, position) => {
  const { spellInfo, userSpellInfo } = spell;
  const { conditionsRequirements } = spellInfo;
  const { combatstats, conditions } = player;

  if (!userSpellInfo.learned) {
    return false;
  }

  if (combatstats.currentMana < spellInfo.manaCost) {
    return true;
  }

  if (!userSpellInfo.canBeCast) {
    return true;
  }

  if (conditionsRequirements.disarmed && conditions.disarmed) {
    return true;
  }

  if (conditionsRequirements.silenced && conditions.silenced) {
    return true;
  }

  if (
    spellInfo.noTargetRequired &&
    (position.playerNumber ||
      !checkIfMapGridIsAvailable(Game.activeMap, {
        ...position,
      }))
  )
    return true;

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

  return false;
};
