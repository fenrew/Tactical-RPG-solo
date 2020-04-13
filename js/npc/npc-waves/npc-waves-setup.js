function addNewNpcToMap(round) {
    if(round === 1){
        let npcArray = []
        
        for(let i = 0; i <= 4; i++){
            npcArray.push(new NpcModel(new Zombie(), 70))
        }

        return Game._addNpcToGame(npcArray)
    }
}