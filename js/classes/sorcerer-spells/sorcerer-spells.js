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
      source: "frost",
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
      
      let physicalDmgDealt = target.class.damageModifiers.offensive.physicalDamage.allDamage * 0.25;
      target.class.damageModifiers.offensive.physicalDamage.allDamage -= physicalDmgDealt;


      for (let i = 0; i < spell.spellInfo.duration; i++) {
        Game._addNewCombatEffect(player.player, target, spell, i, {physicalDmgDealt});
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
        effect.target.class.damageModifiers.offensive.physicalDamage.allDamage += effect.physicalDmgDealt;
      }
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "frost",
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
      castOnNoTarget: true,
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
      source: "frost",
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
        {allIceWalls}
      );
    },
    applyEffect: (effect, player) => {
      console.log(effect)
      effect.allIceWalls.forEach((wall) => {
        if(wall.class.combatstats.currentHp > 0){
          wall._removeNpcFromTheGame()
        }
      })
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

  // FIRE
  firebolt: {
    id: "firebolt",
    name: "Firebolt",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.firebolt, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "fire")
      );
      target.class.combatstats.currentHp -= modifiedDamage;

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );

      target.class.conditions.onAttack.push({spell, player})

      return modifiedDamage;
    },
    applyEffect: (effect) => {
      const {onAttack} = effect.target.class.conditions
      onAttack.splice(onAttack.indexOf(effect.spell), 1)
    },
    conditionEffect: (target, targetSpell, playerObject) => {
      if(targetSpell.spellInfo.source !== "physical-melee" || targetSpell.spellInfo.source !== "physical-ranged") return
      
      const {spell, player} = playerObject

      let modifiedDamage = Math.floor(
        spell.spellInfo.dotDamage *
          calculateMagicalDamageModifiers(player.player, target, "fire")
      );
      target.class.combatstats.currentHp -= modifiedDamage;

      handleSpellDamageEffectAnimation(target, modifiedDamage, spell.spellInfo.type);
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "fire",
      manaCost: 30,
      damage: 30,
      dotDamage: 10,
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
        silenced: true,
      },
    },
    category: "fire",
    toLearn: 0,
    castCounter: 0,
  },
  fireSpheres: {
    id: "fireSpheres",
    name: "Fire Spheres",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.fireSpheres, position);
    },
    castEffect: (target, spell, player) => {
      let nearbyUnits = getUnitsInFreeRange(player.player, spell.spellInfo.range)
      //nearbyUnits = nearbyUnits.filter(ele => ele.npc)
      console.log(nearbyUnits)
      
      nearbyUnits.forEach(ele => {
        let modifiedDamage = Math.floor(
          spell.spellInfo.damage *
            calculateMagicalDamageModifiers(player.player, ele, "fire")
        );
        ele.class.combatstats.currentHp -= modifiedDamage;
        handleSpellDamageEffectAnimation(
          ele,
          modifiedDamage,
          spell.spellInfo.type
        );
      })

      return false;
    },
    spellInfo: {
      range: 5,
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "fire",
      manaCost: 30,
      damage: 20,
      duration: 1,
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
        disarmed: true,
      },
    },
    category: "fire",
    toLearn: 0,
    castCounter: 0,
  },
  glimmeringFlash: {
    id: "glimmeringFlash",
    name: "Glimmering Flash",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.glimmeringFlash, position);
    },
    castEffect: (target, spell, player) => {
      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration
      );

      target.class.conditions.onAttack.push({spell, player})
    },
    applyEffect: (effect, player) => {
      const {onAttack} = effect.target.class.conditions

      onAttack.splice(onAttack.indexOf(effect.spell), 1)
    },
    conditionEffect: (target, targetSpell, playerObject) => {
      return Math.random() > 0.30 ? false : {cancelSpell: true}
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "damage",
      source: "fire",
      manaCost: 30,
      damage: 1,
      dotDamage: 10,
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
        silenced: true,
      },
    },
    category: "fire",
    toLearn: 0,
    castCounter: 0,
  },
  pyroclasm: {
    id: "pyroclasm",
    name: "Pyroclasm",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.pyroclasm, position);
    },
    castEffect: (target, spell, player) => {
      let modifiedDamage = Math.floor(
        spell.spellInfo.damage *
          calculateMagicalDamageModifiers(player.player, target, "fire")
      );
      target.class.combatstats.currentHp -= target.class.fireArmor ? modifiedDamage*2 : modifiedDamage;

      for(let i = 1; i <= spell.spellInfo.duration; i++){
        Game._addNewCombatEffect(
          player.player,
          target,
          spell,
          i
        );
      }

      return modifiedDamage;
    },
    applyEffect: (effect) => {
        let modifiedDamage = Math.floor(
          effect.spell.spellInfo.dotDamage *
            calculateMagicalDamageModifiers(effect.player, effect.target, "fire")
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
      source: "fire",
      manaCost: 30,
      damage: 30,
      dotDamage: 10,
      duration: 2,
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
    category: "fire",
    toLearn: 0,
    castCounter: 0,
  },
  fireArmor: {
    id: "fireArmor",
    name: "Fire Armor",
    cast: (position, player) => {
      player._addTargetSpellConditions(player.spells.fireArmor, position);
    },
    castEffect: (target, spell, player) => {
      target.class.fireArmor = true
      
      target.class.damageModifiers.defensive.magicalDamage.elementalMagic.fire -= 2

      Game._addNewCombatEffect(
        player.player,
        target,
        spell,
        spell.spellInfo.duration,
        {hpBeforeSpellCast: target.class.combatstats.currentHp}
      );
    },
    applyEffect: (effect) => {
      let {currentHp, hp} = effect.target.class.combatstats

      effect.target.class.damageModifiers.defensive.magicalDamage.elementalMagic.fire += 2
      effect.target.class.fireArmor = undefined

      if(currentHp > effect.hpBeforeSpellCast && currentHp > hp){
        effect.target.class.combatstats.currentHp = effect.hpBeforeSpellCast > hp ? effect.hpBeforeSpellCast : hp
      }
    },
    spellInfo: {
      learned: true,
      canBeCast: true,
      type: "buff",
      source: "fire",
      manaCost: 30,
      damage: 1,
      duration: 1,
      freeCells: true,
      straigthLine: false,
      diagonal: false,
      areaOfEffect: 1,
      minRange: 0,
      maxRange: 3,
      modifiableRange: false,
      lineOfSight: false,
      cooldown: 4,
      castsPerTurn: 1,
      conditionsRequirements: {
        silenced: true,
      },
    },
    category: "fire",
    toLearn: 0,
    castCounter: 0,
  },
};
