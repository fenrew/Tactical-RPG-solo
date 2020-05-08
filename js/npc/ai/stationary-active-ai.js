class stationaryActiveAi {
  constructor(npcClass) {
    this.spells = "";
    this.class = npcClass;
  }

  runAi = () => {
    const { spells, combatstats } = this.class;

    this.class.spells.healAoe.cast(this.class.player.position);
    Game._nextTurn();
  };
}
