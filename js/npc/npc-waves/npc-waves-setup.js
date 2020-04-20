function addNewNpcToMap(round) {
    if(round === 1){
        let npcArray = []
        
        for(let i = 0; i <= 1; i++){
            npcArray.push(new NpcModel(new Zombie(), 70))
        }

        return Game._addNpcToGame(npcArray)
    } else if(round === 2){
        let npcArray = []
        
        for(let i = 0; i <= 2; i++){
            npcArray.push(new NpcModel(new Zombie(), 70))
        }

        return Game._addNpcToGame(npcArray) 
    } else if(round === 3){
        let npcArray = []
        
        for(let i = 0; i <= 2; i++){
            npcArray.push(new NpcModel(new Zombie(), 70))
        }

        return Game._addNpcToGame(npcArray) 
    } else if(round === 4){
        let npcArray = []
        
        for(let i = 0; i <= 2; i++){
            npcArray.push(new NpcModel(new Zombie(), 70))
        }

        return Game._addNpcToGame(npcArray) 
    }
}