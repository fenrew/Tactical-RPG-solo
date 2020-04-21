const noviceSpellObject = {
  // WARRIOR
  slam: {
    id: "slam",
    name: "Slam",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.slam, position);
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
      manaCost: 30,
      damage: 25,
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
    category: "warrior",
    toLearn: 0,
    castCounter: 0,
  },
  defensiveStance: {
    id: "defensiveStance",
    name: "Defensive Stance",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.defensiveStance, position);
    },
    castEffect: (target, spell, player) => {
      target.class.damageModifiers.defensive.physicalDamage.allDamage -= 0.2;
      target.class.damageModifiers.offensive.magicalDamage.allDamage -= 0.2;

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );
    },
    applyEffect: (effect) => {
      effect.target.class.damageModifiers.defensive.physicalDamage.allDamage += 0.2;
      effect.target.class.damageModifiers.offensive.magicalDamage.allDamage += 0.2;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "buff",
      manaCost: 40,
      duration: 3,
      damage: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 0,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 4,
      castsPerTurn: 1,
      conditionsRequirements: {},
    },
    category: "warrior",
    toLearn: 8,
    castCounter: 0,
  },
  rend: {
    id: "rend",
    name: "Rend",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.rend, position);
    },
    castEffect: (target, spell, player) => {
      for (let i = 1; i <= spell.spellInfo.duration; i++) {
        console.log(player);
        Game._addNewCombatEffect(player.player, target, spell, i);
      }
    },
    applyEffect: (effect) => {
      const modifiedDamage = Math.floor(
        effect.spell.spellInfo.damage *
          calculatePhysicalMeleeDamageModifiers(effect.player, effect.target)
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
      duration: 3,
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
      castsPerTurn: 1,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "warrior",
    toLearn: 16,
    castCounter: 0,
  },
  powerStroke: {
    id: "powerStroke",
    name: "Power Stroke",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.powerStroke, position);
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
      manaCost: 40,
      damage: 50,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 1,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 2,
      castsPerTurn: false,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "warrior",
    toLearn: 0,
    castCounter: 0,
  },
  findWeakness: {
    id: "findWeakness",
    name: "Find Weakness",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.findWeakness, position);
    },
    castEffect: (target, spell, player) => {
      target.class.damageModifiers.defensive.physicalDamage.allDamage += 0.2;
      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );
    },
    applyEffect: (effect, player) => {
      effect.target.class.damageModifiers.defensive.physicalDamage.allDamage -= 0.2;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "debuff",
      duration: 2,
      manaCost: 40,
      damage: 25,
      freeCells: false,
      straigthLine: true,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 3,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 3,
      castsPerTurn: 1,
      conditionsRequirements: {},
    },
    category: "warrior",
    toLearn: 30,
    castCounter: 0,
  },

  // RANGER
  throwStaff: {
    id: "throwStaff",
    name: "Throw Staff",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.throwStaff, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculatePhysicalRangedDamageModifiers(player.player, target)
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 25,
      damage: 15,
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
    category: "ranger",
    toLearn: 0,
    castCounter: 0,
  },
  forceStaff: {
    id: "forceStaff",
    name: "Force Staff",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.forceStaff, position);
    },
    castEffect: async (target, spell, player) => {
      const direction = getPushbackDirection(player.player, target);
      const pushbackDamage =
        (await pushBackInStraightLine(target, direction, 2)) *
        spell.spellInfo.pushbackDamage; // Distance: 2
      const modifiedDamage = spell.spellInfo.damage + pushbackDamage;
      console.log(pushbackDamage);
      target.class.combatstats.currentHp -= modifiedDamage;
      console.log(modifiedDamage);

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 40,
      damage: 10,
      pushbackDamage: 10,
      freeCells: false,
      straigthLine: true,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 3,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        disarmed: true,
      },
    },
    category: "ranger",
    toLearn: 8,
    castCounter: 0,
  },

  // SORCERER
  conjureFrost: {
    id: "conjureFrost",
    name: "Conjure Frost",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.conjureFrost, position);
    },
    castEffect: (target, spell, player) => {
      let tCombatstats = target.class.combatstats;

      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "frost")
      );
      tCombatstats.currentHp -= modifiedDamage;

      tCombatstats.currentMovementPoints -= 1;
      if (tCombatstats.currentMovementPoints < 0)
        tCombatstats.currentMovementPoints = 0;

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 30,
      damage: 10,
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
    category: "sorcerer",
    toLearn: 0,
    castCounter: 0,
  },
  heatwave: {
    id: "heatwave",
    name: "Heatwave",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.heatwave, position);
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
      const { damage, type } = player.class.spells.heatwave.spellInfo;
      const modifiedDamage = Math.floor(
        damage * calculateMagicalDamageModifiers(player, target, "fire")
      );

      target.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(target, modifiedDamage, type);
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 40,
      damage: 25,
      size: 1,
      glyphNumber: 1,
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
    category: "sorcerer",
    toLearn: 8,
    castCounter: 0,
  },
  magicLance: {
    id: "magicLance",
    name: "Magic Lance",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.magicLance, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "arcane")
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
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
    category: "sorcerer",
    toLearn: 0,
    castCounter: 0,
  },
  syphonMana: {
    id: "syphonMana",
    name: "Syphon Mana",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.syphonMana, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = spell.spellInfo.damage;
      target.class.combatstats.currentMana += modifiedDamage;
      if (target.class.combatstats.currentMana > target.class.combatstats.mana)
        target.class.combatstats.currentMana = target.class.combatstats.mana;
      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "managain",
      manaCost: 8,
      damage: 25,
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
    category: "sorcerer",
    toLearn: 0,
    castCounter: 0,
  },
  powerSpike: {
    id: "powerSpike",
    name: "Power Spike",
    cast: (position, player) => {
      console.log("USED");
      player._addTargetSpellConditions(player.spells.powerSpike, position);
    },
    castEffect: (target, spell, player) => {
      console.log(target);
      const manaDrained = target.class.combatstats.currentMana;
      target.class.combatstats.currentMana = 0;
      Game._addNewCombatEffect(player.player, target, spell, 1, {
        manaDrained,
      });
    },
    applyEffect: (effect, player) => {
      console.log(effect);
      effect.target.class.combatstats.currentMana += effect.manaDrained;

      handleSpellDamageEffectAnimation(
        effect.target,
        effect.manaDrained,
        effect.spell.spellInfo.type
      );
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "managain",
      duration: 1,
      manaCost: 10,
      damage: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 0,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 2,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "sorcerer",
    toLearn: 8,
    castCounter: 0,
  },

  // PRIEST
  heal: {
    id: "heal",
    name: "Heal",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.heal, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateHealingModifiers(player.player, target)
      );

      target.class.combatstats.currentHp += modifiedDamage;
      if (target.class.combatstats.currentHp > target.class.combatstats.hp) {
        target.class.combatstats.currentHp = target.class.combatstats.hp;
      }

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
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
    category: "priest",
    toLearn: 0,
    castCounter: 0,
  },
  inspire: {
    id: "inspire",
    name: "Inspire",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.inspire, position);
    },
    castEffect: (target, spell, player) => {
      target.class.damageModifiers.offensive.allDamage += 0.2;
      for (let i = 1; i <= spell.spellInfo.duration; i++) {
        console.log(player, target, spell, i);
        Game._addNewCombatEffect(player.player, target, spell, i);
      }
    },
    applyEffect: (effect, player) => {
      let modifiedDamage = Math.floor(
        effect.spell.spellInfo.damage *
          calculateHealingModifiers(effect.player, effect.target)
      );
      console.log(effect, player, modifiedDamage);
      effect.target.class.combatstats.currentHp += modifiedDamage;
      if (
        effect.target.class.combatstats.currentHp >
        effect.target.class.combatstats.hp
      ) {
        effect.target.class.combatstats.currentHp =
          effect.target.class.combatstats.hp;
      }

      handleSpellDamageEffectAnimation(
        effect.target,
        modifiedDamage,
        effect.spell.spellInfo.type
      );
      if (effect.executeRound == 2) {
        effect.target.class.damageModifiers.offensive.allDamage -= 0.2;
      }
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "healing",
      duration: 2,
      manaCost: 40,
      damage: 25,
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
  smite: {
    id: "smite",
    name: "Smite",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.smite, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "holy")
      );
      target.class.combatstats.currentHp -= modifiedDamage;
      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 25,
      damage: 25,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 7,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 1,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "priest",
    toLearn: 0,
    castCounter: 0,
  },
  absorb: {
    id: "absorb",
    name: "Absorb",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.absorb, position);
    },
    castEffect: (target, spell, player) => {
      target.class.damageModifiers.defensive.magicalDamage.allDamage -= 0.5;

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );
    },
    applyEffect: (effect) => {
      target.class.damageModifiers.defensive.magicalDamage.allDamage += 0.5;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "buff",
      manaCost: 40,
      duration: 2,
      damage: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 5,
      castsPerTurn: 1,
      conditionsRequirements: {},
    },
    category: "priest",
    toLearn: 8,
    castCounter: 0,
  },
  holySpike: {
    id: "holySpike",
    name: "Holy Spike",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.holySpike, position);
    },
    castEffect: (target, spell, player) => {
        spell.spellInfo.type = target.npc ? "damage" : "healing"

      let modifiedDamage = Math.floor(
        spell.spellInfo.damage * (target.npc ?
          calculateMagicalDamageModifiers(player.player, target, "holy") : 
          calculateHealingModifiers(player.player, target))
      );
      if (target.npc) target.class.combatstats.currentHp -= modifiedDamage;
      else target.class.combatstats.currentHp += modifiedDamage;

      if (target.class.combatstats.currentHp > target.class.combatstats.hp)
        target.class.combatstats.currentHp = target.class.combatstats.hp;

      return modifiedDamage;
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 10,
      damage: 40,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 3,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "priest",
    toLearn: 0,
    castCounter: 0,
  },
};
