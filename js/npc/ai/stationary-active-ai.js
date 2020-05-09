class stationaryActiveAi {
  constructor(npcClass) {
    this.spells = "";
    this.class = npcClass;
  }

  runAi = () => {
    const { spells, combatstats } = this.class;

    console.log(
      checkIfPositionIsUnit(Game.activeMap, this.class.player.position)
    );

    let response = true;
    let counter = 0;

    while (response) {
      if (counter > 20) response = false;
      response = this.castSpell();
      counter += 1;
    }

    Game._nextTurn();
  };

  castSpell = () => {
    const { spells } = this.class;
    const { position } = this.class.player;

    for (let spell in spells) {
      const curSpell = spells[spell];
      const { spellInfo, cast } = curSpell;
      const { minRange, maxRange } = spellInfo;

      if (checkIfSpellIsCastable(this.class, curSpell, position)) return false;

      if (minRange === 0 && maxRange === 0) {
        cast(position);
        return true;
      }
    }
  };
}
