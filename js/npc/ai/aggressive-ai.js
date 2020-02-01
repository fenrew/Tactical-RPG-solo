class AggressiveAi {
    constructor(npc) {
        this.npc = npc
        this.activeMap = ""
        this.spellRangeMap = ""
        this.movementMap = ""
    }

    runAi(){
        this.setActiveMap()

        this.playersInRangeOfSpells()
    }

    setActiveMap(){
        this.activeMap = Game.activeMap
        this.spellRangeMap = this.activeMap.map((y) => {return y.map(() => { return []})})
        this.movementMap = findAvailableMovementArea(this.npc, this.activeMap)
        console.log(this.movementMap)
    }

    playersInRangeOfSpells(){
        let playersInRangeMap = JSON.parse(JSON.stringify(this.activeMap))
        let playersInRange = [], spellList = this.npc.class.spells
        

    }

    returnSpellRangeMap(spellRange, map){
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map[y].length; x++){
                
            }
        }
    }
}