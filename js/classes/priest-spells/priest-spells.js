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
    category: "holy",
    toLearn: 8,
    castCounter: 0,
  },
  holyLight: {
    id: "holyLight",
    name: "Holy Light",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.holyLight, position);
    },
    castEffect: (target, spell, player) => {
      const { combatstats } = target.class;

      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateHealingModifiers(player.player, target)
      );

      combatstats.currentHp += modifiedDamage;

      if (combatstats.currentHp > combatstats.hp) {
        combatstats.currentHp = combatstats.hp;
      }

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      duration: 4,
      manaCost: 20,
      damage: 60,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 6,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "holy",
    toLearn: 8,
    castCounter: 0,
  },
  selfPreservation: {
    id: "selfPreservation",
    name: "Self Preservation",
    cast: (position, player) => {
      player._addTargetSpellConditions(
        player.spells.selfPreservation,
        position
      );
    },
    castEffect: (target, spell, player) => {
      const { combatstats } = target.class;

      let modifiedHealing = Math.floor(
        spell.spellInfo.damage *
          calculateHealingModifiers(player.player, target)
      );

      combatstats.currentHp += modifiedHealing;

      if (combatstats.currentHp > combatstats.hp) {
        combatstats.currentHp = combatstats.hp;
      }

      const allNearbyTargets = getUnitsInFreeRange(target, 1).filter(
        (ele) => ele.npc
      );
      console.log(allNearbyTargets);

      allNearbyTargets.forEach((ele) => {
        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            calculatePhysicalMeleeDamageModifiers(player.player, ele)
        );

        ele.class.combatstats.currentHp -= modifiedDamage;

        handleSpellDamageEffectAnimation(ele, modifiedDamage, "damage");
      });

      return modifiedHealing;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      manaCost: 20,
      damagePercent: 50,
      damage: 60,
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
    category: "holy",
    toLearn: 8,
    castCounter: 0,
  },
};
