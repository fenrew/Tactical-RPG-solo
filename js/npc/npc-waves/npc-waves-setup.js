function addNewNpcToMap(round) {
    if(round === 1){
        let npcArray = [new NpcModel(new Zombie()), new NpcModel(new Zombie())]
        return Game._addNpcToGame(npcArray)
    }
}