// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player, spell, position) => {
  const { spellInfo } = spell;
  const { conditionsRequirements } = spellInfo;
  const { combatstats, conditions } = player;

  if (!spellInfo.learned) {
    return false;
  }

  if (combatstats.currentMana < spellInfo.manaCost) {
    return true;
  }

  if (!spellInfo.canBeCast) {
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
    checkSpecificSummonCount(player.player.playerNumber, 41) >=
      spellInfo.maxActiveSummon
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
