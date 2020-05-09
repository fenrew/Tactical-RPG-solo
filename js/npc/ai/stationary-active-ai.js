class stationaryActiveAi {
  constructor(npcClass) {
    this.spells = "";
    this.class = npcClass;
  }

  runAi = () => {
    const { spells, combatstats } = this.class;

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
    for (let spell in this.class.spells) {
      const curSpell = this.class.spells[spell];
      if (
        checkIfSpellIsCastable(this.class, curSpell, this.class.player.position)
      )
        return false;
      if (
        curSpell.spellInfo.minRange === 0 &&
        curSpell.spellInfo.maxRange === 0
      ) {
        curSpell.cast(this.class.player.position);
        return true;
      }
    }
  };
}
