class stationaryPassiveSummon {
  constructor(type, playerNumber, position) {
    this.playerNumber = playerNumber;
    this.npc = true;
    this.class = type;
    this.ai = new stationarySummonAi();
    this.position = {
      y: position.y,
      x: position.x,
    };
    this.newPosition = false; // For pushback etc
  }

  _generatePosition() {}

  _addNpcToGame() {
    Game.activeMap[this.position.y][this.position.x] = npc.playerNumber;
    Game.npc.push(npc);
    Game.combatTimeline.push(npc);
    visualizeNpcs(Game.activeMap, [this]);
  }
}
