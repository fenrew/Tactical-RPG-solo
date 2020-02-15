class GameClass {
    constructor(){
        this.players = []
        this.npc = []
        this.activeMap = JSON.parse(JSON.stringify(mapOne)) //Current map modified
        this.mapHighlights = this.activeMap.map((y) => {return y.map(() => { return []})}) // Triple array of all different highlights on the map
        this.availableMovementMap = ""
        this.originalMap = removeStartingPositions(mapOne) // Current map UN-modified
        this.turn = 0
        this.round = 0
        this.combatTimeline = [] // this.combatTimeline[this.turn]
        this.npcActiveTurn = false

        this.newRound = () =>{
            addNewNpcToMap(this.round)
        }
    }

    _addPlayerToGame(playerNumber){
        this.players.push(new Player(playerNumber))

        for(let y = 0; y < this.activeMap.length; y++){
            for(let x = 0; x < this.activeMap[y].length; x++){
                if (this.activeMap[y][x] === playerNumber+10) {
                    this.players[playerNumber].position = {y: y, x: x}
                    return this.activeMap[y][x] = playerNumber
                }
            }
        }
    }

    _addPlayersToCombatTimeline(){
        this.players.forEach((ele) =>{
            this.combatTimeline.push(ele)
        })
    }

    _addNpcToGame(npcArrayToBeAdded){
        npcArrayToBeAdded.forEach((npc) => {
            npc._generateRandomPosition()
            this.activeMap[npc.position.y][npc.position.x] = npc.playerNumber
            this.npc.push(npc)
            this.combatTimeline.push(npc)
        })
        this._updateInitiation()
        visualizeNpcs(this.activeMap)
    }

    _getPlayer(playerNumber){
        return this.players[playerNumber]
    }

    _getNpc(position){
        return this.npc.find((npc) => {
            return (npc.position.y === position.y && npc.position.x === position.x)
        })
    }

    _updateInitiation(){
        this.combatTimeline.sort((a,b)=>{
            return a.class.combatstats.initiation - b.class.combatstats.initiation
        })
        
        updatePlayerPanelCombatTimelineVisuals(this.combatTimeline)
    }

    _nextTurn(){
        this.combatTimeline[this.turn].class.combatstats.currentMovementPoints = 
        this.combatTimeline[this.turn].class.combatstats.maxMovementPoints;
        this.turn += 1
        if(this.turn%this.combatTimeline.length === 0){
            this.round += 1
            this.turn = 0

            this.newRound()
        }

        //NPC turn
        if(this.combatTimeline[this.turn].npc){
            this.combatTimeline[this.turn].ai.runAi()
        }

        updatePlayerPanelActiveTurn(this.combatTimeline, this.turn)
    }

    _displayMovementHighlights(player){
        let activePlayerTurn
        this.availableMovementMap = findAvailableMovementArea(player, this.activeMap)
        if(this.combatTimeline[this.turn] == player) activePlayerTurn = true
        this.mapHighlights = addMovementToHighlightMap(this.availableMovementMap, this.mapHighlights, activePlayerTurn)
        displayMapHighlightsVisuals(this.mapHighlights)
    }
}

const Game = new GameClass()