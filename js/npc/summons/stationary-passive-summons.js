class stationaryPassiveSummon {
  constructor(type, playerNumber, position) {
    this.playerNumber = playerNumber;
    this.npc = true;
    this.class = type;
    this.ai = new stationaryPassiveAi();
    this.position = {
      y: position.y,
      x: position.x,
    };
    this.newPosition = false; // For pushback etc
  }

  _generatePosition() {}

  _addNpcToGame() {
    Game.activeMap[this.position.y][this.position.x] = this.playerNumber;
    Game.npc.push(this);
    Game.combatTimeline.push(this);
    visualizeNpcs(Game.activeMap, [this]);
  }
}
