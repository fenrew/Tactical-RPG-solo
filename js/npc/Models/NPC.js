class NpcModel {
    constructor(type, playerNumber) {
        this.playerNumber = playerNumber
        this.npc = true
        this.class = type
        this.ai = new AggressiveAi(this)
        this.position = {
            y: 0,
            x: 0,
        }
    }

    _generateRandomPosition(){
        this.position = generateRandomSpawnLocation()
    }
}