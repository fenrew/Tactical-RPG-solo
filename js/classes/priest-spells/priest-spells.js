const priestSpellObject = {
  //HOLY
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
  blessing: {
    id: "blessing",
    name: "Blessing",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.blessing, position);
    },
    castEffect: (target, spell, player) => {
      const { combatstats } = target.class;
      const { healthIncrease } = spell.spellInfo;

      combatstats.hp += healthIncrease;
      combatstats.currentHp += healthIncrease;

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );
    },
    applyEffect: (effect) => {
      const { combatstats } = effect.target.class;
      const { healthIncrease } = effect.spell.spellInfo;

      combatstats.hp -= healthIncrease;
      combatstats.currentHp -= healthIncrease;
    },
    spellInfo: {
      healthIncrease: 200,
      learned: true,
      canBeCast: true,
      type: "buff",
      duration: 4,
      manaCost: 40,
      duration: 2,
      damage: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 7,
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
  divinity: {
    id: "divinity",
    name: "Divinity",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.divinity, position);
    },
    castEffect: (target, spell, player) => {
      Game.combatTimeline.forEach((ele) => {
        const { combatstats } = ele.class;

        let modifiedHealing = Math.floor(
          spell.spellInfo.damage * calculateHealingModifiers(player.player, ele)
        );

        combatstats.currentHp += modifiedHealing;

        if (combatstats.currentHp > combatstats.hp) {
          combatstats.currentHp = combatstats.hp;
        }

        handleSpellDamageEffectAnimation(
          ele,
          modifiedHealing,
          spell.spellInfo.type
        );
      });
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      duration: 4,
      manaCost: 70,
      damage: 50,
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

  //SMITE
  holyFire: {
    id: "holyFire",
    name: "Holy Fire",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.holyFire, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "holy")
      );
      target.class.combatstats.currentHp -= modifiedDamage;

      for (let i = 1; i <= spell.spellInfo.duration; i++) {
        Game._addNewCombatEffect(player.player, target, spell, i);
      }

      return modifiedDamage;
    },
    applyEffect: (effect) => {
      let modifiedDamage = Math.floor(
        effect.spell.spellInfo.dotDamage *
          calculateMagicalDamageModifiers(effect.player, effect.target, "holy")
      );

      effect.target.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(
        effect.target,
        modifiedDamage,
        effect.spell.spellInfo.type
      );
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "holy",
      manaCost: 30,
      damage: 30,
      dotDamage: 15,
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
        silenced: true,
      },
    },
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },
  purgatory: {
    id: "purgatory",
    name: "Purgatory",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.purgatory, position);
    },
    castEffect: (position, spell, player) => {
      const targets = getUnitsInStraightLine(
        player.player.position,
        position.y + 1 ? position : position.position,
        spell
      );

      targets.forEach((ele) => {
        const { combatstats } = ele.class;

        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            (ele.npc
              ? calculateMagicalDamageModifiers(player.player, ele, "holy")
              : calculateHealingModifiers(player.player, ele))
        );

        combatstats.currentHp -= ele.npc ? modifiedDamage : -1 * modifiedDamage;

        if (combatstats.currentHp > combatstats.hp)
          combatstats.currentHp = combatstats.hp;

        handleSpellDamageEffectAnimation(
          ele,
          modifiedDamage,
          ele.npc ? "damage" : "healing"
        );
      });
    },
    spellInfo: {
      castOnNoTarget: true,
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "holy",
      manaCost: 30,
      damage: 30,
      freeCells: false,
      straigthLine: true,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },
  beamOfLight: {
    id: "beamOfLight",
    name: "Beam Of Light",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.beamOfLight, position);
    },
    castEffect: (target, spell, player) => {
      const { combatstats } = player;

      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "holy")
      );

      let modifiedHealing = Math.floor(
        spell.spellInfo.healing *
          calculateHealingModifiers(player.player, player.player)
      );

      target.class.combatstats.currentHp -= modifiedDamage;
      combatstats.currentHp += modifiedHealing;

      if (combatstats.currentHp > combatstats.hp)
        combatstats.currentHp = combatstats.hp;

      handleSpellDamageEffectAnimation(
        player.player,
        modifiedHealing,
        "healing"
      );

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "holy",
      manaCost: 30,
      healing: 30,
      damage: 30,
      freeCells: false,
      straigthLine: true,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },
  sin: {
    id: "sin",
    name: "Sin",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.sin, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "darkness")
      );

      let modifiedSelfDamage = Math.floor(
        spell.spellInfo.selfDamage *
          calculateMagicalDamageModifiers(
            player.player,
            player.player,
            "darkness"
          )
      );

      target.class.combatstats.currentHp -= modifiedDamage;
      player.combatstats.currentHp -= modifiedSelfDamage;

      handleSpellDamageEffectAnimation(
        player.player,
        modifiedSelfDamage,
        "damage"
      );

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "darkness",
      manaCost: 30,
      healing: 30,
      selfDamage: 30,
      damage: 70,
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
        silenced: true,
      },
    },
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },
  judgementDay: {
    id: "judgementDay",
    name: "Judgement Day",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.judgementDay, position);
    },
    castEffect: (target, spell, player) => {
      const unitsOddOrEven = getUnitsOddAndEvenTiles(player.player.position);

      unitsOddOrEven.even.forEach((ele) => {
        const { combatstats } = ele.class;

        let modifiedHealing = Math.floor(
          spell.spellInfo.damage * calculateHealingModifiers(player.player, ele)
        );

        combatstats.currentHp += modifiedHealing;

        if (combatstats.currentHp > combatstats.hp)
          combatstats.currentHp = combatstats.hp;

        handleSpellDamageEffectAnimation(ele, modifiedHealing, "healing");
      });

      unitsOddOrEven.odd.forEach((ele) => {
        const { combatstats } = ele.class;

        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            calculateMagicalDamageModifiers(player.player, ele, "holy")
        );

        combatstats.currentHp -= modifiedDamage;

        handleSpellDamageEffectAnimation(ele, modifiedDamage, "damage");
      });
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "holy",
      manaCost: 30,
      healing: 40,
      damage: 30,
      freeCells: false,
      straigthLine: true,
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
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },
  divineIntervention: {
    id: "divineIntervention",
    name: "Divine Intervention",
    cast: (position, player) => {
      player._addTargetSpellConditions(
        player.spells.divineIntervention,
        position
      );
    },
    castEffect: (target, spell, player) => {
      changeUnitsPosition(player.player, target);

      const allNearbyTargets = getUnitsInFreeRange(player.player, 1);

      allNearbyTargets.forEach((ele) => {
        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            calculateMagicalDamageModifiers(
              player.player,
              ele,
              spell.spellInfo.source
            )
        );

        ele.class.combatstats.currentHp -= modifiedDamage;

        handleSpellDamageEffectAnimation(ele, modifiedDamage, "damage");
      });

      const { combatstats } = target.class;

      let modifiedHealing = Math.floor(
        spell.spellInfo.healing *
          calculateHealingModifiers(player.player, target)
      );
      combatstats.currentHp += modifiedHealing;

      if (combatstats.currentHp > combatstats.hp)
        combatstats.currentHp = combatstats.hp;

      return modifiedHealing;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      source: "holy",
      manaCost: 30,
      healing: 40,
      damage: 30,
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
        silenced: true,
      },
    },
    category: "smite",
    toLearn: 0,
    castCounter: 0,
  },

  //VOODOO
  totemOfHealing: {
    id: "totemOfHealing",
    name: "Totem of Healing",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.totemOfHealing, position);
    },
    castEffect: (position, spell, player) => {
      if (
        position.playerNumber ||
        !checkIfMapGridIsAvailable(Game.activeMap, {
          ...position,
        })
      )
        return console.log("can't cast on the spell area");

      const newTotem = new stationarySummon(new TotemOfHealing(), 41, {
        ...position,
      });
      newTotem._initiate(player.player);
      newTotem._addNpcToGame();
    },
    spellInfo: {
      castOnNoTarget: true,
      playerNumber: 41,
      learned: true,
      canBeCast: true,
      type: "healing",
      source: "nature",
      manaCost: 30,
      damage: 30,
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
        silenced: true,
      },
    },
    category: "voodoo",
    toLearn: 0,
    castCounter: 0,
  },
};
