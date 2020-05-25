class NewAggressiveAi {
  constructor() {
    this.npc = ""; //Filled out on NpcModel._initiate()
    this.spellList = {}; //Filled out on NpcModel._initiate()
  }
  _runAi = () => {
    console.log("AI RUN");
    Game.npcActiveTurn = true;

    this.attackPlayersMainFunction();
  };

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

    console.log(rawSpellRangeMaps);
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
        const rangeMap = calculateSpellRangeFreeCells(
          map,
          spell.spellInfo,
          unit.position
        );

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

          return ableToHitSomething ? rangeMap : false;
        })
        .filter((ele) => ele);
    });
  };
}
