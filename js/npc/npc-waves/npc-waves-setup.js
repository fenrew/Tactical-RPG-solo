function addNewNpcToMap(round) {
    if(round === 1){
        let npcArray = [new NpcModel(new Zombie(), 70), new NpcModel(new Zombie(), 70)]
        return Game._addNpcToGame(npcArray)
    }
}