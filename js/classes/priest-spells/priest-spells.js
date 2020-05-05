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
  holyGround: {
    id: "holyGround",
    name: "Holy Ground",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.holyGround, position);
    },
    castEffect: (position, spell, player) => {
      // ADD EFFECT
      const { duration } = spell.spellInfo;
      addSquareGlyph(
        player.player,
        position.y + 1 ? position : position.position,
        spell
      ); // The ternery is needed because position can sometimes be a player or npc

      Game._addNewCombatEffect(player.player, position, spell, duration);
    },
    applyEffect: (effect) => {
      removeGlyph(effect.player, effect.spell.spellInfo.glyphNumber);
      // ADD remove glyph animation here
    },
    activateGlyph: (target, player) => {
      const { damage, type } = player.class.spells.holyGround.spellInfo;
      const { combatstats } = target.class;

      const modifiedHealing = Math.floor(
        damage * calculateHealingModifiers(player, target)
      );

      combatstats.currentHp += modifiedHealing;

      if (combatstats.currentHp > combatstats.hp) {
        combatstats.currentHp = combatstats.hp;
      }

      handleSpellDamageEffectAnimation(target, modifiedHealing, type);
    },
    spellInfo: {
      size: 1,
      glyphNumber: 4,
      castOnNoTarget: true,
      learned: true,
      canBeCast: true,
      type: "healing",
      manaCost: 40,
      damage: 20,
      duration: 2,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
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
};