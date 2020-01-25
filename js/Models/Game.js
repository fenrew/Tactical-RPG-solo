class GameClass {
    constructor(){
        this.players = []
        this.npc = []
        this.activeMap = JSON.parse(JSON.stringify(mapOne))
        this.mapHighlights = this.activeMap.map((y) => {return y.map((x) => { return []})})
        this.originalMap = mapOne
        this.turn = 0
        this.round = 0
        this.combatTimeline = []
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

    _addNpcToGame(type){
    }

    _getPlayer(playerNumber){
        return this.players[playerNumber]
    }

    _updateInitiation(){
        this.combatTimeline.sort((a,b)=>{
            return a.class.combatstats.initiation - b.class.combatstats.initiation
        })
        
        updatePlayerPanelCombatTimelineVisuals(this.combatTimeline)
    }

    _nextTurn(){
        this.turn += 1
        updatePlayerPanelActiveTurn(this.combatTimeline, this.turn)
    }

    _displayMovementHighlights(player){
        let availableMovementMap = findAvailableMovementArea(player, this.activeMap), activePlayerTurn
        if(this.combatTimeline[this.turn] == player) activePlayerTurn = true
        this.mapHighlights = addMovementToHighlightMap(availableMovementMap, this.mapHighlights, activePlayerTurn)
        displayMapHighlightsVisuals(this.mapHighlights)
    }

}

const Game = new GameClass()