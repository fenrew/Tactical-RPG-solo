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
    console.log(this.class);
    this.class.ai.spellList = JSON.parse(JSON.stringify(this.class.spells));
  };

  _generatePosition() {
    this.position = generateRandomSpawnLocation();
  }
}
