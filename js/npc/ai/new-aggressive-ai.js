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
    const spellRangeMaps = this.getSpellRangeMaps(
      castableSpells,
      attackableUnits
    );
    const movementMap = this.getMovementMap();
    console.log(movementMap);
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
  // [{spell, spellRangeMap: [{player, spellRangeMap}, ]}, ]
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
    return findAvailableMovementArea(this.npc, map);
  };
}
