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
  freezingGround: {
    id: "freezingGround",
    name: "Freezing Ground",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.freezingGround, position);
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
    activateGlyph: (target) => {
      target.class.combatstats.currentMovementPoints -= 2;

      if (target.class.combatstats.currentMovementPoints < 0)
        target.class.combatstats.currentMovementPoints = 0;
    },
    spellInfo: {
      size: 1,
      glyphNumber: 2,
      learned: true,
      canBeCast: true,
      type: "damage",
      manaCost: 40,
      damage: 1,
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
  snowstorm: {
    id: "snowstorm",
    name: "Snowstorm",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.snowstorm, position);
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
    activateGlyph: (target,player) => {
        const { damage, type } = player.class.spells.snowstorm.spellInfo;
        const modifiedDamage = Math.floor(
          damage * calculateMagicalDamageModifiers(player, target, "frost")
        );
  
        target.class.combatstats.currentHp -= modifiedDamage;
  
        handleSpellDamageEffectAnimation(target, modifiedDamage, type);
    },
    spellInfo: {
      size: 1,
      glyphNumber: 3,
      castOnNoTarget: true,
      learned: true,
      canBeCast: true,
      type: "damage",
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
    category: "sorcerer",
    toLearn: 8,
    castCounter: 0,
  },
  iceWall: {
    id: "iceWall",
    name: "Ice Wall",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.iceWall, position);
    },
    castEffect: (target, spell, player) => {
      if(target.playerNumber) target = {...target.position}

      const spellDirection = getCastingDirection(player.player.position, target)
      const allIceWalls = []
      
      for(let i = -1; i <= 1; i++){ // For the size of the wall
        if(spellDirection === "E" || spellDirection === "W"){
          if(checkIfMapGridIsAvailable(Game.activeMap, {...target, y: target.y+i})){
            const newIceWall = new stationaryPassiveSummon(new iceWallSpell(), 40, {...target, y: target.y+i})
            newIceWall._addNpcToGame()
            allIceWalls.push(newIceWall)
          }
        } else {
          if(checkIfMapGridIsAvailable(Game.activeMap, {...target, x: target.x+i})){
            const newIceWall = new stationaryPassiveSummon(new iceWallSpell(), 40, {...target, x: target.x+i})
            newIceWall._addNpcToGame()
            allIceWalls.push(newIceWall)
          }
        }
      }

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration,
        allIceWalls
      );
    },
    applyEffect: (effect, player) => {
      
    },
    spellInfo: {
      castOnNoTarget: true,
      learned: true,
      canBeCast: true,
      type: "summon",
      manaCost: 30,
      damage: 1,
      duration: 3,
      freeCells: false,
      straigthLine: true,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 1,
      maxRange: 5,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 4,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "frost",
    toLearn: 0,
    castCounter: 0,
  },
};
