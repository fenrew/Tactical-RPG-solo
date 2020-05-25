class NpcModel {
  constructor(type, playerNumber) {
    this.playerNumber = playerNumber;
    this.npc = true;
    this.class = type;
    this.position = {
      y: 0,
      x: 0,
    };
    this.newPosition = false; // For pushback etc
  }

  _initiate = () => {
    this.class.player = this;
    this.class.ai.npc = this;
    this.class.ai.spellList = this.class.spells;
  };

  _generatePosition() {
    this.position = generateRandomSpawnLocation();
  }
}
