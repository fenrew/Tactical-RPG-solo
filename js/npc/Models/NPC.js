class NpcModel {
    constructor(type) {
        this.position = {
            y: 0,
            x: 0,
        }
        this.class = type
    }

    _generateRandomPosition(){
        this.position = generateRandomSpawnLocation()
    }
}