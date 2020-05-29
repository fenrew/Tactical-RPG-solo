class NewAggressiveAi {
  constructor() {
    this.npc = {}; //Filled out on NpcModel._initiate()
    this.spellList = {}; //Filled out on NpcModel._initiate()
  }
  _runAi = () => {
    console.log("AI RUN");
    Game.npcActiveTurn = true;

    this.attackPlayersMainFunction();
  };

  // Does all the attack calculations etc. Is re-usable.
  attackPlayersMainFunction = () => {
    const castableSpells = this.getCastableSpells();
    const attackableUnits = this.getUnitsOnMapThatCanBeAttacked();

    const rawSpellRangeMaps = this.getSpellRangeMaps(
      castableSpells,
      attackableUnits
    );
    const movementMap = this.getMovementMap();
    const spellRangeMaps = this.filterSpellRangeMap(
      rawSpellRangeMaps,
      movementMap
    );

    // Right here there is a chance that spellRangeMaps is just an empty array
    if (spellRangeMaps.length <= 0) return false;

    this.sortArrayByWeight(spellRangeMaps);

    this.filterBySpellsInRange(spellRangeMaps, movementMap);
  };

  // Returns an array of castable spells (refrences)
  getCastableSpells = () => {
    const spellValues = Object.values(this.spellList);
    return spellValues.filter((ele) =>
      checkIfSpellIsCastable(this.npc.class, ele, this.npc)
    );
  };

  // Returns an array of all the units from the CombatTimeline that can be attacked (players + summons)
  getUnitsOnMapThatCanBeAttacked = () => {
    return Game.combatTimeline.filter(
      (unit) => !unit.npc || (unit.npc && Game.players.includes(unit.owner))
    );
  };

  // Takes an array of spells, an array of attackable units and a map(matrix). Returns an array of objects
  // SpellRangeMap is a matrix of where the npc need to stay to hit the opponent
  // [{spell, spellRangeMap: [{unit, rangeMap}, ]}, ]
  getSpellRangeMaps = (spells, units, map = Game.activeMap) => {
    const spellRangeMaps = [];

    spells.forEach((spell) => {
      const spellRangeMap = units.map((unit) => {
        const { spellInfo } = spell;
        const { freeCells, straigthLine, diagonal } = spellInfo;
        const { position } = unit;
        let rangeMap;

        if (freeCells) {
          rangeMap = calculateSpellRangeFreeCells(map, spellInfo, position);
        } else if (straigthLine && !diagonal) {
          rangeMap = calculateSpellRangeStraightLine(map, spellInfo, position);
        } else if (!straigthLine && diagonal) {
          // Insert calculate diagonal
        } else if (straigthLine && diagonal) {
          // Insert calculate straight and diagonal
        }

        return { unit, rangeMap };
      });

      spellRangeMaps.push({ spell, spellRangeMap });
    });

    return spellRangeMaps;
  };

  // Takes the map as a parameter and return an array of where the npc can move
  getMovementMap = (map = Game.activeMap) => {
    const { y, x } = this.npc.position;
    const { currentMovementPoints } = this.npc.class.combatstats;
    const movementMap = findAvailableMovementArea(this.npc, map);
    movementMap[y][x] = currentMovementPoints + 1;
    return movementMap;
  };

  // Takes the movementMap, and spellRangeMaps of the unit and returns an updated spellRangeMap
  // That only has map values where you are allowed to move.
  filterSpellRangeMap = (spellRangeMaps, movementMap) => {
    spellRangeMaps.forEach((spellMap) => {
      spellMap.spellRangeMap = spellMap.spellRangeMap
        .map((spellRangeMap) => {
          const { rangeMap } = spellRangeMap;
          let ableToHitSomething = false;

          for (let y = 0; y < rangeMap.length; y++) {
            for (let x = 0; x < rangeMap[y].length; x++) {
              if (rangeMap[y][x] > 0 && !(movementMap[y][x] > 0)) {
                rangeMap[y][x] = 0;
              }
              if (rangeMap[y][x] > 0) ableToHitSomething = true;
            }
          }

          this.calculateTargetWeight(spellRangeMap);

          return ableToHitSomething ? spellRangeMap : false;
        })
        .filter((ele) => ele);
    });
    // Removes the spell if it is not within range
    return spellRangeMaps.filter((ele) => ele.spellRangeMap.length > 0);
  };

  // Takes the array of spells: [{spell, spellRangeMap: [{unit, rangeMap}, ]}, ]
  // Adds the target weight: [{spell, spellRangeMap: [{unit, rangeMap, targetWeight}, ]}, ]
  calculateTargetWeight = (spellRangeMap) => {
    const { unit } = spellRangeMap;
    const { currentHp, hp } = unit.class.combatstats;

    const unitHealthWeight = 5 - (currentHp * 5) / hp;

    // ADD PREVIOUS DAMAGE DEALT TO THREAT HERE

    spellRangeMap.targetWeight = unitHealthWeight * unit.class.modifiers.threat; //Add any other target modifiers here
  };

  sortArrayByWeight = (spellRangeMaps) => {
    spellRangeMaps.forEach((spellMap) => {
      const { aiWeight } = spellMap.spell.spellInfo;
      spellMap.spellRangeMap.sort((a, b) => {
        if (a.unit === this.npc.class.taunted) return 1;
        else if (b.unit === this.npc.class.taunted) return -1;

        return b.targetWeight + aiWeight - (a.targetWeight + aiWeight);
      });
    });

    spellRangeMaps.sort((a, b) => {
      return (
        b.spellRangeMap[0].targetWeight +
        b.spell.spellInfo.aiWeight -
        (a.spellRangeMap[0].targetWeight + a.spell.spellInfo.aiWeight)
      );
    });

    console.log(spellRangeMaps);
  };

  // Filters the spellRangeMaps depending on the target of the different spells
  // are in range od #1 weight spell or not

  filterBySpellsInRange = (spellRangeMaps, movementMap) => {
    const mainSpell = spellRangeMaps[0].spell;
    const mainSpellRangeMap = spellRangeMaps[0].spellRangeMap[0].rangeMap;

    //Find the best position to move to for casting the spell
    const movePos = { y: 0, x: 0, mp: 0 };
    for (let y = 0; y < mainSpellRangeMap.length; y++) {
      for (let x = 0; x < mainSpellRangeMap[y].length; x++) {
        if (mainSpellRangeMap[y][x] > 0 && movementMap[y][x] > movePos.mp) {
          movePos.y = y;
          movePos.x = x;
          movePos.mp = movementMap[y][x];
        }
      }
    }

    spellRangeMaps.forEach((spellMap) => {
      spellMap.spellRangeMap.filter((unitRangeMap) => {
        this.availablePositionsAfterCastingSpell(
          movementMap,
          movePos,
          unitRangeMap.rangeMap
        );
      });
    });
    // console.log(movePos, spellRangeMaps, movementMap);
  };

  availablePositionsAfterCastingSpell = (movementMap, movePos, rangeMap) => {
    const { y, x, mp } = movePos;
  };

  // Takes the spellRangeMaps and returns all the different castSequences possible
  addSpellsToCastsequence = (spellRangeMaps) => {
    const castSequence = [];
    const firstSpellInfo = spellRangeMaps[0].spell.spellInfo;

    for (let i = 0; i < firstSpellInfo.castsPerTurn; i++) {
      if (firstSpellInfo.castsPerTarget > i) {
        castSequence.push(spellRangeMaps[0].spellRangeMap[0]);
      }
    }
  };
}
