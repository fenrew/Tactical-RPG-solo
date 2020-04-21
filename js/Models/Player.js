class Player {
    constructor(playerNumber){ 
        this.playerNumber = playerNumber
        this.class = new Sorcerer(this) //new Novice(this)
        this.position = {
            y: 0,
            x: 0,
        }
        this.newPosition = false // For pushback etc
    }
}