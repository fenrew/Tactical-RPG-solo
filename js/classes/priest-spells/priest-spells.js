const priestSpellObject = {
  renew: {
    id: "renew",
    name: "Renew",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.renew, position);
    },
    castEffect: (target, spell, player) => {
      for (let i = 1; i <= spell.spellInfo.duration; i++) {
        Game._addNewCombatEffect(player.player, target, spell, i);
      }
    },
    applyEffect: (effect) => {
      const { combatstats } = effect.target.class;

      let modifiedDamage = Math.floor(
        effect.spell.spellInfo.damage *
          calculateHealingModifiers(effect.player, effect.target)
      );

      combatstats.currentHp += modifiedDamage;

      if (combatstats.currentHp > combatstats.hp) {
        combatstats.currentHp = combatstats.hp;
      }

      handleSpellDamageEffectAnimation(
        effect.target,
        modifiedDamage,
        effect.spell.spellInfo.type
      );
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      duration: 4,
      manaCost: 40,
      damage: 15,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 3,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "priest",
    toLearn: 8,
    castCounter: 0,
  },
};
