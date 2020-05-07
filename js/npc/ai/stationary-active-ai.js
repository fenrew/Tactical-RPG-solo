class stationaryActiveAi {
  constructor(npcClass) {
    this.spells = "";
    this.class = npcClass;
  }

  runAi = () => {
    const { spells, combatstats } = this.class;
    console.log("YEEET");

    this.class.spells.healAoe;
    Game._nextTurn();
  };
}
