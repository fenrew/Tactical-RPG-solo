class NewAggressiveAi {
  _runAi = () => {
    console.log("AI RUN");
    Game.npcActiveTurn = true;

    const weightMap = this.generateWeightMap();
  };

  generateWeightMap = () => {
    this.generateSpellMap();
  };

  spellMap = () => {};
}
