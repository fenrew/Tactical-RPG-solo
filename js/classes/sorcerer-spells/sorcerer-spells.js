const sorcererSpellObject = {
  // FROST
  frostbolt: {
    id: "frostbolt",
    name: "Frostbolt",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.frostbolt, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "frost")
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      target.class.combatstats.initiation -= 150;

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );
      return modifiedDamage;
    },
    applyEffect: (effect, player) => {
      effect.target.class.combatstats.initiation += 150;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 30,
      damage: 20,
      duration: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "frost",
    toLearn: 0,
    castCounter: 0,
  },
  frostbite: {
    id: "frostbite",
    name: "Frostbite",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.frostbite, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "frost")
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      target.class.damageModifiers.offensive.physicalDamage.allDamage -= 0.25;

      for (let i = 0; i < spell.spellInfo.duration; i++) {
        Game._addNewCombatEffect(player.player, target, spell, i);
      }

      return modifiedDamage;
    },
    applyEffect: (effect) => {
      let modifiedDamage = Math.floor(
        effect.spell.spellInfo.damage *
          calculateMagicalDamageModifiers(effect.player, effect.target, "frost")
      );
      effect.target.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(
        effect.target,
        modifiedDamage,
        effect.spell.spellInfo.type
      );

      if (effect.executeRound === effect.spell.spellInfo.duration) {
        effect.target.class.damageModifiers.offensive.physicalDamage.allDamage += 0.25;
      }
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 40,
      damage: 10,
      duration: 3,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "frost",
    toLearn: 0,
    castCounter: 0,
  },
};
