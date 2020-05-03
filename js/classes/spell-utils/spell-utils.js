// A function for onAttack that checks if it is an aoe (like whirlwind) or single target. Applies the damage
const damageOneOrAllAround = (
  target,
  targetSpell,
  playerObject,
  targetOfTarget,
  calculateDamageModifiers
) => {
  const { spell, player } = playerObject;
  if (targetSpell.spellInfo.damageAroundPlayer) {
    const allNearbyTargets = getUnitsInFreeRange(targetOfTarget, 1);

    allNearbyTargets.forEach((ele) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateDamageModifiers(
            player.player,
            ele,
            spell.spellInfo.damageSource
          )
      );

      ele.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(
        ele,
        modifiedDamage,
        spell.spellInfo.type
      );
    });
    return;
  }

  let modifiedDamage = Math.floor(
    spell.spellInfo.damage *
      calculateDamageModifiers(
        target,
        targetOfTarget,
        spell.spellInfo.damageSource
      )
  );
  targetOfTarget.class.combatstats.currentHp -= modifiedDamage;

  handleSpellDamageEffectAnimation(
    targetOfTarget,
    modifiedDamage,
    spell.spellInfo.type
  );
};
