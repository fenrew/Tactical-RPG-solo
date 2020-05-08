// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player, spell, position) => {
  let spellInfo = spell.spellInfo;

  if (!spellInfo.learned) {
    return false;
  }

  if (player.combatstats.currentMana < spellInfo.manaCost) {
    return true;
  }

  if (!spellInfo.canBeCast) {
    return true;
  }

  if (spellInfo.conditionsRequirements.disarmed && player.conditions.disarmed) {
    return true;
  }

  if (spellInfo.conditionsRequirements.silenced && player.conditions.silenced) {
    return true;
  }

  if (
    spell.spellInfo.noTargetRequired &&
    (position.playerNumber ||
      !checkIfMapGridIsAvailable(Game.activeMap, {
        ...position,
      }))
  )
    return true;

  if (
    spell.spellInfo.maxActiveSummon &&
    checkSpecificSummonCount(player.player.playerNumber, 41) >=
      spell.spellInfo.maxActiveSummon
  ) {
    console.log(
      "Can only have " + spell.spellInfo.maxActiveSummon + " of this summon"
    );
    return true;
  }

  return false;
};
