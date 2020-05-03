const warriorSpellObject = {
  //FIGHTER
  slash: {
    id: "slash",
    name: "Slash",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.slash, position, 2);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(player.player, target)
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "physical-melee",
      manaCost: 30,
      damage: 20,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 1,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: false,
      castsPerTurn: 2,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "fighter",
    toLearn: 0,
    castCounter: 0,
  },
  whirlwind: {
    id: "whirlwind",
    name: "Whirlwind",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.whirlwind, position);
    },
    castEffect: (target, spell, player) => {
      const allNearbyTargets = getUnitsInFreeRange(player.player, 1);

      allNearbyTargets.forEach((ele) => {
        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            calculatePhysicalMeleeDamageModifiers(player.player, ele)
        );

        ele.class.combatstats.currentHp -= modifiedDamage;

        handleSpellDamageEffectAnimation(
          ele,
          modifiedDamage,
          spell.spellInfo.type
        );
      });
    },
    spellInfo: {
      damageAroundPlayer: true,
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "physical-melee",
      manaCost: 30,
      damage: 70,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 0,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: false,
      castsPerTurn: 2,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "fighter",
    toLearn: 0,
    castCounter: 0,
  },
  artOfCombat: {
    id: "artOfCombat",
    name: "Art of Combat",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.artOfCombat, position);
    },
    castEffect: (target, spell, player) => {
      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );

      target.class.conditions.onAttack.push({ spell, player });
    },
    applyEffect: (effect) => {
      const { onAttack } = effect.target.class.conditions;
      onAttack.splice(onAttack.indexOf(effect.spell), 1);
    },
    conditionEffect: (target, targetSpell, playerObject, targetOfTarget) => {
      if (
        !(
          targetSpell.spellInfo.source === "physical-melee" ||
          (targetSpell.spellInfo.maxRange === 1 &&
            targetSpell.spellInfo.damage > 1 &&
            !targetSpell.spellInfo.source === "buff" &&
            !targetSpell.spellInfo.source === "healing")
        )
      )
        return;

      damageOneOrAllAround(
        target,
        targetSpell,
        playerObject,
        targetOfTarget,
        calculatePhysicalMeleeDamageModifiers
      );
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "buff",
      manaCost: 30,
      damage: 10,
      duration: 2,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 0,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "fighter",
    toLearn: 0,
    castCounter: 0,
  },
  hamstring: {
    id: "hamstring",
    name: "Hamstring",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.hamstring, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(player.player, target)
      );

      target.class.combatstats.currentHp -= modifiedDamage;
      target.class.combatstats.currentMovementPoints -= 2;

      handleSpellDamageEffectAnimation(target, 2, "mp");

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "physical-melee",
      manaCost: 30,
      damage: 10,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 1,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: false,
      castsPerTurn: 2,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "fighter",
    toLearn: 0,
    castCounter: 0,
  },
};
