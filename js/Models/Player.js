class Player {
    constructor(playerNumber){
        this.playerNumber = playerNumber
        this.class = new Novice(this)
        this.position = {
            y: 0,
            x: 0,
        }
    }


}