class stationarySummon {
  constructor(type, playerNumber, position) {
    this.playerNumber = playerNumber;
    this.npc = true;
    this.class = type;
    this.position = {
      y: position.y,
      x: position.x,
    };
    this.newPosition = false; // For pushback etc
  }

  _initiate = (owner) => {
    this.class.player = this;
    this.class.ai.npc = this;
    this.owner = owner;
  };

  _addNpcToGame() {
    Game.activeMap[this.position.y][this.position.x] = this.playerNumber;
    Game.npc.push(this);
    Game.combatTimeline.push(this);
    if (
      Game.combatTimeline.indexOf(Game.combatTimeline[Game.turn]) >=
      Game.combatTimeline.indexOf(this)
    ) {
      Game.turn -= 1;
    }
    visualizeNpcs(Game.activeMap, [this]);
    updatePlayerPanelCombatTimelineVisuals();
  }

  _removeNpcFromTheGame() {
    Game._removeUnitFromCombat(this);
    removeUnitFromPlayerarea(this);
  }
}
