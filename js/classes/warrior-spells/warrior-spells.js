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
  sweepingStrikes: {
    id: "sweepingStrikes",
    name: "Sweeping Strikes",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.sweepingStrikes, position);
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

      const { spell, player } = playerObject;

      if (targetSpell.spellInfo.damageAroundPlayer) {
        const allNearbyTargets = getUnitsInFreeRange(targetOfTarget, 1);

        allNearbyTargets.forEach((ele) => {
          let modifiedDamage = Math.floor(
            targetSpell.spellInfo.damage *
              calculatePhysicalMeleeDamageModifiers(
                player.player,
                ele,
                targetSpell.spellInfo.damageSource
              )
          );

          ele.class.combatstats.currentHp -= modifiedDamage;

          handleSpellDamageEffectAnimation(
            ele,
            modifiedDamage,
            targetSpell.spellInfo.type
          );
        });
        return;
      }

      let modifiedDamage = Math.floor(
        targetSpell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(
            target,
            targetOfTarget,
            targetSpell.spellInfo.damageSource
          )
      );
      targetOfTarget.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(
        targetOfTarget,
        modifiedDamage,
        targetSpell.spellInfo.type
      );
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "buff",
      manaCost: 30,
      damage: 1,
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

  //BLOOD
  absorptionStrike: {
    id: "absorptionStrike",
    name: "Absorption Strike",
    cast: (position, player) => {
      player._addTargetSpellConditions(
        player.spells.absorptionStrike,
        position
      );
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(player.player, target)
      );
      target.class.combatstats.currentHp -= modifiedDamage;

      let selfHealing = Math.floor(
        (player.combatstats.hp * spell.spellInfo.selfHealing) / 100
      );
      player.combatstats.currentHp += selfHealing;
      if (player.combatstats.currentHp > player.combatstats.hp)
        player.combatstats.currentHp = player.combatstats.hp;

      handleSpellDamageEffectAnimation(player.player, selfHealing, "healing");

      return modifiedDamage;
    },
    spellInfo: {
      selfHealing: 3,
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
    category: "blood",
    toLearn: 0,
    castCounter: 0,
  },
  jointStrike: {
    id: "jointStrike",
    name: "Joint Strike",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.jointStrike, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(player.player, target)
      );
      target.class.combatstats.currentHp -= modifiedDamage;

      player.combatstats.currentHp -= spell.spellInfo.selfDamage;

      handleSpellDamageEffectAnimation(
        player.player,
        spell.spellInfo.selfDamage,
        "damage"
      );

      return modifiedDamage;
    },
    spellInfo: {
      selfDamage: 20,
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "physical-melee",
      manaCost: 30,
      damage: 40,
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
    category: "blood",
    toLearn: 0,
    castCounter: 0,
  },
};
